/*
    npm init
    npm install express --save
    npm install ejs --save
    npm install body-parser --save
*/


const DAOUsuarios = require("./DAOUsuarios");

const daoUsuarios = new DAOUsuarios("localhost", "root", "", "facebluff");

daoUsuarios.insertaUsuario("cargom11@ucm.es", 1234, "carlos", 0, null, null, cb_insertaUsuario);
daoUsuarios.isUserCorrect("cargom11@ucm.es", 1234, cb_isUserCorrect);
daoUsuarios.deleteUsuario("cargom11@ucm.es", cb_deleteUsuario);

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