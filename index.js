import express from 'express';
import AdminModel from './models/admin';
import QuizzModel from './models/quizz';

require('dotenv').config();
const path = require('path');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');


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
const Admin = AdminModel(sequelize, Sequelize);
const Quizz = QuizzModel(sequelize, Sequelize);

Quizz.belongsTo(Admin);
sequelize.sync({
    force: false
  })
  .then(() => {
    console.log(`Database & tables created!`)
  });

const PORT = process.env.PORT || 4000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'client/build')));
// api
// create admin

app.post('/api/admins', (req, res) => {
  console.log('test', req.body);
  Admin.findOrCreate({where: {username: req.body.username }, defaults: {name: req.body.name, password: req.body.password }})
  .spread((admin, created) => {
    console.log(admin.get({
      plain: true
    }))
    console.log(created)
    res.json(admin);
  })
});
// show all admins
app.get('/api/admins', (req, res) => {
  Admin.findAll().then(admin => {
    // console.log(admin)
    res.json(admin);
  });
});
// Quizz api
// Create quizz
app.post('/api/quizzes', (req, res) => {
  const { detail, subQuestion, data, adminId } = req.body;
  Admin.findById(adminId)
  .then(() => Quizz.create({ detail, subQuestion, data })
  .then(quiz => Quizz.findOne({ where: {id: quiz.id}, include: [Admin]}))
  .then(quizWithAssociations => res.json(blogWithAssociations))
  .catch(err => res.status(400).json({ err: `Admin with id = [${adminId}] doesn\'t exist.`})));
  // Quizz.create({ detail, subQuestion, data, adminId })
  // .then(quiz => res.json(quiz));
})
// get all quizzes
app.get('/api/quizzes', (req, res) => {
  Quizz.findAll().then(quiz => res.json(quiz));
})
// get quizz by id
app.get('/api/quizzes/:id', (req, res) => {
  Quizz.findOne({ id: req.params.id }).then(quizz => res.json(quizz));
})
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))