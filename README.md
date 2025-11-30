# 📚 Bookmarker

Une application web moderne et élégante pour gérer vos sites web favoris.

![Bookmarker](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Fonctionnalités

- ➕ **Ajouter des bookmarks** - Sauvegardez vos sites web préférés
- ✏️ **Modifier des bookmarks** - Mettez à jour les informations de vos sites
- 🗑️ **Supprimer des bookmarks** - Retirez les sites dont vous n'avez plus besoin
- 🌐 **Visiter les sites** - Accédez rapidement à vos bookmarks
- 🎨 **Interface moderne** - Design sombre élégant avec animations fluides
- 🖼️ **Favicons automatiques** - Affichage des icônes des sites web
- 📱 **Responsive** - Fonctionne sur tous les appareils
- 📖 **Documentation API** - Swagger UI intégré

## 🛠️ Technologies

### Frontend
- **Svelte** - Framework JavaScript réactif
- **Vite** - Build tool ultra-rapide
- **CSS3** - Animations et effets modernes

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web minimaliste
- **SQLite** - Base de données légère
- **Knex.js** - Query builder SQL
- **Swagger** - Documentation API interactive

## 📋 Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone <votre-repo>
cd bookmarker
```

### 2. Installer les dépendances

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 3. Configuration de la base de données

```bash
cd backend
npm run migrate
```

## 🎯 Démarrage

### Démarrer le backend

```bash
cd backend
npm run dev
```

Le serveur démarre sur `http://localhost:5000`

### Démarrer le frontend

```bash
cd frontend
npm run dev
```

L'application est accessible sur `http://localhost:5173`

## 📚 Documentation API

Une fois le backend démarré, accédez à la documentation Swagger :

```
http://localhost:5000/api-docs
```

### Endpoints disponibles

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/bookmarks` | Récupérer tous les bookmarks |
| GET | `/api/bookmarks/:id` | Récupérer un bookmark spécifique |
| POST | `/api/bookmarks` | Créer un nouveau bookmark |
| PUT | `/api/bookmarks/:id` | Mettre à jour un bookmark |
| DELETE | `/api/bookmarks/:id` | Supprimer un bookmark |

### Exemple de requête

```bash
# Créer un bookmark
curl -X POST http://localhost:5000/api/bookmarks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Google",
    "url": "https://www.google.com"
  }'
```

## 🧪 Tests

### Exécuter les tests backend

```bash
cd backend
npm test
```

## 📁 Structure du projet

```
bookmarker/
├── backend/
│   ├── src/
│   │   ├── config/         # Configuration (DB, Swagger)
│   │   ├── controllers/    # Logique métier
│   │   ├── models/         # Modèles de données
│   │   ├── routes/         # Routes API
│   │   └── app.js          # Application Express
│   ├── tests/              # Tests unitaires
│   ├── migrations/         # Migrations de base de données
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.svelte      # Composant principal
│   │   └── main.js         # Point d'entrée
│   ├── public/
│   └── package.json
└── README.md
```

## 🎨 Captures d'écran

### Interface principale
- Design sombre moderne avec effets de verre (glassmorphism)
- Dégradés violets/roses élégants
- Animations fluides et transitions
- Cartes interactives pour chaque bookmark

### Fonctionnalités
- Formulaire d'ajout/modification avec validation
- Affichage des favicons des sites web
- Actions rapides (Visiter, Modifier, Supprimer)
- État vide avec illustration

## 🔧 Scripts disponibles

### Backend
```bash
npm run dev      # Démarrer en mode développement
npm test         # Exécuter les tests
npm run migrate  # Exécuter les migrations
```

### Frontend
```bash
npm run dev      # Démarrer en mode développement
npm run build    # Build pour production
npm run preview  # Prévisualiser le build
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT.

## 👨‍💻 Auteur

Votre nom - [@votre_twitter](https://twitter.com/votre_twitter)

## 🙏 Remerciements

- [Svelte](https://svelte.dev/) - Framework frontend
- [Express](https://expressjs.com/) - Framework backend
- [Swagger](https://swagger.io/) - Documentation API
- [Knex.js](http://knexjs.org/) - Query builder

---

⭐ N'oubliez pas de mettre une étoile si ce projet vous a aidé !
