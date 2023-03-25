
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//Json midleware

app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json());

//Rota inicial
app.get('/', async (req, res) => {
  res.json({message: 'Rodando express!!!'})  
})
//Rotas
//Chamar o personRoutes e criar o midleware
const personRoutes = require ('./routes/personRoutes')
app.use('/person', personRoutes)

//Conectar banco de dados MongoDB
const DB_USER = '';
const DB_PASSWORD = encodeURIComponent('');

mongoose
.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.rm3oqqu.mongodb.net/?retryWrites=true&w=majority`
    )

.then(() => {
    console.log('Conectamos ao MongoDB!')
    app.listen(3000)
})
.catch((err) => console.log('Err'))



