
const config = require("./config");
const DAOUsuarios = require("./DAOUsuarios");
const DAOPreguntas = require("./DAOPreguntas");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const routerPreguntas = express.Router();
const session = require("express-session");
const mysqlSession = require("express-mysql-session");

const MySQLStore = mysqlSession(session);
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
//const routerUsuarios = express();
//routerPreguntas.use(middlewareSession);
//Midleware de body parser
routerPreguntas.use(bodyParser.urlencoded({ extended: true })); //Preguntar a Marina donde hay que colocar esto


//------------------FICHEROS ESTATICOS---------------------------------------
const ficherosEstaticos =
    path.join(__dirname, "public");

    routerPreguntas.use(express.static(ficherosEstaticos));
//------------------FIN DE FICHEROS ESTATICOS--------------------------------

// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);
//Creamos los daos
const daoUsuarios = new DAOUsuarios(pool);
const daoPreguntas = new DAOPreguntas(pool);

//-----------------LOCALIZACIÓN DE LAS PLANTILLAS-----------------------------


routerPreguntas.get("/preguntasAleatorias/:id", function (request, response) {
    daoPreguntas.getPreguntabyId(request.params.id, function (err, res) {
        if (err) {
            console.log(err);
        }
        else {
            //console.log(res);
            daoPreguntas.getAllPreguntasRespondidasPorUsuario(request.session.currentId,
                function (err, filas) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        let existe = 0;
                        for (let i = 0; i < filas.length; i++) {
                            if (filas[i].idPregunta == res[0].id) {
                                existe += 1;
                            }
                        }
                        //con existe sabemos si el usuario ha contestado o no a la pregunta
                        daoUsuarios.getFriends(request.session.currentId, function (err, amigos_map, amigos_array) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                let amigos = res;
                                //console.log("amigos");
                                //console.log(amigos_map);
                                daoPreguntas.getAmigosHanRespondido(request.params.id, amigos_map, function (err, amigosHanRespondido_map) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        console.log("amigos han respondido");
                                        console.log(amigosHanRespondido_map);
                                        daoPreguntas.getUsuariosYaAdivinados(request.params.id, request.session.currentId, amigosHanRespondido_map,
                                            function (err, info_usuarios_han_respondido) {
                                                if (err) {
                                                    console.log(err);
                                                }
                                                else {
                                                    daoPreguntas.getPreguntabyId(request.params.id, function (err, pregunta) {
                                                        if (err) {
                                                            console.log(err);
                                                        }
                                                        else {
                                                            if(info_usuarios_han_respondido == null){
                                                                info_usuarios_han_respondido = new Map();
                                                                info_usuarios_han_respondido.set(0,"ningun amigo ha respondido");
                                                            }
                                                            //console.log("id pregunta ");
                                                            //console.log(pregunta);
                                                            console.log("infoUsuarios");
                                                            console.log(info_usuarios_han_respondido);
                                                            response.render("pregunta", {
                                                                contestado: existe, pregunta: pregunta[0],
                                                                infoUsuarios: info_usuarios_han_respondido,
                                                                idPregunta: request.params.id,
                                                                usuariologeado: request.session.currentName,
                                                                puntos: request.session.currentPoints 
                                                            });
                                                        }
                                                    })

                                                }
                                            })
                                    }
                                })

                            }
                        })

                    }
                })

        }
    })

})

routerPreguntas.post("/adivinar_nombre_otro", function (request, response) {
    daoPreguntas.getPreguntabyId(request.body.idPregunta, function (err, res) {
        if (err) {
            console.log(err);
        }
        else {
            //console.log("pregunta:");
            //console.log(res);
            let pregunta = res[0];
            //console.log(pregunta);
            pregunta.respuestas = pregunta.respuestas.split(",");
            //console.log(pregunta);
            response.render("contestarPreguntaNombreOtro", {
                pregunta: pregunta,
                idUsuario: request.body.idUsuario,
                puntos: request.session.currentPoints,
                usuariologeado: request.session.currentName   
            });
            //console.log(pregunta);
        }
    })
})
routerPreguntas.post("/contestarPreguntaNombreDeOtro", function (request, response) {
    //console.log("body");
    //console.log(request.body);
    //console.log(request.body);
    if (request.body.radio) {

        let arrayRespuestas = request.body.respuestas.split(",");
        let respuesta = arrayRespuestas[request.body.radio.replace("R", "")];
        let idRespuesta = request.body.radio.replace("R", "");
        daoPreguntas.getRespeustaUnoMismo(request.body.idPregunta, request.body.idUsuario, function(err, respuesta_original){
            if(err){
                console.log(err);
            }
            else{
                //console.log(respuesta_original);
                let correcto = 0; // 0 -> ha acertado 1 -> ha fallado
                //console.log(respuesta_original[0].respuesta);
                if(respuesta != respuesta_original[0].respuesta){
                    correcto = 1;
                }
                if(correcto == 0){
                    request.session.currentPoints += 50;
                }
                daoPreguntas.responderEnNombreDeOtro(request.session.currentId, request.body.idUsuario, request.body.idPregunta,
                    respuesta, idRespuesta, correcto, function (err, res) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            daoUsuarios.actualizarPuntuacion(request.session.currentId, request.session.currentPoints, function(err){
                                if(err){
                                    console.log(err.message);
                                }
                                else{
                                    response.redirect("/preguntas/preguntasAleatorias");
                                }

                            })
                            response.redirect("/preguntas/preguntasAleatorias");
                        }
                    })
            }
        })
    }
})
routerPreguntas.get("/preguntasAleatorias", function (request, response) {
        daoPreguntas.getPreguntaAleatoria(5, function (err, res) {
            if (err) {
                response.redirect("/usuarios/profile");
            }
            else {
                if (res) {
                    console.log(request.session.currentPoints );
                    response.render("preguntasAleatorias", { preguntas: res, usuariologeado: request.session.currentName, puntos: request.session.currentPoints  });
                }
            }
        })
    })

    routerPreguntas.get("/crearPregunta", function (request, response) {
        response.render("crearPregunta", {usuariologeado: request.session.currentName, puntos: request.session.currentPoints });
    })

    routerPreguntas.post("/crearPregunta", function (request, response) {
        //console.log("carlos, he sacado esto ");
        //console.log(request.body);
        // request.body.comment.replace("\r", "");
        //let preguntas_split = request.body.comment.split('\n');
        var respuestas = request.body.comment.replace(/\r\n/g, "\n").split("\n");
        //console.log(respuestas);
        if (respuestas.length < 2) {
            console.log("No se pueden crear preguntas con menos de dos respuestas");
        }
        else {
            console.log("id " + request.session.currentId);
            daoPreguntas.insertarPregunta(request.session.currentId, request.body.enunciado, respuestas, function (err) {
                if (err) {
                    console.log(err);
                }
                else {

                    response.redirect("/preguntas/preguntasAleatorias");
                }
            });
        }

    })

    routerPreguntas.get("/contestarPregunta/:id", function (request, response) {
        daoPreguntas.getPreguntabyId(request.params.id, function (err, res) {
            if (err) {
                console.log(err);
            }
            else {
                let pregunta = res[0];
                //console.log(pregunta);
                pregunta.respuestas = pregunta.respuestas.split(",");
                //console.log(pregunta);
                response.render("contestarPregunta", { pregunta: pregunta, usuariologeado: request.session.currentName, puntos: request.session.currentPoints });
                //console.log(pregunta);
            }
        })
    })

    routerPreguntas.post("/contestarPregunta", function (request, response) {
        //console.log(request.body);
        if (request.body.radio) {

            let arrayRespuestas = request.body.respuestas.split(",");
            let respuesta = arrayRespuestas[request.body.radio.replace("R", "")];
            let idRespuesta = request.body.radio.replace("R", "");
            //console.log(respuesta);

            daoPreguntas.insertaRespuestaUnoMismo(request.session.currentId, request.body.id, respuesta, idRespuesta,
                function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        response.redirect("/preguntas/preguntasAleatorias");
                    }
                })
            //console.log("ha costestado radio");
        }
        else if (request.body.propio) {
            console.log("ha costestado propio");
            console.log(request.body);
            let respuesta = request.body.texto;
            let arrayRespuestas = request.body.respuestas.split(",");
            arrayRespuestas.push(respuesta);
            let idRespuesta = arrayRespuestas.length - 1;
            
            daoPreguntas.addRespuesta(request.body.id, arrayRespuestas, function(err, res){
                if(err){
                    console.log(err);
                }
                else{
                    daoPreguntas.insertaRespuestaUnoMismo(request.session.currentId, request.body.id, respuesta, idRespuesta,
                        function (err, res) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                response.redirect("/preguntas/preguntasAleatorias");
                            }
                        })
                }
            })

        }
    })

module.exports = routerPreguntas;