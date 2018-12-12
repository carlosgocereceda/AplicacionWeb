const mysql = require("mysql");

//Funcionalidades que va a tener el DAOPreguntas: 
//                                                 -Insertar Pregunta
class DAOPreguntas {

    constructor(pool) {

        this.pool = pool;

    }

    insertarPregunta(id, enunciado, respuestas, callback) {
        //console.log("estoy aqui");
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                console.log(id, enunciado, respuestas.join(","));
                connection.query("INSERT INTO " +
                    "PREGUNTA (idUsuarioCrea, pregunta, respuestas) " +
                    "VALUES (?,?,?)",
                    [id, enunciado, respuestas.join(",")],
                    function (err, filas) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            callback(null);
                        }
                    })
            }
        })
    }
    getPreguntabyId(id, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT * FROM PREGUNTA WHERE ID = ?",
                    [id], function (err, res) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            callback(null, res);
                        }
                    })
            }
        })
    }
    getPreguntaAleatoria(numero, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT * FROM PREGUNTA", function (err, filas) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else {
                        var mySet = new Set();
                        let preguntas = 0;
                        if (filas.length == 0) {
                            callback(null, null);
                        }
                        if (filas.length < 5) {
                            preguntas = filas.length;
                        }
                        else {
                            preguntas = numero;
                        }
                        let sol = [];
                        while (mySet.size < preguntas) {
                            let num = Math.floor((Math.random() * filas.length) + 0);
                            if (!mySet.has(filas[num].pregunta)) {
                                let pregunta = {
                                    enunciado: "",
                                    respuestaCorrecta: "",
                                    respuesta2: "",
                                    respuesta3: "",
                                    respuesta4: "",
                                    id: ""
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
                        callback(null, sol);
                    }
                })
            }
        })
    }
    getAllPreguntasRespondidasPorUsuario(id, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT * FROM usuariorespondeparasimismo WHERE idUsuario = ?",
                    [id], function (err, res) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            callback(err, res);
                        }
                    })
            }
        })
    }
    insertaRespuestaUnoMismo(idUsuario, idPregunta, respuesta, idRespuesta, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("INSERT INTO usuariorespondeparasimismo (idPregunta, idUsuario, respuesta, idRespuesta) VALUES (?,?,?,?)",
                    [idPregunta, idUsuario, respuesta, idRespuesta],
                    function (err, res) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            callback(null, res);
                        }
                    })
            }
        })
    }
    getRespeustaUnoMismo(idPregunta, idUsuario, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT * FROM usuariorespondeparasimismo"
                    + " WHERE idPregunta = ? AND idUsuario = ?",
                    [idPregunta, idUsuario],
                    function (err, filas) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            callback(null, filas);
                        }
                    })
            }
        })
    }
    getAmigosHanRespondido(idPregunta, amigos_map, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                //console.log("amigos_map");
                //console.log(amigos_map);
                //console.log("length");
                //console.log(amigos_map.length);
                if (amigos_map != null && amigos_map.size > 0) {

                    //console.log("aqui");
                    let amigos = Array.from(amigos_map.keys());

                    connection.query('SELECT idUsuario FROM usuariorespondeparasimismo WHERE idPregunta = ' + idPregunta + ' AND idUsuario IN (' + amigos.join() + ')',
                        function (err, filas) {
                            connection.release();
                            if (err) {
                                callback(new Error("Error de acceso a la base de datos"));
                            }
                            else {
                                let amigos_han_respondido_map = new Map();
                                if (filas.length != 0) {
                                    for (let i = 0; i < filas.length; i++) {
                                        amigos_han_respondido_map.set(filas[i].idUsuario, amigos_map.get(filas[i].idUsuario));
                                    }
                                    callback(null, amigos_han_respondido_map);
                                }
                                else {
                                    callback(null, null);
                                }
                            }
                        })

                }
                else {
                    callback(null, null);
                }
            }

        })
    }
    getUsuariosYaAdivinados(idPregunta, usuarioQuiereAdivinar, amigos_map, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                if (amigos_map == null) {
                    callback(null, null);
                }
                else {
                    let amigos = Array.from(amigos_map.keys());
                    //console.log("aqui");
                    //console.log(amigos);
                    //console.log("idpregunta" + idPregunta);
                    //console.log("usuarioQuiereAdivinar " + usuarioQuiereAdivinar);

                    connection.query('SELECT * FROM usuariorespondeennombredeotro WHERE idPregunta = ' + idPregunta +
                        ' AND idUsuarioAdivina = ' + usuarioQuiereAdivinar + ' AND idUsuarioRespondio IN (' + amigos.join() + ')',
                        function (err, filas) {
                            connection.release();
                            if (err) {
                                callback(new Error("Error de acceso a la base de datos"));
                            }
                            else {
                                if (filas.length != 0) {
                                    let sol = amigos_map;
                                    for (let i = 0; i < filas.length; i++) {
                                        let info = {
                                            nombre: sol.get(filas[i].idUsuarioRespondio),
                                            respondido: true,
                                            correcto: filas[i].correcta
                                        }
                                        sol.set(filas[i].idUsuarioRespondio, info);
                                    }
                                    //console.log("mapa cambiado: ");
                                    //console.log(sol);
                                    callback(null, sol);
                                }
                                else {
                                    callback(null, amigos_map);
                                }
                            }
                        })
                }
            }
        })
    }
    responderEnNombreDeOtro(idUsuarioAdivina, idUsuarioRespondio, idPregunta, respuesta, idRespuesta, correcta, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {

                connection.query("INSERT INTO usuariorespondeennombredeotro (idPregunta, idUsuarioAdivina, idUsuarioRespondio, respuesta, idRespuesta, correcta) VALUES (?,?,?,?,?,?)",
                    [idPregunta, idUsuarioAdivina, idUsuarioRespondio, respuesta, idRespuesta, correcta],
                    function (err, res) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            callback(null, res);
                        }
                    })
            }
        })
    }
    addRespuesta(idPregunta,respuestas,callback){
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {

                connection.query("UPDATE PREGUNTA SET respuestas = ? WHERE id = ?",
                    [respuestas.join(","),idPregunta],
                    function (err, res) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            callback(null, res);
                        }
                    })
            }
        })
    }
}
module.exports = DAOPreguntas;