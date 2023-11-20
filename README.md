# Documentation d'Installation du Projet GraphQL de Gestion de Jeux Vidéo
## Prérequis
Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

Node.js (version XX ou supérieure)
npm (généralement installé avec Node.js)
MySQL
### Étape 1 : Cloner le Projet depuis GitHub
Ouvrez un terminal.
Naviguez vers le répertoire où vous souhaitez placer le projet.
Exécutez la commande suivante pour cloner le projet :
git clone https://github.com/votre_nom_utilisateur/votre_projet.git
Naviguez dans le dossier du projet :
cd votre_projet
### Étape 2 : Installer les Dépendances
Dans le dossier du projet, exécutez :
npm install
### Étape 3 : Configurer la Base de Données MySQL
Ouvrez MySQL et créez une nouvelle base de données pour le projet.
Exécutez les scripts SQL du fichier bdd.
Modifiez le fichier de configuration de la base de données dans le projet pour refléter vos paramètres MySQL (comme le nom d'utilisateur, le mot de passe, le nom de la base de données, etc.).
### Étape 4 : Configurer l'Environnement
Créez un fichier .env à la racine du projet.
Ajoutez les configurations nécessaires, par exemple :
DB_HOST=localhost
DB_USER=votre_utilisateur
DB_PASS=votre_mot_de_passe
DB_NAME=votre_base_de_donnees
### Étape 5 : Lancer l'Application
Exécutez l'application avec la commande suivante :

node server.js
### Étape 6 : Accéder à l'Application
Ouvrez votre navigateur et accédez à http://localhost:4000/graphql pour interagir avec l'API GraphQL via GraphiQL.
