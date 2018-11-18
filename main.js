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
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
//------------------FIN DE IMPORTACIONES------------------------------------

//Creacion del servidor
const app = express();
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

//daoUsuarios.insertaUsuario("pepe", 1234, "carlos", 0, null, null, cb_insertaUsuario);
//daoUsuarios.isUserCorrect("cargom11@ucm.es", 1234, cb_isUserCorrect);
//daoUsuarios.deleteUsuario("cargom11@ucm.es", cb_deleteUsuario);

//---------------------------------POST PARA EL LOGIN-----------------------------
app.post("/LoginUser", function (request, response) {
    console.log(request.body);
    daoUsuarios.isUserCorrect(request.body.email, request.body.password, function(err,solution){
        if(!err && solution){
            response.redirect("/profile");
        }
        else{
            //FALTA EL MENSAJE DE ERROR
            console.log("usuario incorrecto");
        }
    })
});
//-------------------------------FIN DEL POST PARA EL LOGIN----------------------
//--------------------------------------PROFILE----------------------------------
app.get("/profile",function(request,response){
    //Creo que hacen falta coockies para esto
})

function cb_insertaUsuario(err,result){
    if(err){
        console.log(err);
    }
}

function cb_isUserCorrect(err,result){
    if(err){
        console.log(err);
    }
    else if(result){
        console.log("contraseña correcta");
    }
    else{
        console.log("contraseña incorrecta");
    }
}

function cb_deleteUsuario(err,result){
    if(err){
        console.log(err);
    }
    else if(result){
        console.log("Eliminado correctamente");
    }
    else{
        console.log("");
    }
}
