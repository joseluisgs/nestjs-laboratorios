db.createUser({
  user: 'admin',
  pwd: 'adminPassword123',
  roles: [
    {
      role: 'readWrite',
      db: 'NEST_DB',
    },
  ],
})

db = db.getSiblingDB('NEST_DB')

db.createCollection('products')

db.products.insertMany([
  {
    name: 'product a',
    quantity: 10,
  },
  {
    name: 'product b',
    quantity: 11,
  },
  {
    name: 'product c',
    quantity: 12,
  },
  {
    name: 'product d',
    quantity: 15,
  },
  {
    name: 'product e',
    quantity: 1,
  },
])
