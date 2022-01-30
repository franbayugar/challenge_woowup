const { v4: uuidv4 } = require('uuid');
const Usuario = require("./usuario");

class Tema{
    id = '';
    nombre = '';
    alertarAUsuarios = [];

    constructor(nombre = String){
        this.id = uuidv4();
        this.nombre = nombre;
    }

    agregarUsuario(user = Usuario){
        this.alertarAUsuarios.push(user);
    }

    contieneUsuario(user = Usuario){
        return this.alertarAUsuarios.includes(user);
    }


}

module.exports = Tema;