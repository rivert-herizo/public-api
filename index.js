import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const PORT = 3000;

const api_url = "https://rickandmortyapi.com/api/character/1";



app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(api_url);
        console.log(response.data.name);
        res.render('index.ejs', { character: response.data });
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

app.listen(PORT, () => {
    console.log(`This is running on port ${PORT}`);
});


