const express = require('express');
const { init, getBooks, getBooksByEditorial, getNewBooks } = require('./config/db')

const app = express();
const port = 1337;

app.use(express.json())

//Parsing
app.use(express.urlencoded({extended : true}));

//Connecting to mongodb
init();

app.get("/", (req,res) => {
    res.json({data : "API Rest With MongoDB & Express"});
});

//Get all books
app.get('/books', async (req, res) => {
    const items = await getBooks();
    res.json(items)
});

//Get books by editorial
app.get('/books/(:editorial)', async (req, res) => {
    const items = await getBooksByEditorial(req.params.editorial);
    res.json(items)
});

//Get recent books
app.get('/newbooks', async (req, res) => {
    const items = await getNewBooks();
    res.json(items)
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
    console.log('Press Ctrl + C to finish...');
});