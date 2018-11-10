const mysql = require("mysql");

/*
Funcionalidades de DAOUsuarios
    Constructor
    insertaUsuario
*/

class DAOUsuarios{

    constructor(host, user, password, database) {

        this.pool = mysql.createPool({
            host: host,
            user: user,
            password: password,
            database: database
        });

    }

    insertaUsuario(email, password, nombre, sexo, fecha_nacimiento, imagen_perfil, callback){
        console.log("estoy aqui");
        this.pool.getConnection(function(err,connection){
            if(err){
                callback(new Error("Error de conexión a la base de datos"));
            }
            else{
                connection.query(`INSERT INTO 
                USUARIO(email, password, nombre, sexo, fecha_nacimiento, imagen_perfil) 
                VALUES (?,?,?,?,?,?)`,
                [email, password, nombre, sexo, fecha_nacimiento, imagen_perfil],
                function(err,filas){
                    if(err){
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else{
                        callback(null);
                    }
                })
            }
        })
    }
}
module.exports = DAOUsuarios;