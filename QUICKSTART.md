# 🚀 Démarrage Rapide - Bookmarker

## Installation en 3 étapes

### 1️⃣ Backend
```bash
cd backend
npm install
npm run migrate
npm run dev
```
✅ Backend disponible sur http://localhost:5000

### 2️⃣ Frontend (nouveau terminal)
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend disponible sur http://localhost:5173

### 3️⃣ Tests (optionnel)
```bash
cd backend
npm test
```

---

## 📖 Documentation

- **API Swagger** : http://localhost:5000/api-docs
- **Tutoriel complet** : Voir `TUTORIEL.md`

---

## 🎯 Utilisation

1. Ouvrir http://localhost:5173
2. Ajouter un favori (nom + URL)
3. Cliquer sur "Visit" pour ouvrir le site
4. Cliquer sur "Delete" pour supprimer

---

## 🛠️ Commandes utiles

### Backend
- `npm run dev` - Démarrer en mode développement
- `npm test` - Lancer les tests
- `npm run migrate` - Exécuter les migrations

### Frontend
- `npm run dev` - Démarrer le serveur de développement
- `npm run build` - Build de production

---

## 📦 Stack technique

- **Backend** : Express.js + SQLite + Knex
- **Frontend** : Svelte + Vite
- **Tests** : Jest + Supertest
- **Documentation** : Swagger/OpenAPI
- **Architecture** : MVC

Bon développement ! 🎉
