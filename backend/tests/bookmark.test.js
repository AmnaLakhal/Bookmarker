const request = require('supertest');
const app = require('../src/app');
const db = require('../src/config/database');

beforeAll(async () => {
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

beforeEach(async () => {
  await db('bookmarks').del();
});

describe('Bookmark API', () => {
  test('GET /api/bookmarks - devrait retourner un tableau vide', async () => {
    const response = await request(app).get('/api/bookmarks');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST /api/bookmarks - devrait créer un nouveau favori', async () => {
    const newBookmark = {
      name: 'Google',
      url: 'https://google.com'
    };
    
    const response = await request(app)
      .post('/api/bookmarks')
      .send(newBookmark);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newBookmark.name);
  });

  test('DELETE /api/bookmarks/:id - devrait supprimer un favori', async () => {
    const bookmark = await db('bookmarks').insert({
      name: 'Test',
      url: 'https://test.com'
    });
    
    const response = await request(app).delete(`/api/bookmarks/${bookmark[0]}`);
    expect(response.status).toBe(204);
  });
});
