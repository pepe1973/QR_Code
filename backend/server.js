require('dotenv').config();
const express = require('express');
const fsPromises = require('node:fs/promises');
const path = require('node:path');

const PORT = process.env.PORT || 3500;
const app = express();

app.use(express.json());

const logUt = path.resolve(__dirname, '..', 'naplo.log');
console.log(logUt);

app.get('/', (req, res) => {
    try {
        res.status(200).json({ msg: 'Kész' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

app.post('/', async (req, res) => {
    const tartalom = req.body;
    const idopont = new Date();

    try {
        await fsPromises.writeFile(logUt, `${tartalom};${idopont}`, {
            encoding: 'utf-8',
            flag: 'w',
        });
        res.status(200).json({ msg: tartalom });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
