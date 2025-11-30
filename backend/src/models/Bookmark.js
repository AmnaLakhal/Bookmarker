const db = require('../config/database');

class Bookmark {
  static async getAll() {
    return await db('bookmarks').select('*').orderBy('id', 'asc');
  }

  static async getById(id) {
    return await db('bookmarks').where({ id }).first();
  }

  static async create(data) {
    const [id] = await db('bookmarks').insert(data);
    return await this.getById(id);
  }

  static async update(id, data) {
    await db('bookmarks').where({ id }).update(data);
    return await this.getById(id);
  }

  static async delete(id) {
    return await db('bookmarks').where({ id }).del();
  }
}

module.exports = Bookmark;
