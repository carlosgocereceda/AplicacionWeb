
const config = require("./config");
const DAOUsuarios = require("./DAOUsuarios");
const DAOPreguntas = require("./DAOPreguntas");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const routerUsuarios = express.Router();
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
routerUsuarios.use(middlewareSession);
//Midleware de body parser
routerUsuarios.use(bodyParser.urlencoded({ extended: true })); //Preguntar a Marina donde hay que colocar esto


//------------------FICHEROS ESTATICOS---------------------------------------
const ficherosEstaticos =
    path.join(__dirname, "public");

routerUsuarios.use(express.static(ficherosEstaticos));
//------------------FIN DE FICHEROS ESTATICOS--------------------------------

// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);
//Creamos los daos
const daoUsuarios = new DAOUsuarios(pool);
const daoPreguntas = new DAOPreguntas(pool);

const multer = require("multer");
const multerFactory = multer({ dest: path.join(__dirname, "uploads") });

routerUsuarios.get("/register", function (request, response) {
    response.redirect("/nuevoUsuario.html")
})
function _calculateAge(birthday) { // birthday is a date



    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);


}

routerUsuarios.post("/register", multerFactory.single("Imagen_perfil"), function (request, response) {
    let n = null;
    let a = null;
    let a2 = null;
    if (request.file) {
        n = request.file.path;
        a = n.split("\\");
        a2 = a[a.length - 1];

    }
    daoUsuarios.getUsuario(request.body.email, function (err, res) {

        if (res == null) {
            let sexo;
            if (request.body.sexo == "hombre") {
                sexo = 0;
            }
            else {
                sexo = 1;
            }
            console.log("Hola");
            daoUsuarios.insertaUsuario(request.body.email, request.body.contrasenya,
                request.body.nombre, sexo, request.body.fecha_nacimiento,
                request.file.filename, 0,
                function (err, filas) {
                    if (!err) {
                        request.session.currentPoints = 0;
                        request.session.currentUser = request.body.email;
                        //  daoUsuarios.getUsuario(request.session.currentUser, function (err, filas) {
                        //    request.session.currentId = filas[0].id;
                        //})
                        response.redirect("/usuarios/profile");
                    }
                    else {
                        response.redirect("/login");
                        console.log(err);
                    }
                })
        }
        else {
            console.log("usuario ya existente");
            response.redirect("/login");
        }
    })
})

//-------------------------------MID PARA SI NO ESTÁ IDENTIFICADO----------------
routerUsuarios.use(function (request, response, next) {
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
routerUsuarios.get("/profile", function (request, response) {
    //console.log("sdf fsdf fasdf");
    daoUsuarios.getUsuario(request.session.currentUser, function (err, res) {
        //console.log(res);
        if (res) {
            console.log(res);
            let nombre = res[0].nombre;
            let edad1 = res[0].fecha_nacimiento;
            let sexo = "";
            if (res[0].sexo == 0) {
                sexo = "Hombre";
            }
            else {
                sexo = "Mujer";
            }
            let ruta = "/usuarios/imagenUsuario/";
            request.session.currentId = res[0].id;
            request.session.currentPoints = res[0].puntos;
            let edad = _calculateAge(edad1);

            daoUsuarios.getUserImages(request.session.currentId, function (err, fotos) {
                if (err) {
                    console.log(err);
                }
                else {
                    response.render("perfil", { usuariologeado: request.session.currentName, nombre: nombre, edad: edad + " Años", sexo: sexo, puntos: request.session.currentPoints, amigo: ruta });
                }
            })


        }
    })
    //Creo que hacen falta coockies para esto
})

routerUsuarios.get("/profile/:idAmigo", function (request, response) {
    //console.log("sdf fsdf fasdf");
    daoUsuarios.getUsuarioid(request.params.idAmigo, function (err, res) {
        //console.log(res);
        if (res) {
            let nombre = res[0].nombre;
            let edad1 = res[0].fecha_nacimiento;
            let sexo = "";
            let puntos = res[0].puntos;
            if (res[0].sexo == 0) {
                sexo = "Hombre";
            }
            else {
                sexo = "Mujer";
            }
            let ruta = "/usuarios/imagenUsuario/" + request.params.idAmigo;

            let edad = _calculateAge(edad1);

            response.render("perfil", { usuariologeado: request.session.currentName, nombre: nombre, edad: edad + " Años", sexo: sexo, puntos: puntos, amigo: ruta });
        }
    })
})


routerUsuarios.get("/imagenUsuario/:nombreFoto", function (request, response) {

    let pathImg = path.join(__dirname, "uploads", request.params.nombreFoto);
    response.sendFile(pathImg);
    
})


routerUsuarios.get("/imagenUsuario", function (request, response) {

    daoUsuarios.getUserImageName(request.session.currentId, function (err, res) {
        //console.log(res); 
        if (err) {
            console.log("error al buscar la imagen");
        }
        else {
            if (res) {
                let pathImg = path.join(__dirname, "uploads", res);

                response.sendFile(pathImg);
            }
            else {
                let pathImg = path.join(__dirname, "public", "img", "NoPerfil.jpg");
                response.sendFile(pathImg)
            }
        }
    })
})
routerUsuarios.get("/rechazarAmistad/:id", function (request, response) {
    daoUsuarios.rechazarAmistad(request.params.id, request.session.currentId, function (err) {
        if (err) {
            console.log(err.message);
        }
        else {
            response.redirect("/usuarios/amigos");
        }
    })


})






routerUsuarios.get("/imagenUsuario/:id_usuario", function (request, response) {

    daoUsuarios.getUserImageName(request.params.id_usuario, function (err, res) {
        //console.log(res); 
        if (err) {
            console.log("error al buscar la imagen");
        }
        else {
            if (res) {
                let pathImg = path.join(__dirname, "uploads", res);
                response.sendFile(pathImg);
            }
            else {
                let pathImg = path.join(__dirname, "public", "img", "NoPerfil.jpg");
                response.sendFile(pathImg)
            }
        }
    })
})


routerUsuarios.get("/amigos", function (request, response) {
    daoUsuarios.consultarSolicitudes(request.session.currentUser, function (err, result) {
        if (err) {
            console.log("ERROR");
        }
        else {
            if (result) { //Tiene que dar falso;
                let arrayID = result.map(element => element.usuario_envia);
                if (arrayID.length > 0) {
                    console.log(arrayID);
                    daoUsuarios.selectAllbyID(arrayID, function (err, result2) {
                        if (err) {
                            console.log("Error al buscar amigos2");
                        }
                        else {

                            daoUsuarios.getAmigos(request.session.currentUser, function (err, result3) {
                                if (err) {
                                    console.log("Error al encontrar tus amigos1");
                                }
                                else {

                                    if (result3) {
                                        response.render("amigos", { usuariologeado: request.session.currentName, posiblesamigos: result2, amigosya: result3, puntos: request.session.currentPoints });
                                    }
                                    else {

                                        response.render("amigos", { usuariologeado: request.session.currentName, posiblesamigos: result2, amigosya: [], puntos: request.session.currentPoints });
                                    }

                                }
                            })

                        }
                    })
                }
            }
            else {
                daoUsuarios.getAmigos(request.session.currentUser, function (err, result3) {
                    if (err) {
                        console.log("Error al encontrar tus amigosS");

                    }
                    else {

                        if (result3) {
                            console.log("result3:");
                            console.log(result3[0]);
                            response.render("amigos", { usuariologeado: request.session.currentName, posiblesamigos: [], amigosya: result3, puntos: request.session.currentPoints });
                        }
                        else {

                            response.render("amigos", { usuariologeado: request.session.currentName, posiblesamigos: [], amigosya: [], puntos: request.session.currentPoints });
                        }
                    }

                })
            }
        }

    })
})
routerUsuarios.post("/buscarAmigo", function (request, response) {
    let arrayID = [];
    daoUsuarios.buscarUsuario2(request.body.buscadorAmigo, function (err, result) {
        if (err) {
            response.redirect("/usuarios/profile");
        }
        else {

            if (result) {
                //Creo el array de ID para comprobar de cual soy amigo y de cual no;
                arrayID = result.map(element => element.id);
                //Ahora llamo al dao para que me devuelva un array de boleanos y asi ver cuales son 
                daoUsuarios.getAllAmigos(arrayID, function (err, result2) {
                    if (err) {
                        console.log("Error al comprobar tus amigos");
                    }
                    else {
                        //Aqui filtro donde estoy yo para quesarme solo con las filas en las que aparezca el id del usuario
                        let c = result2.filter(element => element.idAmigo1 == request.session.currentId || element.idAmigo2 == request.session.currentId);
                        //Este map sirve para ver si me quedo con la fila 1 o 2 de amigos dependiendo de donde se encuentra el id del current user
                        c = c.map(element => (element.idAmigo1 == request.session.currentId) ? element.idAmigo2 : element.idAmigo1);
                        //Este map es para quedarme con true o false a la hora de pasarlo por el js, para ello miro a ver si el id de c que es el primer filtro es = -1 entondes meto false, mientras que si es mayor meto true;
                        let a = arrayID.map(element2 => (c.indexOf(element2) > -1 ? true : false));
                        //envio el render con los dos arrays para las comprobaciones;
                        console.log(a);
                        console.log(result[0].id);
                        response.render("nuevosAmigos", { usuariologeado: request.session.currentName, listaNombre: result, amigosya: a, puntos: request.session.currentPoints, idtuyo: request.session.currentId });
                    }
                })

            }
            else {
                response.render("nuevosAmigos", { usuariologeado: request.session.currentName, listaNombre: [], puntos: request.session.currentPoints });
            }
        }
    })
})
routerUsuarios.get("/nuevoAmigo/:idAmigo", function (request, response) {
    //Hay que comprobar que no hay ya amistad presente en estos dos ids.
    daoUsuarios.enviarAmistad(request.session.currentUser, request.params.idAmigo, function (err) {
        if (err) {
            console.log("Error al enviar la peticion de amistad");
        }
        else {
            response.redirect("/usuarios/amigos");
        }


    })
})
//--------------------------------------------------------------
//------------------------LOGOUT--------------------------------
routerUsuarios.get("/logout", function (request, response) {
    request.session.destroy();
    response.redirect("/login");
})
//--------------------------------------------------------------

routerUsuarios.get("/modify", function (request, response) {
    response.render("modificar", { usuariologeado: request.session.currentName, puntos: request.session.currentPoints });
})

routerUsuarios.get("/amigos", function (request, response) {
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
                response.render("amigos", { posiblesamigos: posiblesamigos, puntos: request.session.currentPoints, usuariologeado: request.session.currentName });
            }
        }
    })

})
routerUsuarios.post("/buscarAmigo", function (request, response) {

    daoUsuarios.buscarUsuario2(request.body.buscadorAmigo, function (err, result) {
        if (err) {
            response.redirect("/usuarios/profile");
        }
        else {
            response.render("nuevosAmigos", { listaNombre: result, puntos: request.session.currentPoints, usuariologeado: request.session.currentName });
        }
    })
})

routerUsuarios.get("/nuevoAmigo/:idAmigo", function (request, response) {
    //Hay que comprobar que no hay ya amistad presente en estos dos ids.
    daoUsuarios.enviarAmistad(request.session.currentUser, request.params.idAmigo, function (err) {
        if (err) {
            console.log("Error al enviar la peticion de amistad");
        }
        else {
            response.redirect("/usuarios/amigos");
        }
    })
})


routerUsuarios.get("/aceptarAmistad/:idAmigo", function (request, response) {
    daoUsuarios.aceptarAmistad(request.session.currentUser, request.params.idAmigo, function (err) {
        if (err) {
            console.log(err.message);
        }
        else {
            response.redirect("/usuarios/amigos");
        }
    })


})

routerUsuarios.post("/modify", multerFactory.single("Imagen_perfil"), function (request, response) {
    //console.log(request.body);
    let n = null;
    if (request.file) {
        n = request.file.path;
    }
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
    daoUsuarios.modifyUser(request.session.currentUser, request.body.contrasenya,
        request.body.nombre, sexo, request.body.fecha_nacimiento,
        n,
        function (err) {
            if (!err) {
                request.session.currentName = request.body.nombre;
                response.redirect("/usuarios/profile");
            }
            else {
                response.redirect("/usuarios/profile");

            }
        })


})

module.exports = routerUsuarios;