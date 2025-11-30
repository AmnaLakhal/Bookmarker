const Bookmark = require('../models/Bookmark');

class BookmarkController {
  async index(req, res) {
    try {
      const bookmarks = await Bookmark.getAll();
      res.json(bookmarks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async show(req, res) {
    try {
      const bookmark = await Bookmark.getById(req.params.id);
      if (!bookmark) {
        return res.status(404).json({ error: 'Bookmark not found' });
      }
      res.json(bookmark);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { name, url } = req.body;
      if (!name || !url) {
        return res.status(400).json({ error: 'Name and URL are required' });
      }
      const bookmark = await Bookmark.create({ name, url });
      res.status(201).json(bookmark);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { name, url } = req.body;
      const bookmark = await Bookmark.update(req.params.id, { name, url });
      if (!bookmark) {
        return res.status(404).json({ error: 'Bookmark not found' });
      }
      res.json(bookmark);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await Bookmark.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Bookmark not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new BookmarkController();
