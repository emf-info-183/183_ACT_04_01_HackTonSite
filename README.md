# Activité 4 – Hack ton site (intro)

| Durée      | 60 min.                                                                                                                                                                                                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Sujet      | Découverte et exploitation de vulnérabilités sur un mini-site Node.js volontairement non sécurisé                                                                                                                                                                                                                              |
| Objectifs  | À la fin de l’activité, l’apprenti est en mesure de :<br>• Identifier plusieurs vulnérabilités dans un site web simple.<br>• Comprendre la logique d’une attaque par injection SQL.<br>• Exploiter une faille d’authentification pour contourner un login.<br>• Proposer une idée de correctif pour sécuriser une application. |
| Modalités  | Travail individuel                                                                                                                                                                                                                                                                                                             |
| Ressources | Projet Docker « hack-ton-site », navigateur web, support du module 183                                                                                                                                                                                                                                                         |

---

## Introduction

Dans cette activité, vous allez analyser et attaquer un mini-site web conçu pour être vulnérable.  
Votre objectif est de comprendre **comment une faille peut être introduite**, **comment l’exploiter**, et **comment la corriger**.

Le projet fonctionne uniquement en local via Docker et ne doit en aucun cas être exposé à Internet.

---

## Travail à réaliser

### Étape 1 : Démarrer l’environnement

-   Téléchargez le projet fourni par votre enseignant.
-   Ouvrez un terminal dans le dossier du projet.
-   Lancez les conteneurs avec :

    ```bash
    docker compose up --build
    ```

-   accédez au site via :
    http://localhost:8080

-   Parcourez les éléments visibles du site :
    formulaire, messages, retours d’erreur éventuels.

### Étape 2 : Rechercher les vulnérabilités

Dans cette étape, vous devez observer attentivement le comportement du site afin d’identifier des éléments suspects ou incorrects.

Testez le formulaire de connexion :

-   Entrez des valeurs simples.

-   Entrez des valeurs inhabituelles (guillemets, caractères spéciaux, séquences étranges…).

-   Analysez les messages et les réactions du site.

-   Essayez d’accéder à des pages autres que /login.

-   Observez si des informations sensibles sont affichées.

-   Recherchez tout comportement inhabituel ou anormal du site ou du serveur.

À la fin de cette étape, vous devez répondre aux deux questions suivantes :

1.  Combien de vulnérabilités potentielles pensez-vous avoir trouvées ?
    (Fournissez un nombre et une courte justification.)

2.  Décrivez brièvement chaque vulnérabilité suspectée.
    (Une description claire suffit, les termes exacts ne sont pas indispensables.)

### Étape 3 : Exploiter une vulnérabilité

Votre objectif est maintenant de réussir à contourner la connexion.

-   Reprenez vos observations.

-   Identifiez la vulnérabilité la plus prometteuse.

-   Testez différentes chaînes d’entrée afin d’essayer de vous connecter sans connaître le vrai mot de passe.

Quelques pistes possibles :

-   forcer une condition toujours vraie,

-   manipuler la requête SQL,

-   provoquer une erreur révélatrice.

Une fois l’exploitation réussie :

-   Indiquez la chaîne exacte utilisée,

-   Expliquez pourquoi elle fonctionne.

### Étape 4 : Proposer des idées de correctifs

En vous basant sur vos découvertes :

-   Expliquez pourquoi le site est vulnérable.

-   Proposez au moins une mesure de sécurité permettant d’éviter cette attaque.
