const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const bookmarkRoutes = require('./routes/bookmarks');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route de base
app.get('/', (req, res) => {
  res.json({ message: 'Bookmarker API - Voir /api-docs pour la documentation' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📚 Documentation Swagger: http://localhost:${PORT}/api-docs`);
  });
}

module.exports = app;
