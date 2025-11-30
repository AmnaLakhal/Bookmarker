# 📚 Tutoriel Bookmarker - Étape par Étape

## 🎯 Objectif
Créer une application complète de gestion de favoris avec architecture MVC.

---

## 📋 Étape 1 : Configuration du Backend

### 1.1 Initialiser le projet
```bash
cd backend
npm install
```

### 1.2 Structure MVC
- **Model** (`src/models/Bookmark.js`) : Gestion des données avec Knex
- **View** : API REST (JSON)
- **Controller** (`src/controllers/bookmarkController.js`) : Logique métier

### 1.3 Configuration de la base de données
Le fichier `knexfile.js` configure SQLite :
- Base de développement : `bookmarker.db`
- Base de test : en mémoire

### 1.4 Migrations
```bash
npm run migrate
```
Crée la table `bookmarks` avec :
- `id` (auto-incrémenté)
- `name` (nom du site)
- `url` (URL du site)
- `created_at` et `updated_at`

---

## 📋 Étape 2 : API REST

### 2.1 Routes disponibles
- `GET /api/bookmarks` - Liste tous les favoris
- `GET /api/bookmarks/:id` - Récupère un favori
- `POST /api/bookmarks` - Crée un favori
- `PUT /api/bookmarks/:id` - Met à jour un favori
- `DELETE /api/bookmarks/:id` - Supprime un favori

### 2.2 Documentation Swagger
Accessible sur `http://localhost:3000/api-docs`

---

## 📋 Étape 3 : Tests avec Jest

### 3.1 Lancer les tests
```bash
npm test
```

### 3.2 Tests couverts
- Récupération de la liste vide
- Création d'un favori
- Suppression d'un favori

---

## 📋 Étape 4 : Frontend Svelte

### 4.1 Installation
```bash
cd frontend
npm install
```

### 4.2 Composants
- Formulaire d'ajout
- Tableau des favoris
- Boutons Visit et Delete

### 4.3 Lancer le frontend
```bash
npm run dev
```

---

## 🚀 Démarrage complet

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

### Accès
- Frontend : http://localhost:5173
- API : http://localhost:5000
- Swagger : http://localhost:5000/api-docs

---

## 🎨 Fonctionnalités

1. **Ajouter un favori** : Remplir le formulaire et cliquer sur "submit"
2. **Visiter un site** : Cliquer sur le bouton "Visit" (ouvre dans un nouvel onglet)
3. **Supprimer un favori** : Cliquer sur le bouton "Delete"

---

## 🏗️ Architecture MVC

### Model (Bookmark.js)
```javascript
- getAll() : Récupère tous les favoris
- getById(id) : Récupère un favori par ID
- create(data) : Crée un nouveau favori
- update(id, data) : Met à jour un favori
- delete(id) : Supprime un favori
```

### Controller (bookmarkController.js)
```javascript
- index() : Liste tous les favoris
- show() : Affiche un favori
- create() : Crée un favori
- update() : Met à jour un favori
- delete() : Supprime un favori
```

### Routes (bookmarks.js)
Définit les endpoints et la documentation Swagger

---

## 🧪 Tests

Les tests utilisent une base SQLite en mémoire pour ne pas affecter les données de développement.

---

## 📦 Dépendances

### Backend
- `express` : Framework web
- `knex` : Query builder SQL
- `sqlite3` : Base de données
- `swagger-ui-express` : Documentation API
- `jest` : Tests unitaires

### Frontend
- `svelte` : Framework UI
- `vite` : Build tool

---

## 🎓 Concepts clés

1. **Architecture MVC** : Séparation des responsabilités
2. **ORM avec Knex** : Abstraction de la base de données
3. **API REST** : Communication client-serveur
4. **Tests unitaires** : Qualité du code
5. **Documentation API** : Swagger/OpenAPI
6. **Réactivité Svelte** : UI moderne et performante

---

Bon développement ! 🚀
