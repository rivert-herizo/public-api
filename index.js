import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const PORT = 3000;

const api_url = "https://rickandmortyapi.com/api";



app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', async (req, res) => {
//     try {
//         const response = await axios.get(api_url);
//         console.log(response.data.name);
//         res.render('index.ejs', { character: response.data });
//     } catch (error) {
//         console.log(error.response.data);
//         res.status(500);
//     }
// });

app.get('/character', (req, res) => {
    console.log('Navigated to /character');
    res.render('character.ejs');
});

app.get('/episode', (req,res) => {
    res.render('episode.ejs');
});

app.get('/', async (req,res) => {
    let pageCount = parseInt(req.params.page) || 1;
    try {
        const all_characters = await axios.get(`${api_url}/character/?page=${pageCount}`);
        console.log(all_characters.data.info.next);
        res.render('index.ejs', {
            characters: all_characters.data.results,
            info: all_characters.data.info,
            currentPage: pageCount,
        });
    } catch(error) {
        console.log(error.response?.data || error.message);
        res.status(500);
    }
    
});

app.get('/:page?', async (req, res) => {
    let pageCount = parseInt(req.params.page) || 1; // Default to page 1 if no page parameter
    try {
        const all_characters = await axios.get(`${api_url}/character/?page=${pageCount}`);
        res.render('index.ejs', {
            characters: all_characters.data.results,
            info: all_characters.data.info,
            currentPage: pageCount,
        });
    } catch (error) {
        console.log(error.response?.data || error.message);
        res.status(500);
    }
});



app.listen(PORT, () => {
    console.log(`This is running on port ${PORT}`);
});


