const mysql = require("mysql");

/*
Funcionalidades de DAOUsuarios
    Constructor
    insertaUsuario
    isUserCorrect
    deleteUsuario
*/

class DAOUsuarios {

    constructor(pool) {

        this.pool = pool;

    }

    getUsuario(email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query(`SELECT * FROM USUARIO WHERE email = ?`, [email],
                    function (err, filas) {
                        connection.release();
                        console.log(email);
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            if (filas.length > 0) {
                                callback(null, filas);
                            }
                            else {
                                callback(null, null);
                            }

                        }
                    })
            }
        })
    }

    getUserImageName(email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query(
                    "SELECT Imagen_perfil FROM USUARIO WHERE EMAIL = ?", [email],
                    function (err, resultado) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            if (resultado) {
                                callback(null, resultado[0].Imagen_perfil);
                            }
                            else {
                                callback(null);
                            }
                        };
                    }

                )
            }
        })
    }
    insertaUsuario(email, password, nombre, sexo, fecha_nacimiento, imagen_perfil, puntos, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("INSERT INTO USUARIO(email, password, nombre, sexo, fecha_nacimiento, Imagen_perfil, puntos) VALUES (?,?,?,?,?,?)",
                    [email, password, nombre, sexo, fecha_nacimiento, imagen_perfil, puntos],
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
    isUserCorrect(email, password, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query(
                    `SELECT PASSWORD FROM USUARIO WHERE EMAIL = ?`,
                    [email],
                    function (err, filas) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            //   console.log(filas[0].PASSWORD); PREGUNTAR POR QUE console.log(filas[0].password);
                            //   saca undefined
                            if (filas.length >= 0) {

                                if (filas[0].PASSWORD == password) {
                                    callback(null, true);
                                }
                                else {
                                    callback(null, false);
                                }
                            }
                            else {
                                callback(null, false);
                            }

                        }
                    }
                )
            }
        })
    }
    deleteUsuario(email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query(`DELETE FROM USUARIO WHERE EMAIL = ?`,
                    [email],
                    function (err, result) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            callback(null, result);
                        }
                    })
            }
        })
    }
    modifyUser(email, password, nombre, sexo, fecha_nacimiento, imagen_perfil, callback) {

        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos1"));
            }
            else {
                connection.query(`UPDATE usuario SET password = ?, nombre= ? , sexo= ? , fecha_nacimiento =? , Imagen_perfil = ? WHERE email = ?`, [password, nombre, sexo, fecha_nacimiento, imagen_perfil, email],
                    //ESta mal la consulta 
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

    buscarUsuario2(nombre, callback) {

        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de acceso a la base de datos1"));
            }
            else {
                //Aqui es donde peta.
                let param = '%' + nombre + '%';
                connection.query("SELECT id, nombre, Imagen_perfil FROM usuario WHERE nombre LIKE ?", [param],
                    function (err, filas) {
                        connection.release();
                        if (err) {

                            callback(new Error("Error al realizar la consulta"));
                        }
                        else {
                            console.log(filas);
                            if (filas.length == 0) {
                                callback(null, null);
                            }
                            else {
                                callback(null, filas);
                            }
                        }
                    });
            }
        })

        //}
    }
    enviarAmistad(email, idAmigo, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de acceso a la base de datos"));
            }
            else {
                connection.query("SELECT ID FROM USUARIO WHERE email = ?", [email],
                    function (err, filas) {

                        if (err) {
                            callback(new Error("Error al realizar la consulta"));
                        }
                        else {
                            let idenvia = filas[0].ID;
                            connection.query("INSERT INTO solicitudesamistad (usuario_envia, usuario_recibe) VALUES (?,?)", [idenvia, idAmigo],
                                function (err) {
                                    connection.release();
                                    if (err) {
                                        callback(new Error("Error al enviar la solicitud de amistad"));
                                    }
                                    else {
                                        callback(null);
                                    }
                                }

                            )
                        }
                    }
                )
            }
        })
    }
    consultarSolicitudes(email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de acceso a la base de datos"));
            }
            else {
                connection.query("SELECT id FROM USUARIO WHERE email = ?", [email],
                    function (err, filas) {
                        if (err) {
                            callback(new Error("Error al obtener el id del recibidor"));
                        } else {

                            let id = filas[0].id;

                            connection.query("SELECT usuario_envia FROM solicitudesamistad WHERE usuario_recibe = ?", [id],
                                function (err, filas2) {
                                    connection.release();
                                    if (err) {
                                        callback(new Error("Error al obtener las solicitudes de amistad"));
                                    } else {
                                        if (filas2.length > 0) {
                                            callback(null, filas2);
                                        } else {
                                            callback(null, null);
                                        }
                                    }
                                }

                            )
                        }
                    }
                )
            }
        })
    }
    getUsuarioid(id, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query(`SELECT * FROM usuario WHERE id = ?`, [id],
                    function (err, filas) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            if (filas.length >= 0) {
                                callback(null, filas);
                            }
                            else {
                                callback(null, null);
                            }

                        }
                    })
            }
        })
    }

    aceptarAmistad(email, id, callback) {

        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de acceso a la base de datos"));
            }
            else {
                connection.query("SELECT id FROM USUARIO WHERE email = ?", [email],
                    function (err, filas) {
                        if (err) {
                            callback(new Error("Error al obtener el id del recibidor"));
                        } else {
                            let ida = filas[0].id;

                            connection.query("DELETE FROM solicitudesamistad WHERE usuario_recibe = ? AND usuario_envia = ?", [ida, id],
                                function (err, filas) {

                                    if (err) {
                                        callback(new Error("Error al obtener las solicitudes de amistad"));
                                    } else {
                                        connection.query("INSERT INTO AMIGOS (idAmigo1, idAmigo2) VALUES (?,?)", [id, ida],

                                            function (err) {
                                                connection.release();
                                                if (err) {
                                                    callback(new Error("Error al insertar la amistad"));
                                                }
                                                else {
                                                    callback(null);
                                                }
                                            }
                                        )
                                    }
                                }
                            )
                        }
                    }
                )
            }
        })
    }
    selectAllbyID(id, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                let consulta = "SELECT * FROM usuario WHERE id IN (";
                for (let i = 0; i < id.length; i++) {
                    if (i < id.length - 1) {
                        consulta += "?,"
                    }
                    else {
                        consulta += "?)";
                    }
                }
                console.log(consulta);
                connection.query(consulta, id,
                    function (err, filas) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            if (filas.length >= 0) {
                                callback(null, filas);
                            }
                            else {
                                callback(null, null);
                            }
                        }
                    })
            }
        })
    }
    getAmigos(email, callback) {
        let amigos = [];

        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de acceso a la base de datos"));
            }
            else {

                connection.query("SELECT id FROM USUARIO WHERE email = ?", [email],
                    function (err, filas) {
                        if (err) {
                            callback(new Error("Error al obtener el id del recibidor"));
                        } else {

                            let ida = filas[0].id;

                            connection.query("SELECT * FROM AMIGOS WHERE IDAMIGO1 = ? OR IDAMIGO2 = ?", [ida, ida],
                                function (err, result) {

                                    if (err) {
                                        callback(new Error("Error al encontrar tus amigos"));
                                    }
                                    else {
                                        console.log(result);
                                        if (result.length > 0) {

                                            for (let j = 0; j < result.length; j++) {

                                                if (result[j].idAmigo1 == ida) {

                                                    amigos.push(result[j].idAmigo2);

                                                }
                                                else {
                                                    if (result[j].idAmigo2) {

                                                        amigos.push(result[j].idAmigo1);

                                                    }
                                                }
                                            }

                                            let consulta = "SELECT * FROM usuario WHERE id IN (";
                                            for (let i = 0; i < amigos.length; i++) {
                                                if (i < amigos.length - 1) {
                                                    consulta += "?,"
                                                }

                                            }
                                            consulta += "?)";

                                            connection.query(consulta, amigos,
                                                function (err, filas2) {
                                                    connection.release();
                                                    console.log(filas2);
                                                    if (err) {
                                                        callback(new Error("Error de acceso a la base de datos"));
                                                    }
                                                    else {

                                                        if (filas2) {
                                                            callback(null, filas2);
                                                            console.log(filas2);
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
                    })
            }
        })
    }


    getAllAmigos(idArray, callback) {
        this.pool.getConnection(function (err, connection) {
            let consulta = "SELECT * FROM amigos WHERE idAmigo1 OR idAmigo2 IN (";
            for (let i = 0; i < idArray.length; i++) {
                if (i < idArray.length - 1) {
                    consulta += "?,"
                }

            }
            consulta += "?)";
            connection.query(consulta, idArray, function (err, result) {
                connection.release();
                if (err) {
                    callback(new Error("Error al buscar los amigos"));
                }
                else {
                    if (result.length > 0) {
                        callback(null, result);
                    }
                    else {
                        callback(null, null);
                    }
                }

            })
        })
    }


    getFriends(id, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT idAmigo1 AS idAmigo, usuario.nombre FROM amigos, usuario WHERE idAmigo2 = ? " +
                    "AND amigos.idAmigo1 = usuario.id",
                    [id],
                    function (err, filas1) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            connection.query("SELECT idAmigo2 AS idAmigo, usuario.nombre FROM amigos, usuario WHERE idAmigo1 = ? " +
                                "AND amigos.idAmigo2 = usuario.id",
                                [id],
                                function (err, filas2) {
                                    connection.release();
                                    let filas_concat = filas1.concat(filas2);
                                    let amigos = new Map();

                                    for (let i = 0; i < filas_concat.length; i++) {
                                        console.log("id");
                                        console.log(filas_concat[0].idAmigo);
                                        amigos.set(filas_concat[i].idAmigo, filas_concat[i].nombre);
                                    }
                                    callback(null, amigos, JSON.stringify(filas_concat));
                                }
                            )
                        }
                    })
            }
        })
    }
    getNamesByIds(usuarios, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query('SELECT nombre, id FROM usuario WHERE id IN (' + usuarios.join() + ')',
                    function (err, filas) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            if (filas.length > 0) {
                                callback(null, filas);
                            }
                            else {
                                callback(null, null);
                            }

                        }
                    })
            }
        })

    }
    actualizarPuntuacion(id, puntos) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err.message);
            }
            else {
                connection.query("UPDATE USUARIOS SET PUNTOS = ? WHERE ID = ?", [puntos, id],
                    function (err) {
                        if (err) {
                            callback(new Error("Error al actualizar los puntos"));
                        }
                        else {
                            callback(null);
                        }
                    }
                )
            }

        })
    }
}
module.exports = DAOUsuarios;