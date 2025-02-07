# 📖 Project IBICCICD 

## 📌 What is it?  
Cette application web est composée d'un frontend (React) et d'un backend (Node.js). Elle permet aux utilisateurs de connaitre les types de véhicule que produit la marque recherché et de rechercher des stations-service dans une ville donnée. L'application est entièrement Dockerisée pour simplifier son déploiement.

## 🚀 What service/feature does it provide?  
- Renseigné les types de véhicule produit par une marque : L'utilisateur peut saisir une marque automobile et voir les types de véhicules fabriqués par cette marque.
- Rechercher des stations-service : L'utilisateur entre le nom d'une ville pour obtenir la liste des stations-service présentes dans cette ville.

## 🛠️ How to build?  
Pour initialisé le projet vous devez : 
```bash  
git clone https://github.com/Axelle-Donot/ibiccicd  
``` 
Depuis la racine du projet :
```bash  
cd .\front\
npm i
cd ..
cd .\back\ 
npm i
```  

## 🧪 How to test? 
### Frontend : 
Depuis la racine du projet :
 ```bash
 cd .\front\
 npm test
 ```
Cela lancera les tests des fichiers :
 - App.test.js
 - Feature1.test.js
 - Feature_2.test.js

### Backend :
Depuis la racine du projet :
 ```bash
 cd .\back\
 npm test
 ```
Cela lancera les tests du fichier :
 - server.test.js

## 🏃 How to run locally? 
### Run le Backend sur port 5000 dans un 1er terminal
```bash  
cd .\back\
 npm start
```  

### Run le Frontend sur port 3000 dans un 2e terminal
```bash  
cd .\front\
 npm start
```  
