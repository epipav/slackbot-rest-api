db.auth('root', 'root')

db.getCollection('users').insert({ username: 'anil', password: '123', user_role:"admin" });

db = db.getSiblingDB('rest-api')

db.createUser({
  user: 'mongo-user',
  pwd: '12345',
  roles: [
    {
      role: 'root',
      db: 'admin',  
    },
  ],
});

