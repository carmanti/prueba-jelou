require('dotenv').config()

const mysql = require('mysql')

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}

const connection = mysql.createConnection(dbConfig)

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack)
    return
  }
  console.log('Conectado con exito')
})

module.exports = connection
