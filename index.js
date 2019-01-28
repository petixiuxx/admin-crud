import express from "express";
import AdminModel from "./models/admin";
import QuizzModel from "./models/quizz";
import { converter } from './utilies';
require("dotenv").config();
const path = require("path");
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
// const storage = multer.diskStorage({
//   destination: "./public/uploads/",
//   filename: function(req, file, cb){
//      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
//   }
// });
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
  });
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "demo",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
  });
const parser = multer({ storage: storage });

// const upload = multer({
//   storage: storage,
//   limits:{fileSize: 1000000},
// });
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

// Admin.hasMany(Quizz, { as: "Questions" });
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
app.use('/public/uploads', express.static(__dirname + 'public/uploads'))
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
  const { detail, subQuestion, data } = req.body;
  Quizz.create({ detail, subQuestion, data })
  .then(quiz => res.json(quiz))
  .catch(err =>
      res.json({ error: `Error ${err}` })
  );
});
// get all quizzes
app.get("/api/quizzes", async (req, res) => {
  const quizzes = await Quizz.findAll();
  if (quizzes.length !== 0) { 
    const result = quizzes.map(quizz => {
      const data = JSON.parse(quizz.dataValues.data);
      const detail = JSON.parse(quizz.dataValues.detail);
      const sub = JSON.parse(quizz.dataValues.subQuestion);
      // console.log(data.en[0]);
      // console.log('test', converter(""))

      const { name, title, img, label, tags } = detail.en;
      return {
        id: quizz.id,
        detail: {
          en: {
            name,
            title,
            img: img,
            label,
            tags 
          }
        },
        sub: {
          en: {
            title: sub.en.title,
            img: sub.en.img
          }
        },
        data: {
          en: data.en.map(rel => {
            return {
              media: {
                w: rel.media.w,
                h: rel.media.h,
                src: rel.media.src
              },
              avatar: rel.avatar,
              name: rel.name
            }
          })
        }
      }
    })
    // console.log(result);
    // console.log(JSON.parse(quizzes[0].dataValues.detail).en);
    return res.json(result);
  }
  return res.json({ result: 'empty' });
});
// get quizz by id
app.get("/api/quizzes/:id", async (req, res) => {
  const quizz = await Quizz.findOne({ where: { id: req.params.id }} );
  if (quizz) {
    const data = JSON.parse(quizz.dataValues.data);
    const detail = JSON.parse(quizz.dataValues.detail);
    const sub = JSON.parse(quizz.dataValues.subQuestion);
    const { name, title, img, label, tags } = detail.en;

    const result = {
      id: quizz.id,
      detail: {
        en: {
          name,
          title,
          img,
          label,
          tags 
        }
      },
      sub: {
        en: {
          title: sub.en.title,
          img: sub.en.img
        }
      },
      data: {
        en: data.en.map(rel => {
          return {
            media: {
              w: rel.media.w,
              h: rel.media.h,
              src: rel.media.src
            },
            avatar: rel.avatar,
            name: rel.name
          }
        })
      }
    }
      
    return res.json(result);
  }
  return res.json({ error: `ID ${req.params.id} not exist`})
});
//delete quizz
app.delete("/api/quizzes/:id", (req, res) => {
  Quizz.destroy({ where: { id: req.params.id } }).then(deleted =>
    res.json(deleted)
  );
});
//update quizz
app.put("/api/quizzes/:id", async (req, res) => {
  const { data, subQuestion, detail } = req.body;
  const quiz = await Quizz.findOne({ where: { id: req.params.id } })
  if (quiz) {
    quiz.update({ data, detail, subQuestion })
    res.json(quiz);
  }
  return res.json({ error: `ID ${req.params.id} not exist` })
  
  // .then(quiz => quiz.updateAttributes(req.body.updates))
    // .then(quiz => res.json(quiz))
    // .catch(err => res.json({ err: "Quizz does not exist " }));
});
//add language
app.post("/api/locale/:id", (req, res) => {
  const { locale, data, detail, subQuestion } = req.body;
  if (locale) {
    Quizz.findOne({ where: { id: req.params.id } })
      .then(quizz => {
        sequelize.query(`CREATE TABLE IF NOT EXISTS languages ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, type VARCHAR(100) )`);
        sequelize.query(`INSERT INTO languages ( type ) VALUES ( '${locale}' ) `);
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
// app.post("/upload", upload.single("myImage"), (req, res , next) => {
//   console.log('file', req.file.filename);
//   res.json({ path: `${req.file.url }`})
// })

app.post('/upload', parser.single("myImage"), (req, res) => {
  // console.log(req.file) // to see what is returned to you
  const image = {};
  image.url = req.file.url;
  image.id = req.file.public_id;
  // Image.create(image) // save image information in database
  //   .then(newImage => res.json(newImage))
  //   .catch(err => console.log(err));
  res.json({ image: { url: image.url, id: image.id }});
});
// app.post("/upload", function(req, res) {
//   upload(req, res, function(err, result) {
//     console.log(err);
//     console.log(result);
//     if (err) {
//       return res.end("Error uploading file." + err);
//     }
//     var path = req.file.path;
//     res.json({ message: path });
//   });
// });
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
