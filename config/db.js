require('dotenv').config()
const { MongoClient } = require('mongodb')
//const connectionUrl = 'mongodb://localhost:27017'

const connectionUrl = process.env.MONGO_URI;

let db

const init = () =>
    MongoClient.connect(connectionUrl, {
        useNewUrlParser: true
    }, (err, client) => {
        if (err) {
            throw err
            return
        }
        db = client.db("library")
        console.log('Successful Conexion..')
    })

const getBook = async (title) => {
    const collection = db.collection('books')
    const query = await collection.find({ "title": title }).toArray()
    return query;
}

const getBooks = async () => {
    const collection = db.collection('books')
    const query = await collection.find({}).toArray()
    return query;
}

const getBooksByEditorial = async (editorial) => {
    const collection = db.collection('books')
    const query = await collection.find({ "editorial": editorial }).toArray()
    return query;
}

const getNewBooks = async () => {
    const collection = db.collection('books')
    const query = await collection.find({ "year": { $gte: 2000 } }).toArray();
    return query;
}

const insertBook = async (book) => {
    let result
    try {
        const collection = db.collection('books')
        const query = await collection.insertOne(book);
        result = {
            result: book
        }

    } catch (err) {
        result = {
            result: err
        }
    }

    return result;
}

const updateBook = async (book) => {

/*     
Example on Body->Raw->Json with Postman
{
        "title": "Panucho",
        "author": "Nojoch",
        "year": 2023,
        "price": 3,
        "editorial" : "Yuca",
        "isbn" : 16
    }     */

    let result
    try {
        const collection = db.collection('books')
        const query = await collection.findOneAndUpdate(
            { isbn: 16 }, {
                $set: {
                    title: book.title,
                    author: book.author,
                    year: book.year,
                    editorial: book.editorial,
                    price: book.price 
                }
        });

        result = {
            result: query
        }
    } catch (err) {
        result = {
            result: err
        }
    }

    return result;
}

module.exports = { init, getBooks, getBooksByEditorial, getNewBooks, insertBook, updateBook }