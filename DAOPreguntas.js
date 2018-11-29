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
                PREGUNTA(idUsuarioCrea, pregunta, respuesta_correcta, respuesta2, respuesta3, respuesta4) 
                VALUES (?,?,?,?,?,?)`,
                [email, enunciado, respuesta_correcta, respuesta2, respuesta3, respuesta4],
                function(err, filas){
                    console.log(email, enunciado, respuesta_correcta, respuesta2, respuesta3, respuesta4);
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
    getPreguntaAleatoria(numero,callback){
        this.pool.getConnection(function(err,connection){
            if(err){
                callback(new Error("Error de conexión a la base de datos"));
            }
            else{
                connection.query("SELECT * FROM PREGUNTA", function(err, filas){
                    if(err){
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else{
                        var mySet = new Set();
                        let preguntas = 0;
                        if(filas.length == 0){
                            callback(null,null);
                        }
                        if(filas.length < 5){
                            preguntas = filas.length;
                        }
                        else{
                            preguntas = numero;
                        }
                        console.log("numero de preguntas" + preguntas);
                        while(mySet.size < preguntas){
                            let num = Math.floor((Math.random() * filas.length) + 0);
                            mySet.add(filas[num].pregunta);
                        }
                        let sol = Array.from(mySet);
                        callback(null,sol);
                    }
                })
            }
        })
    }
}
module.exports = DAOPreguntas;