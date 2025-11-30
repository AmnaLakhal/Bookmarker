module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './bookmarker.db'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations'
    }
  },
  test: {
    client: 'sqlite3',
    connection: ':memory:',
    useNullAsDefault: true,
    migrations: {
      directory: './migrations'
    }
  }
};
