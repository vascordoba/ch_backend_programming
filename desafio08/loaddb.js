//use admin

//db.createUser({user: "admin",pwd: "vas4479",roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]})

use ecommerce;

//db.createUser({user:"vascordoba",pwd:passwordPrompt(),roles:[{role:"readWrite",db:"ecommerce"}]})

//db.auth("vascordoba","vas4479")

db.mensajes.insertMany([
  { user: "a@a.com", ts: 1645742463000, msg: "hola" },
  { user: "b@a.com", ts: 1645742468000, msg: "hola" },
  { user: "a@a.com", ts: 1645742473000, msg: "todo bien?" },
  { user: "b@a.com", ts: 1645742478000, msg: "si, vos?" },
  { user: "a@a.com", ts: 1645742483000, msg: "todo ok" },
  { user: "b@a.com", ts: 1645742488000, msg: "me alegro" },
  { user: "a@a.com", ts: 1645742493000, msg: "nos juntamos a las 5?" },
  { user: "b@a.com", ts: 1645742498000, msg: "dale" },
  { user: "a@a.com", ts: 1645742503000, msg: "nos vemos" },
  { user: "b@a.com", ts: 1645742508000, msg: "chau" }]);

db.productos.insertMany([
  { title: "Escuadra", price: 120, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png" },
  { title: "Libro", price: 2000, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-and-school-8/48/Book-256.png" },
  { title: "Probeta", price: 500, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/tube-lab-science-school-256.png" },
  { title: "Abaco", price: 1200, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-and-school-8/48/School-256.png" },
  { title: "Telescopio", price: 4500, thumbnail: "https://cdn4.iconfinder.com/data/icons/education-759/2050/Education_flat-24-256.png" },
  { title: "Paleta de colores", price: 1500, thumbnail: "https://cdn4.iconfinder.com/data/icons/education-759/2050/Education_flat-06-256.png" },
  { title: "Calculadora", price: 3500, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png" },
  { title: "Mochila", price: 4900, thumbnail: "https://cdn4.iconfinder.com/data/icons/education-759/2050/Education_flat-03-256.png" },
  { title: "Pizarra", price: 2300, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/board-math-class-school-256.png" },
  { title: "Tijera", price: 320, thumbnail: "https://cdn4.iconfinder.com/data/icons/to-cool-for-school/512/opened-scissor-256.png" }
]);

db.mensajes.find();

db.productos.find();

db.mensajes.count();

db.productos.count();

db.productos.insertOne({ title: "Resaltador", price: 200, thumbnail: "https://cdn0.iconfinder.com/data/icons/education-flat-7/128/04_Highlighter-256.png" });

db.productos.find({ price: { $lt: 1000 } });

db.productos.find({ $and: [{ price: { $gte: 1000 } }, { price: { $lte: 3000 } }] });

db.productos.find({ price: { $gt: 3000 } });

db.productos.find({}, { title: 1, _id: 0 }).sort({ price: 1 }).skip(2).limit(1);

db.productos.updateMany({}, { $set: { stock: 100 } });

db.productos.updateMany({ price: { $gt: 4000 } }, { $set: { stock: 0 } });

db.productos.deleteMany({ price: {$lt:1000}});

