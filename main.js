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
const DAOPreguntas = require("./DAOPreguntas");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

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

//------------------FIN DE IMPORTACIONES------------------------------------

//Creacion del servidor
const app = express();
app.use(middlewareSession);
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
const daoPreguntas = new DAOPreguntas(pool);

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

//---------------------------------GET PARA EL LOGIN------------------------------
app.get("/login", function (request, response) {
    response.render("login", { errorMsg: null });
})

//---------------------------------POST PARA EL LOGIN-----------------------------
app.post("/loginUser", function (request, response) {
    //console.log(request.body);
    daoUsuarios.isUserCorrect(request.body.email, request.body.password, function (err, solution) {


        if (err) {
            console.log("Error inesperado");
        }
        else if (solution) {
            request.session.currentUser = request.body.email;
            daoUsuarios.getUsuario(request.session.currentUser, function (err, filas) {
                console.log("id " + filas[0].id);
                request.session.currentId = filas[0].id;
                console.log("id guardado " + request.session.currentId);
                response.redirect("/profile");

            })

        }
        else {
            response.render("login", { errorMsg: true });
        }

    })
});
//-------------------------------FIN DEL POST PARA EL LOGIN----------------------

//-------------------------------REGISTRAR USUARIO-------------------------------

app.get("/register", function (request, response) {
    response.redirect("/nuevoUsuario.html")
})

app.post("/register", function (request, response) {
    //console.log(request.body);
    daoUsuarios.getUsuario(request.body.email, function (err, res) {

        if (res == null) {
            let sexo;
            if (request.body.sexo == "hombre") {
                sexo = 0;
            }
            else {
                sexo = 1;
            }
            console.log("imagen|" + request.body.Imagen_perfil + "|");
            if (request.body.Imagen_perfil = "") {
                console.log("pues si");
            }
            daoUsuarios.insertaUsuario(request.body.email, request.body.contrasenya,
                request.body.nombre, sexo, request.body.fecha_nacimiento,
                null,
                function (err) {
                    if (!err) {
                        request.session.currentUser = request.body.email;
                        daoUsuarios.getUsuario(request.session.currentUser, function (err, filas) {
                            request.session.currentId = filas[0].id;
                        })
                        response.redirect("/profile");
                    }
                    else {
                        console.log(err);
                    }
                })
        }
    })
})

//-------------------------------MID PARA SI NO ESTÁ IDENTIFICADO----------------
app.use(function (request, response, next) {
    if (request.session.currentUser) {
        response.locals = request.session.currentUser;
    }
    else {
        response.redirect("/login");
    }
    next();
})
//-------------------------------------------------------------------------------

//--------------------------------------PROFILE----------------------------------
app.get("/profile", function (request, response) {
    //console.log("sdf fsdf fasdf");
    daoUsuarios.getUsuario(request.session.currentUser, function (err, res) {
        //console.log(res);
        if (res != null) {

            let nombre = res[0].nombre;
            let edad = res[0].fecha_nacimiento;
            let sexo = "";
            if (res[0].sexo == 0) {
                sexo = "Hombre";
            }
            else {
                sexo = "Mujer";
            }
            let puntos = "0 puntos";

            response.render("perfil", { nombre: nombre, edad: edad, sexo: sexo, puntos: puntos });
        }
    })
    //Creo que hacen falta coockies para esto
})

app.get("/preguntasAleatorias/:id", function (request, response) {
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
                        daoUsuarios.getFriends(request.session.currentId, function (err, res) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                let amigos = res;
                                console.log("amigos: ");
                                console.log(amigos);
                                console.log("idPregunta : " + request.params.id + " amigos: " + amigos[0]);
                                daoPreguntas.getAmigosHanRespondido(request.params.id, amigos, function (err, amigosQueHanRespondido) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        console.log("resultado: ");
                                        console.log(amigosQueHanRespondido);
                                        let amigosQueHanRespondido_normalizado = [];
                                        for (let i = 0; i < amigosQueHanRespondido.length; i++) {
                                            amigosQueHanRespondido_normalizado.push(amigosQueHanRespondido[i].idUsuario);
                                        }
                                        console.log("resultado normalizado");
                                        console.log(amigosQueHanRespondido_normalizado);

                                        daoPreguntas.getUsuariosYaAdivinados(request.params.id, request.session.currentId,
                                            amigosQueHanRespondido_normalizado, function (err, amigosYa) {
                                                let usuariosSePuedeAdivinar = new Set(amigosQueHanRespondido_normalizado);
                                                for(let i = 0; i < amigosYa.length; i++ ){
                                                    console.log(amigosYa[i].idUsuarioRespondio);
                                                    usuariosSePuedeAdivinar.delete(amigosYa[i].idUsuarioRespondio);
                                                }
                                                console.log("usuarios se puede adivinar: ");
                                                console.log(usuariosSePuedeAdivinar);
                                                let amigosYaAdivinados = amigosYa;
                                                console.log("amigos ya adivinados: ");
                                                console.log(amigosYaAdivinados);
                                                response.render("pregunta", { contestado: existe, pregunta: res[0],
                                                amigosPuedeAdivinar: Array.from(usuariosSePuedeAdivinar),
                                                amigosNoPuedeAdivinar: amigosYaAdivinados});
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

app.get("/preguntasAleatorias", function (request, response) {
    daoPreguntas.getPreguntaAleatoria(5, function (err, res) {
        if (err) {
            response.redirect("/profile");
        }
        else {
            if (res != null) {
                response.render("preguntasAleatorias", { preguntas: res });
            }
        }
    })
})

app.get("/crearPregunta", function (request, response) {
    response.render("crearPregunta");
})

app.post("/crearPregunta", function (request, response) {
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
        daoPreguntas.insertarPregunta(request.session.currentId, request.body.enunciado, respuestas, function (err) {
            if (err) {
                console.log(err);
            }
            else {

                response.redirect("/preguntasAleatorias");
            }
        });
    }

})

app.get("/contestarPregunta/:id", function (request, response) {
    daoPreguntas.getPreguntabyId(request.params.id, function (err, res) {
        if (err) {
            console.log(err);
        }
        else {
            let pregunta = res[0];
            //console.log(pregunta);
            pregunta.respuestas = pregunta.respuestas.split(",");
            //console.log(pregunta);
            response.render("contestarPregunta", { pregunta: pregunta });
            //console.log(pregunta);
        }
    })
})

app.post("/contestarPregunta", function (request, response) {
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
                    response.redirect("/preguntasAleatorias");
                }
            })
        //console.log("ha costestado radio");
    }
    else if (request.body.propio) {
        //console.log("ha costestado propio");
    }
})

//------------------------CONTESTAR PREGUNTAS EN NOMBRE DE OTRO-------------------------------------



//------------------------FIN CONTESTAR PREGUNTAS EN NOMBRE DE OTRO---------------------------------

//------------------------IMAGEN DE USUARIO---------------------

app.get("/imagenUsuario", function (request, response) {

    daoUsuarios.getUserImageName(request.session.currentUser, function (err, res) {
        //console.log(res);

        if (res === null) {
            //console.log("aqui");
            let pathImg = path.join(__dirname, "public", "img", "NoPerfil.jpg");
            response.sendFile(pathImg)
            // response.sendFile("C:\Users\carlo\Desktop\4\AW\Practicas\PRACTICAS OBLIGATORIAS\P5\public\img\NoPerfil.jpg");
        }
        else {
            //console.log("holi");
            let pathImg = path.join(__dirname, "profile_imgs", res);
            //console.log(pathImg);
            response.sendFile(pathImg)
        }
    })
})
//--------------------------------------------------------------
//------------------------LOGOUT--------------------------------
app.get("/logout", function (request, response) {
    request.session.destroy();
    response.redirect("/login");
})
//--------------------------------------------------------------

app.get("/modify", function (request, response) {
    response.redirect("/modificar.html");
})

app.get("/amigos", function (request, response) {
    daoUsuarios.consultarSolicitudes(request.session.currentUser, function (err, result) {
        if (err) {
            console.log("ERROR")
        }
        else {
            if (result) {
                console.log(result);
                var posiblesamigos = [];
                for (var j = 0; j < result.length; j++) {
                    daoUsuarios.getUsuarioid(result[j].usuario_envia, function (err, result2) {
                        if (err) {
                            console.log("ERROR");
                        }
                        else {

                            posiblesamigos.push(result2);
                        }
                    })
                }
                console.log(posiblesamigos);
                response.render("amigos", { posiblesamigos: posiblesamigos });
            }
        }
    })

})
app.post("/buscarAmigo", function (request, response) {

    daoUsuarios.buscarUsuario2(request.body.buscadorAmigo, function (err, result) {
        if (err) {
            response.redirect("/profile");
        }
        else {
            response.render("nuevosAmigos", { listaNombre: result });
        }
    })
})

app.get("/nuevoAmigo/:idAmigo", function (request, response) {
    //Hay que comprobar que no hay ya amistad presente en estos dos ids.
    daoUsuarios.enviarAmistad(request.session.currentUser, request.params.idAmigo, function (err) {
        if (err) {
            console.log("Error al enviar la peticion de amistad");
        }
        else {
            response.redirect("/amigos");
        }
    })
})

app.post("/modify", function (request, response) {
    //console.log(request.body);
    let sexo;
    if (request.body.sexo == "hombre") {
        sexo = 0;
    }
    else {
        sexo = 1;
    }

    if (request.body.Imagen_perfil = "") {
        console.log("pues si");
    }
    console.log(request.session.currentUser);
    daoUsuarios.modifyUser(request.session.currentUser, request.body.contrasenya,
        request.body.nombre, sexo, request.body.fecha_nacimiento,
        null,
        function (err) {
            if (!err) {
                response.redirect("/profile");
            }
            else {
                response.redirect("/register");
                console.log(err);
            }
        })


})

function cb_insertaUsuario(err, result) {
    if (err) {
        console.log(err);
    }
}

function cb_isUserCorrect(err, result) {
    if (err) {
        console.log(err);
    }
    else if (result) {
        console.log("contraseña correcta");
    }
    else {
        console.log("contraseña incorrecta");
    }
}

function cb_deleteUsuario(err, result) {
    if (err) {
        console.log(err);
    }
    else if (result) {
        console.log("Eliminado correctamente");
    }
    else {
        console.log("");
    }
}
function normalizarResultado(array, campo) {
    let sol = [];
    for (let i = 0; i < array.length; i++) {
        sol.push(array[i].campo);
    }
    return sol;
}
