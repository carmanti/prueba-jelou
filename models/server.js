const express = require('express')
const connection = require('../config/dbConfig')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.app.use(express.json())

    // Base de datos
    this.conectar()

    //Midlewares
    this.middlewares()

    // Rutas de la aplicacion
    this.routes()
  }

  middlewares() {
    // Directorio publico
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.get('/api', (req, res) => {
      res.json({ ok: true })
    })

    // Simulación de datos de órdenes de trading
    const orders = [
      { id: 1, symbol: 'BTC-USD', price: 35000, volume: 0.5, status: 'filled' },
      { id: 2, symbol: 'ETH-USD', price: 2000, volume: 10, status: 'pending' }
    ]

    // Ruta GET para recuperar todas las órdenes de trading
    this.app.get('/api/orders', (req, res) => {
      res.json(orders)
    })

    // Simulación de datos de contactos
    const contacts = [
      {
        id: 1,
        name: 'Carlos Mantilla',
        email: 'carlos@carlos.com',
        phone: '123-456-7890',
        username: 'carlos',
        password: '123'
      },
      {
        id: 2,
        name: 'Emilio Mantilla',
        email: 'emilio@emilio.com',
        phone: '987-654-3210',
        username: 'emilio',
        password: '123'
      }
    ]

    // Ruta GET para recuperar un contacto por ID
    this.app.get('/contacts/:contact_id', (req, res) => {
      const contactId = parseInt(req.params.contact_id)
      const contact = contacts.find((c) => c.id === contactId)
      if (contact) {
        res.json(contact)
      } else {
        res.status(404).send('Contacto no encontrado')
      }
    })

    // Ruta de autenticación
    this.app.post('/login', (req, res) => {
      const { username, password } = req.body
      const user = contacts.find((u) => u.username === username)

      if (!user || user.password !== password) {
        // 401 Unauthorized
        return res.status(401).send('Credenciales inválidas')
      }

      res.send('Autenticación exitosa')
    })
  }

  conectar() {
    // Codigo de ejemplo xonexion
    // this.connection.query('SELECT * FROM users', (error, results, fields) => {
    //   if (error) {
    //     console.error('Error ejecutando la consulta:', error.stack)
    //     return
    //   }
    //   console.log('Resultados de la consulta:', results)
    // })
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(this.port)
    })
  }
}

module.exports = Server
