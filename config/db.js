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

/* const getBooks = async () => {
    const collection = db.collection('books')
    const query = await collection.find({ "title": "Database Systems" }).toArray()
    return query;
} */

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

const getNewBooks = async (editorial) => {
    const collection = db.collection('books')
    const query = await collection.find({ "year": { $gte: 2000 } }).toArray();
    return query;
}

module.exports = { init, getBooks, getBooksByEditorial, getNewBooks }