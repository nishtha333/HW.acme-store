const db = require('./db');

db.sync()
  .then(() => {
      return db.seed()
  }).then(() => console.log("Database sync'ed and seeded"));