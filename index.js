require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const app = express();

const connectionData = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

console.log(connectionData, "hola");

// Configurar la conexión a la base de datos MySQL
const connection = mysql.createConnection(connectionData);

// Función para intentar la conexión
function connectWithRetry() {
    connection.connect((err) => {
      if (err) {
        console.error('Error al conectar a la base de datos:', err);
        console.log('Reintentando la conexión en 5 segundos...');
        // Espera 5 segundos y luego intenta conectarte nuevamente
        setTimeout(connectWithRetry, 5000);
      } else {
        console.log('Conexión exitosa a la base de datos!');
      }
    });
  }
  
  // Inicia el proceso de conexión
  connectWithRetry();

app.get('/', (req, res) => {
    res.json({ message: 'Hola Mundo' });
});

// Endpoint para hacer una consulta a la base de datos
app.get('/consulta', (req, res) => {
    const query = 'SELECT * FROM tabla';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).json({ error: 'Error al ejecutar la consulta' });
            return;
        }
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('El servidor está funcionando en el puerto 3000');
});