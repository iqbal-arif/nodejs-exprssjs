// Importing Encryption package
const bcrypt = require("bcryptjs");

// Importing mo

// Importing getDb() from database.js
const db = require("../data/database");



// User ID Class
class User {
    constructor(email,password,fullname,street,postal,city){
        this.email = email;
        this.password = password;
        this.userName = fullname;
        this.address = {
            street: street,
            postalCode: postal,
            city: city,
        };
    }
    // User Authentication through email stored in db
    getUserWithSameEmail(){
        // Mongodb query to find user email
       return db.getdb().collection("users").findOne({email:this.email});
        // since there are no steps in this method so we don't need to user await & async. It will return promise as yielded by findOne.
    }

    // Function to check for existing User Email
    async existsAlready(){
        const existingUser = await this.getUserWithSameEmail();
        if (existingUser){
            return true;
        }
        return false;
    }
    async signup(){
        // Encrypting password with hash() method with salt length 12 to make it strong
        const hashPassword = await bcrypt.hash(this.password, 12);

        // mongodb uses collection method to access database collection. Collection of documents.
        // creating a new collection "users" and inserting its' instance in db
        await db.getdb().collection("users").insertOne({
            email: this.email,
            password: hashPassword,
            name:this.userName,
            address:this.address
        });
    }

    // Position of the method does not matter in the class
    // Matching hashPassword and raw password
    hasMatchingPassword(hashPassword){
        // Using bcrypt compare function provide by bcrypt package
        return bcrypt.compare(this.password,hashPassword);
    }
}

// Exporting User Class
module.exports = User;
// "undefined" is a special value type in JavaScript . It means there is no value.