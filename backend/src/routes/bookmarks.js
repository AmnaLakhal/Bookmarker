const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Bookmark:
 *       type: object
 *       required:
 *         - name
 *         - url
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         url:
 *           type: string
 */

/**
 * @swagger
 * /api/bookmarks:
 *   get:
 *     summary: Récupère tous les favoris
 *     tags: [Bookmarks]
 *     responses:
 *       200:
 *         description: Liste des favoris
 */
router.get('/', bookmarkController.index);

/**
 * @swagger
 * /api/bookmarks/{id}:
 *   get:
 *     summary: Récupère un favori par ID
 *     tags: [Bookmarks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get('/:id', bookmarkController.show);

/**
 * @swagger
 * /api/bookmarks:
 *   post:
 *     summary: Crée un nouveau favori
 *     tags: [Bookmarks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bookmark'
 */
router.post('/', bookmarkController.create);

/**
 * @swagger
 * /api/bookmarks/{id}:
 *   put:
 *     summary: Met à jour un favori
 *     tags: [Bookmarks]
 */
router.put('/:id', bookmarkController.update);

/**
 * @swagger
 * /api/bookmarks/{id}:
 *   delete:
 *     summary: Supprime un favori
 *     tags: [Bookmarks]
 */
router.delete('/:id', bookmarkController.delete);

module.exports = router;
