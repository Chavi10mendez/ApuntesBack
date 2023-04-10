const server = require('./routes/index');
const { database } = require('./db-pg')

database.sync({ force: true }).then(() => 
  server.listen(3001, () => {
      console.log('El server esta corriendo en el puerto 3001 correctamente')
  })
)

