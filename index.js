import express from 'express';
require('dotenv').config();
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('adminCrud', 'root', 'holmes4869', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});

sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))
