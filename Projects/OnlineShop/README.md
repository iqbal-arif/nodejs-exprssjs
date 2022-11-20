1. Create Project Folder
2. Run npm init -y or npm --init to initialize the project folder
3. Install Express:  npm i express
4. Install Dev Dependancy Nodemon: npm i --save-dev nodemon.
5. Add/Modify script tag in package.json: 
    "scripts": {
    "start": "nodemon app.js"
    },
    Note: app.js is main-entry file that starts the Node/Express SERVER, handles and distributes incoming requests etc.
6. Install Template Engine Package ejc:  npm install ejs.
7. Import Path NodeJS Core Module for file location.
8. Register ejs package with express.
    app.set("view engine", "ejs");
9. Register Path for ejs with express to locate views.
    app.set("view", path.join(__dirname, "view"));
10. Install MongoDB.
11. Directory Path:
    1. url path: mongodb://localhost:27017
    2. C drive data path:  C:\Program Files\MongoDB\Server\6.0\data\
    3. C drive log path: Log Path: C:\Program Files\MongoDB\Server\6.0\log\
13. Stop MongoDB: net stop MongoDB
14. Start MongoDB: net start MongoDB
15. Install MongoDB Shell and Start :  mongosh.exe ; this will open a shell terminal for mongo.
16. Install Cross Site Request Forgery CSRF: nmp i csurf
17. Authentication with Session
Sessions are pieces of data stored on the server, that are connected to users via cookies.
Each user is authenticated and grated extra access to resources when his valid cookie with valid session ID points to one of the stored sessions in the server.
18. Install Express Session package and store it in Mongo db session: npm i express-session
npm i express-session connect-mongodb-session

******** MIDDLEWARE *********
1. Generates token via req.csrfToken(); save it in res.locals.csrfToken for all available in all views
    res.locals.csrfToken = req.csrfToken();
2. All request that are not get() request need CSRF token attached,
   and app.use(csrf()); will check that
3. Export addCsrfToken Middleware (Import middleware in App.js)
4. Add Express Error Handler function to check errors
   res.status(500).render("shared/500");
5. Export handlerErrors function.
6. Write User Login Authentication Middleware (Import middleware in App.js)

******** EXPRESS-SESSIONS *********
1. Write session function
2. Write session Config function
3. export createSessionConfig (Import middleware in App.js)


******** DATABASE.JS *********
1. Install mongodb npm package to establish and maintain connection with mongodb: npm install mongodb.
2. Import mongodb package in database.js.
3. Connect to database.
4. Store database data and export it as an object to be used in app.js.
5. Start Mongosh.exe to connect to db
6. Go to specific db: use online-shop.
7. Get users info: db.users.find()
8. Show database: show dbs

******** MODELS *********
1. Write user class & constructor function with singup method for userid signup
2. Import getdb() from database.js
3. Invoke getdb() and insert a instance of user collection in mongo db.
4. Install Encryption package to store encrypted password:  npm i bcrypt js
5. Import bcryptjs package : 
6. Write user login method to verify user with email in db.
7. Write method to compare hashPassword and Raw Password.


******** APP.JS *********

1. Setup NodeJS Listening Server
    a. Import express package.
    b. Define app object express()
    c. Listen to port 3000 to send http request: localhost:3000
2. Register authRoutes middleware with app.use(), a built-in express method, that will triggered for every incoming request. So app.use() method evaluates for all incoming get request. app.use(authoRoutes)
3. Use app.set() to tell expressjs to use EJS package for rendering views.
    app.set("view engine", "ejs");
4. Use express js Middleware express.static to be able to serve static files to visitor. This needs to be defined explicitly.
    app.use(express.static('public'));// mention public folder in the parenthesis.
5. Import database object. const db = require("./data/database");
6. Call database connection: db.connecttodatabase();
7. Import CSRUF Package: const csrf = require("csurf");
8. Activate CSURF as a Middleware: app.use(csrf());
9. Import csrf.token.js
10. Invoke custom Middleware 
11. Importing the Error Handler Middleware.
12. Importing the Product and Base Middleware.
13. Invoking Base and Products Routes
14. Importing the Login Authentication Middleware.
15. Invoke Authentication Middleware.



******** PROJECT FILE STRUCTURE *********

7. Create VIEWS, MODELS, & CONTROLLERS Folders
9. Create ADMIN Root Folder under Views for all administration related views.
8. Create CUSTOMER Root Folder under VIEWS Folder for all featured & shared views.
        8.1 Create AUTH, CART, INCLUDES, & PRODUCTS under CUSTOMER Folder.
        8.2 Create LOGIN.EJS & SIGNUP.EJS under AUTH  Sub-Folder.
        8.3 Create HEAD.EJS & HEADER.EJS under INCLUDES Sub-Folder.
9.      Create AUTH.CONTROLLER.JS under CONTROLLERS Sub-Folder.
10. Create ROUTES folder for different routes, such as, admin-related routes &authentication-related
    routes.
        10.1 Create AUTHROUTES.JS Under ROUTES Folder



******** VIEWS *********
1. Write Dynamic title for the head.ejs file without </head> tag.  The head closing tag will be added in all the other views as each view will import the head tag from head.ejs file
    <title><%=pageTitle%></title>

3. Import head tag in each views as follows and close the head tag
    <%- include("../includes/head", {pageTitle:"Signup"}) %> 
    </head>
3. Write closing body and html tag in footer and import it in each views as follows
    <%- include("../includes/footer") %> 
4. Write all the required field and render this view through auth.controller.js
5. Add common base.css link in the head.ejs
6. Add forms.css and auth.css link in signup.ejs
7. Write all the necessary css code for base,auth, & form.
8. Add custom locals.csrfToken in all views
   <input type="hidden" name="_csrf" value="<%= locals.csrfToken %> ">
9. Write 500.ejs error page.
10. Added the includes folder and moved it to shared folder.
11. Updated the includes path in all views.
11. Write Starting Page all-products.ejs.
12. The Header LogOut button renders when Locals.isAuth is true. Adding EJS if statement in header.ejs.
        <ul>
            <% if (locals.isAuth) { %>
                  <li><button>Logout</button></li>
            <% } %>
        </ul>
13. 


******** ROUTES *********

1. Use EXPRESS ROUTERS to register routes.
2. Import Express Package
3. Define router object through express.Router()
4. Configure Router.
    4.1. Router Object Get Method to accept request for certain path.
    4.2. Write Route Handler for getting signup page. (See CONTROLLERS)
    4.3. Importing getSingUp function and assigning to variable authController.
    4.4. Write getSingUp Middleware in the get route for Singin page. see below
         router.get('/singup', authController.getSignup); (Import router in App.js)
    4.5. Write getLogIn Middleware in the get route for Login page. see below
         router.get('/login', authController.getLogIn); (Import router in App.js)
    4.6. Write          Middleware in the get route for Startup page.

    4.7. Write          Middleware in the get route for All Products Page.
    4.8. Write Post route Login Middleware.
    
5. Export router through module.exports

******** CONTROLLERS *********
1. Write function for SIGNUP page GET Request.
2. Export function as an object key & value. (Import it in ROUTE)
3. Write function for LOGIN page GET Request.
4. Export function as an object key & value. (Import it in ROUTE)
5. Write Function for User Singup Post request to database. 
6. Export function to ROUTE.(Import it in Route)
7. Write Function for User Login to check existing user name and password.

******** UTIL *********
1. Write function for retrieving store session uid.
2. Exporting the function. createusersession.
3.

