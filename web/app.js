const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const port = 3000;

// Middleware pour décoder le formulaire
app.use(bodyParser.urlencoded({ extended: false }));

const connection = mysql.createConnection({
    host: process.env.DB_HOST || "vuln-db",
    user: process.env.DB_USER || "insecure_user",
    password: process.env.DB_PASSWORD || "insecure_pass",
    database: process.env.DB_NAME || "insecure_app",
});

connection.connect((err) => {
    if (err) {
        console.error("Erreur de connexion MySQL :", err);
    } else {
        console.log("Connecté à MySQL (vuln-db)");
    }
});

app.get("/", (req, res) => {
    res.redirect("/login");
});

app.get("/login", (req, res) => {
    res.send(`
    <html>
      <head>
        <title>Hack ton site - Login</title>
      </head>
      <body>
        <h1>Mini-site vulnérable</h1>
        <p>Essaie de te connecter… ou de contourner le login 😉</p>
        <form method="POST" action="/login">
          <label>Nom d'utilisateur :</label>
          <input type="text" name="username" />
          <br/>
          <label>Mot de passe :</label>
          <input type="password" name="password" />
          <br/>
          <button type="submit">Se connecter</button>
        </form>
        <p style="margin-top:2rem; font-size:0.9rem; color:gray;">
          Indice : regarde comment une requête SQL pourrait être construite côté serveur…
        </p>
      </body>
    </html>
  `);
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";

    console.log("Requête exécutée :", query);

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Erreur SQL :", err);
            return res.status(500).send("Erreur base de données");
        }

        if (results.length > 0) {
            const user = results[0];
            res.send(`
        <h1>Bienvenue ${user.username} !</h1>
        <p>Tu es maintenant connecté (sans aucune session sécurisée…)</p>
        <p><a href="/login">Retour au login</a></p>
      `);
        } else {
            res.send(`
        <h1>Login échoué</h1>
        <p>Nom d'utilisateur ou mot de passe incorrect.</p>
        <p><a href="/login">Réessayer</a></p>
      `);
        }
    });
});

app.get("/debug/users", (req, res) => {
    connection.query("SELECT id, username, password FROM users", (err, results) => {
        if (err) {
            console.error("Erreur SQL :", err);
            return res.status(500).send("Erreur base de données");
        }

        res.send(`
      <h1>Debug: liste des utilisateurs</h1>
      <pre>${JSON.stringify(results, null, 2)}</pre>
      <p><a href="/login">Retour au login</a></p>
    `);
    });
});

app.listen(port, () => {
    console.log(`App vulnérable en écoute sur http://0.0.0.0:${port}`);
});
