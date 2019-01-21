import express from 'express';
require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

app.get('/', (req,res) => {
    res.send('Hello wolrd');
});

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))
