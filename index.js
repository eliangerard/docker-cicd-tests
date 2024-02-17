const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({ message: 'Hola Mundo' });
});

app.listen(3000, () => {
    console.log('El servidor está funcionando en el puerto 3000');
});