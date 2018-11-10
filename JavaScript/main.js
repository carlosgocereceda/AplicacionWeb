const DAOUsuarios = require("./DAOUsuarios");

const daoUsuarios = new DAOUsuarios("localhost", "root", "", "facebluff");

daoUsuarios.insertaUsuario("cargom11@ucm.es", 1234, "carlos", 0, null, null, cb_insertaUsuario);

function cb_insertaUsuario(err,result){
    if(err){
        console.log(err);
    }
}