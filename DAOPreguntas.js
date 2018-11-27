const mysql = require("mysql");

//Funcionalidades que va a tener el DAOPreguntas: 
//                                                 -Insertar Pregunta
class DAOPreguntas {

    constructor(pool) {

        this.pool = pool;

    }

    insertarPregunta(email, enunciado, respuesta_correcta, respuesta2, respuesta3, respuesta4, callback){
        //console.log("estoy aqui");
        this.pool.getConnection(function(err,connection){
            if(err){
                callback(new Error("Error de conexión a la base de datos"));
            }
            else{
                connection.query(`INSERT INTO 
                PREGUNTA(idUsuario, pregunta, respuesta_correcta, respuesta2, respuesta3, respuesta4) 
                VALUES (?,?,?,?,?,?)`,
                [email, enunciado, respuesta_correcta, respuesta2, respuesta3, respuesta4],
                function(err, filas){
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