//Importing MongoDB Package
const mongodb = require('mongodb');

//Establishing MongoClient to apply mongodb methods
const MongoClient = mongodb.MongoClient;

// Defining Database to store data for specific data schema
let database;

//Connecting to local database server through url specific port
async function connectToDatabase(){
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
    // Storing "ONLINE-SHOP" data in database object through db() mongodb built-in method
    database = client.db("online-shop");
    /******************************* IMPORTANT NOTE************************************/
    // The code below does not connect to MongoDB
    // const client = await MongoClient.connect('mongodb://localhost:27017');

    // When using NodeJS 18 (or higher), this code may fail. If that's the case, simply try:
    
     /******  const client = await MongoClient.connect('mongodb://127.0.0.1:27017');****/
    /******************************* IMPORTANT NOTE************************************/
}

//Checking database server connectivity
function getDb(){
    if (!database){
        throw new Error('You must connect first!')
    }
    return database;
}

// Exporting Function as a Object key & value 
module.exports ={
    connecttodatabase: connectToDatabase,
    getdb: getDb,
};





