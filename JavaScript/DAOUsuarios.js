const mysql = require("mysql");

/*
Funcionalidades de DAOUsuarios
    Constructor
*/

class DAOUsuarios{

    constructor(host, user, password, database) {

        this.pool = mysql.createPool({
            host: host,
            user: user,
            password: password,
            database: database
        });

    }
}