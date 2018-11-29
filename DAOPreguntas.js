const mysql = require("mysql");

//Funcionalidades que va a tener el DAOPreguntas: 
//                                                 -Insertar Pregunta
class DAOPreguntas {

    constructor(pool) {

        this.pool = pool;

    }

    insertarPregunta(id, enunciado, respuesta_correcta, respuesta2, respuesta3, respuesta4, callback){
        //console.log("estoy aqui");
        this.pool.getConnection(function(err,connection){
            if(err){
                callback(new Error("Error de conexión a la base de datos"));
            }
            else{
                connection.query(`INSERT INTO 
                PREGUNTA(idUsuarioCrea, pregunta, respuesta_correcta, respuesta2, respuesta3, respuesta4) 
                VALUES (?,?,?,?,?,?)`,
                [id, enunciado, respuesta_correcta, respuesta2, respuesta3, respuesta4],
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
    getPreguntabyId(id,callback){
        this.pool.getConnection(function(err,connection){
            if(err){
                callback(new Error("Error de conexión a la base de datos"));
            }
            else{
                connection.query("SELECT * FROM PREGUNTA WHERE ID = ?",
                [id], function(err, res){
                    if(err){
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else{
                        callback(null, res);
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
                        let sol = [];
                        while(mySet.size < preguntas){
                            let num = Math.floor((Math.random() * filas.length) + 0);
                            if(!mySet.has(filas[num].pregunta)){
                                let pregunta = {
                                    enunciado: "",
                                    respuestaCorrecta: "",
                                    respuesta2: "",
                                    respuesta3: "",
                                    respuesta4: "",
                                    id:""
                                }
                                mySet.add(filas[num].pregunta);
                                pregunta.id = filas[num].id;
                                pregunta.enunciado = filas[num].pregunta;
                                pregunta.respuestaCorrecta = filas[num].respuesta_correcta;
                                pregunta.respuesta2 = filas[num].respuesta2;
                                pregunta.respuesta3 = filas[num].respuesta3;
                                pregunta.respuesta4 = filas[num].respuesta4;
                                sol.push(pregunta);
                            }
                            
                        }
                        callback(null,sol);
                    }
                })
            }
        })
    }
}
module.exports = DAOPreguntas;