import express from "express";
import AdminModel from "./models/admin";
import QuizzModel from "./models/quizz";

require("dotenv").config();
const path = require("path");
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "public/images/uploads");
  },
  filename: function(req, file, callback) {
    var imageUrl = file.fieldname + "-" + Date.now() + ".jpg";
    callback(null, imageUrl);
  }
});
var upload = multer({ storage: storage }).single("file");
// const upload = multer({ dest: "./publics/images/uploads" });
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });
const Admin = AdminModel(sequelize, Sequelize);
const Quizz = QuizzModel(sequelize, Sequelize);

Admin.hasMany(Quizz, { as: "Questions" });
sequelize
  .sync({
    force: false
  })
  .then(() => {
    console.log(`Database & tables created!`);
  });

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/build")));
// api
// create admin

app.post("/api/admins", (req, res) => {
  console.log("test", req.body);
  Admin.findOrCreate({
    where: { username: req.body.username },
    defaults: { name: req.body.name, password: req.body.password }
  }).spread((admin, created) => {
    console.log(
      admin.get({
        plain: true
      })
    );
    console.log(created);
    res.json(admin);
  });
});
// show all admins
app.get("/api/admins", (req, res) => {
  Admin.findAll().then(admin => {
    // console.log(admin)
    res.json(admin);
  });
});
// Quizz api
// Create quizz
app.post("/api/quizzes", (req, res) => {
  const { detail, subQuestion, data, adminId } = req.body;

  Admin.findOne({ id: adminId })
    .then(admin =>
      Quizz.create({ detail, subQuestion, data, adminId: admin.id })
    )
    .then(quiz => res.json(quiz))
    .catch(err =>
      res.json({ err: `Admin with id = [${adminId}] doesn\'t exist` })
    );
});
// get all quizzes
app.get("/api/quizzes", (req, res) => {
  Quizz.findAll().then(quiz => res.json(quiz));
});
// get quizz by id
app.get("/api/quizzes/:id", (req, res) => {
  Quizz.findOne({ id: req.params.id }).then(quizz => res.json(quizz));
});
//delete quizz
app.delete("/api/quizzes/:id", (req, res) => {
  Quizz.destroy({ where: { id: req.params.id } }).then(deleted =>
    res.json(deleted)
  );
});
//update quizz
app.put("/api/quizzes/:id", (req, res) => {
  Quizz.findOne({ where: { id: req.params.id } })
    .then(quiz => quiz.updateAttributes(req.body.updates))
    .catch(err => res.json({ err: "Quizz does not exist " }));
});
//add language
app.post("/api/locale/:id", (req, res) => {
  const { locale, data, detail, subQuestion } = req.body;
  if (locale) {
    Quizz.findOne({ where: { id: req.params.id } })
      .then(quizz => {
        sequelize.query(
          `CREATE TABLE IF NOT EXISTS quizz${locale} ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, detail VARCHAR(100), data VARCHAR(100), subQuestion VARCHAR(100), adminId VARCHAR(100) )`
        );
        sequelize.query(
          `INSERT INTO quizz${locale} ( data, detail, subQuestion, adminId ) VALUES ( '${data}', '${detail}', '${subQuestion}', '${
            quizz.adminId
          }' )`
        );
      })
      .then(() => res.json({ success: true }));
  } else {
    res.json({ err: "You must choose a locale" });
  }
});

//upload file
// app.post("/upload", upload.single("file"), (req, res) => {
//   if (req.file) {
//     console.log("Uploading file...");
//     var filename = req.file.filename;
//     var uploadStatus = "File Uploaded Successfully";
//   } else {
//     console.log("No File Uploaded");
//     var filename = "FILE NOT UPLOADED";
//     var uploadStatus = "File Upload Failed";
//   }
// });
app.post("/upload", function(req, res) {
  upload(req, res, function(err, result) {
    console.log(err);
    console.log(result);
    if (err) {
      return res.end("Error uploading file." + err);
    }
    var path = req.file.path;
    res.json({ message: path });
  });
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
