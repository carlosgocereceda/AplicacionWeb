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

//ROUTERS
const routerPreguntas = require("./routerPreguntas");



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
const multer = require("multer");
const multerFactory = multer({ dest: path.join(__dirname, "uploads")});

//------------------FIN DE IMPORTACIONES------------------------------------

//Creacion del servidor
const app = express();
app.use(middlewareSession);
app.use("/preguntas", routerPreguntas);
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
                request.session.currentName = filas[0].nombre;
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

app.post("/register",multerFactory.single("Imagen_perfil"), function (request, response) {
    
    daoUsuarios.getUsuario(request.body.email, function (err, res) {

        if (res == null) {
            let sexo;
            if (request.body.sexo == "hombre") {
                sexo = 0;
            }
            else {
                sexo = 1;
            }
            
            daoUsuarios.insertaUsuario(request.body.email, request.body.contrasenya,
                request.body.nombre, sexo, request.body.fecha_nacimiento,
                request.body.Imagen_perfil,
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

            response.render("perfil", { usuariologeado: request.session.currentName, nombre: nombre, edad: edad, sexo: sexo, puntos: puntos });
        }
    })
    //Creo que hacen falta coockies para esto
})





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
            let pathImg = path.join(__dirname, "uploads", res);
            //console.log(pathImg);
            response.sendFile(pathImg)
        }
    })
})


app.get("/amigos", function (request, response) {
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
                                        response.render("amigos", { usuariologeado: request.session.currentName, posiblesamigos: result2, amigosya: result3 });
                                    }
                                    else {

                                        response.render("amigos", { usuariologeado: request.session.currentName, posiblesamigos: result2, amigosya: [] });
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
                            response.render("amigos", { usuariologeado: request.session.currentName, posiblesamigos: [], amigosya: result3 });
                        }
                        else {

                            response.render("amigos", { usuariologeado: request.session.currentName, posiblesamigos: [], amigosya: [] });
                        }
                    }

                })
            }
        }

    })
})
app.post("/buscarAmigo", function (request, response) {
    let arrayID = [];
    daoUsuarios.buscarUsuario2(request.body.buscadorAmigo, function (err, result) {
        if (err) {
            response.redirect("/profile");
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
                        let a = arrayID.map(element2 => (c.indexOf(element2 > -1) ? true : false));
                        //envio el render con los dos arrays para las comprobaciones;
                        response.render("nuevosAmigos", { usuariologeado: request.session.currentName, listaNombre: result, amigosya: a });
                    }
                })

            }
            else {
                response.render("nuevosAmigos", { usuariologeado: request.session.currentName, listaNombre: [] });
            }
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
//--------------------------------------------------------------
//------------------------LOGOUT--------------------------------
app.get("/logout", function (request, response) {
    request.session.destroy();
    response.redirect("/login");
})
//--------------------------------------------------------------

app.get("/modify", function (request, response) {
    response.render("modificar", {usuariologeado: request.session.currentName});
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


app.get("/aceptarAmistad/:idAmigo", function (request, response) {
    daoUsuarios.aceptarAmistad(request.session.currentUser, request.params.idAmigo, function (err) {
        if (err) {
            console.log(err.message);
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

