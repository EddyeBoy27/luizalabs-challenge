db = new Mongo().getDB('luizalabs');

db.createCollection('users', { capped: false });

db.users.insertOne({
  name: 'Usuário Admin',
  email: 'admin@admin.com',
  password: '$2b$11$aY9/KSDXsVqpNlrk7k15Yuy64Q5ad/NrZaA/lTGOGQK89sNGY6Icy',
  roles: ['ROLE_ADMIN'],
  wishlist: [],
  createdAt: new Date(),
  updatedAt: new Date(),
});

// senha para login: xzxgptcW1!
