const db = require('mongoose');
const config = require('../config/config');

db.Promise = global.Promise;
db.connect(process.env.DATABASE_URI,
{ useNewUrlParser: true, useUnifiedTopology: true });
console.log('Db Conectada con Éxito!');


module.exports=db;