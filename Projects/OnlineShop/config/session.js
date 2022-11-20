// Importing Express Session Package
const expressSession = require("express-session");

// Importing MongoDb Session package
const mongoDbStore = require("connect-mongodb-session");

// SessionStore Function 
function createSessionStore(){
    // Calling MongoDbStore function to create session
    const MongoDBStore = mongoDbStore(expressSession);

    // Creating an instance from Class MongoDBStore and store the session object
    const store = new MongoDBStore({
        uri: 'mongodb://127.0.0.1:27017',
        databaseName: 'online-shop',
        collection: 'sessions'
      });
    return store;
}

function createSessionConfig() {
    return {
      secret: 'super-secret',
      resave: false,
      saveUninitialized: false,
      store: createSessionStore(),
      cookie: {
        maxAge: 2 * 24 * 60 * 60 * 1000
      }
    };
  }

module.exports = createSessionConfig;
