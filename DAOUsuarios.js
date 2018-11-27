const mysql = require("mysql");

/*
Funcionalidades de DAOUsuarios
    Constructor
    insertaUsuario
    isUserCorrect
    deleteUsuario
*/

class DAOUsuarios{

    constructor(pool) {

        this.pool = pool;

    }

    getUsuario(email,callback){
        this.pool.getConnection(function(err, connection){
            if(err){
                callback(new Error("Error de conexión a la base de datos"));
            }
            else{
                connection.query(`SELECT * FROM USUARIO WHERE email = ?`,[email], 
                function(err,filas){
                    console.log(email);
                    if(err){
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else{
                        if(filas.length > 0){
                            callback(null,filas);
                        }
                        else{
                            callback(null,null);
                        }
                        
                    }
                })
            }
        })
    }

    getUserImageName(email, callback){
        this.pool.getConnection(function(err, connection){
            if(err){
                callback(new Error("Error de conexión a la base de datos"));
            }
            else{
                connection.query(
                    "SELECT Imagen_perfil FROM USUARIO WHERE EMAIL = ?",[email],
                    function (err, resultado) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            callback(null, resultado[0].Imagen_perfil);
                           
                        };
                    }
                    
                )
            }
        })
    }
    insertaUsuario(email, password, nombre, sexo, fecha_nacimiento, imagen_perfil, callback){
        //console.log("estoy aqui");
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
    isUserCorrect(email, password, callback){
        this.pool.getConnection(function(err,connection){
            if(err){
                callback(new Error("Error de conexión a la base de datos"));
            }
            else{
                connection.query(
                    `SELECT PASSWORD FROM USUARIO WHERE EMAIL = ?`,
                    [email],
                    function(err,filas){
                        connection.release();
                        if(err){
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else{
                         //   console.log(filas[0].PASSWORD); PREGUNTAR POR QUE console.log(filas[0].password);
                         //   saca undefined
                         if(filas[0].PASSWORD == password){
                            callback(null,true);
                         }
                         else{
                            callback(null,false);
                         }
                        }
                    }
                )
            }
        })
    }
    deleteUsuario(email,callback){
        this.pool.getConnection(function(err,connection){
            if(err){
                callback(new Error("Error de conexión a la base de datos"));
            }
            else{
                connection.query(`DELETE FROM USUARIO WHERE EMAIL = ?`,
                [email],
                function(err, result){
                    if(err){
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else{
                        callback(null,result);
                    }
                })
            }
        })
    }
    modifyUser(email, password, nombre, sexo, fecha_nacimiento, imagen_perfil, callback){
       
        this.pool.getConnection(function(err,connection){
            if(err){
                callback(new Error("Error de conexión a la base de datos1"));
            }
            else{
                connection.query(`UPDATE usuario SET password = ?, nombre= ? , sexo= ? , fecha_nacimiento =? , Imagen_perfil = ? WHERE email = ?`, [password, nombre, sexo, fecha_nacimiento, imagen_perfil, email],
                 //ESta mal la consulta 
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