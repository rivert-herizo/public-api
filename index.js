import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const PORT = 3000;

const api_url = "https://rickandmortyapi.com/api";



app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/characters', (req, res) => {

    res.render('character.ejs');
});

app.get('/episode', (req,res) => {
    res.render('episode.ejs');
});

app.get('/character', (req,res) => {
    res.render('character_page.ejs');
});


app.post("/get-character", async (req, res) => {
    const name = req.body.name;
    const status = req.body.status;
    try {
        const response = await axios.get(`${api_url}/character/?name=${name}&status=${status}`);
        console.log(name, status)
        res.render("character.ejs", { characters: response.data.results });
    } catch (error) {
        console.log(error.response?.data || error.message);
        res.render("character.ejs", { characters: [] });
    }
});


app.get('/character/:id', async (req, res) => {
    const characterId = req.params.id;
    try {
        const response = await axios.get(`${api_url}/character/${characterId}`);
        res.render('character_page.ejs', { character: response.data });
    } catch (error) {
        console.log(error.response?.data || error.message);
        res.status(500);
    }
});



app.get('/', async (req,res) => {
    let pageCount = parseInt(req.params.page) || 1;
    try {
        const all_characters = await axios.get(`${api_url}/character/?page=${pageCount}`);
        console.log(all_characters.data.info.next, parseInt(req.params.page));
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

// app.get('/character', async (req, res) => {
//     let character_id = parseInt(req.params.page);
//     try {
//         const character = await axios.get(`${api_url}/character/${character_id}`);
//         console.log(character_id);
//         res.render('character_page.ejs', {
//             character: character.id,
//         });
//     } catch(error) {
//         console.log(error.response?.data || error.message);
//         res.status(500);
//     }
// })


