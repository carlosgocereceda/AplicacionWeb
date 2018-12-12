/*
    npm init
    npm install express --save
    npm install ejs --save
    npm install body-parser --save
    npm install -g nodemon
*/

//------------------IMPORTACIONES NECESARIAS-------------------------------
const config = require("./config");
const DAOUsuarios = require("./DAOUsuarios");
const DAOPreguntas = require("./DAOPreguntas");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const session = require("express-session");
const mysqlSession = require("express-mysql-session");

const MySQLStore = mysqlSession(session);

//ROUTERS
const routerPreguntas = require("./routerPreguntas");
const routerUsuarios = require("./routerUsuarios");


const sessionStore = new MySQLStore({
    host: "localhost",
    user: "root",
    password: "",
    database: "facebluff"
});

const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore
});
const multer = require("multer");
const multerFactory = multer({ dest: path.join(__dirname, "uploads")});

//------------------FIN DE IMPORTACIONES------------------------------------

//Creacion del servidor
const app = express();
app.use(middlewareSession);
app.use("/preguntas", routerPreguntas);
app.use("/usuarios",routerUsuarios );
//Midleware de body parser
app.use(bodyParser.urlencoded({ extended: true })); //Preguntar a Marina donde hay que colocar esto


//------------------FICHEROS ESTATICOS---------------------------------------
const ficherosEstaticos =
    path.join(__dirname, "public");

app.use(express.static(ficherosEstaticos));
//------------------FIN DE FICHEROS ESTATICOS--------------------------------

// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);
//Creamos los daos
const daoUsuarios = new DAOUsuarios(pool);
const daoPreguntas = new DAOPreguntas(pool);

//-----------------LOCALIZACIÓN DE LAS PLANTILLAS-----------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "views"));
//-----------------FIN LOCALIZACIÓN DE LAS PLANTILLAS-------------------------

// Arrancar el servidor
app.listen(config.port, function (err) {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    }
    else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});


//---------------------------------GET PARA EL LOGIN------------------------------
app.get("/login", function (request, response) {
    response.render("login", { errorMsg: null });
})

//---------------------------------POST PARA EL LOGIN-----------------------------
app.post("/loginUser", function (request, response) {
    //console.log(request.body);
    daoUsuarios.isUserCorrect(request.body.email, request.body.password, function (err, solution) {


        if (err) {
            console.log("Error inesperado");
        }
        else if (solution) {
            request.session.currentUser = request.body.email;
            daoUsuarios.getUsuariobyEmail(request.session.currentUser, function (err, filas) {
            
                request.session.currentName = filas[0].nombre;
                request.session.currentId = filas[0].id;
                response.redirect("/usuarios/profile");

            })

        }
        else {
            response.render("login", { errorMsg: true });
        }

    })
});



