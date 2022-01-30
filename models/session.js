const Tema = require("./tema");
const Usuario = require("./usuario");

class Session {
    listaTemas;
    listaUsuarios;
    usuarioLoggeado; //sera el primero en registrarse


    constructor() {
        this.listaTemas = {};
        this.listaUsuarios = {};
        this.usuarioLoggeado = null;
    }

    registrarTema(tema = Tema) {
        this.listaTemas[tema.id] = tema;
    }

    registrarUser(user = Usuario) {
        if (Object.keys(this.listaUsuarios).length === 0) {
            this.usuarioLoggeado = user;
        }
        this.listaUsuarios[user.id] = user;
    }

    getTemas() {
        const listado = [];
        Object.keys(this.listaTemas).forEach(key => {
            listado.push(this.listaTemas[key]);
        })
        return listado;

    }

    getUsuarios() {
        return [this.usuarioLoggeado];
    }


    toggleTema(ids = [], usuario) {
        ids.forEach(id => {

            if (!this.listaTemas[id].contieneUsuario(usuario)) {
                this.listaTemas[id].alertarAUsuarios.push(usuario);
            }
        });

        this.getTemas().forEach(tema => {
            if (!ids.includes(tema.id)) {
                this.listaTemas[tema.id].alertarAUsuarios.splice(usuario);

            }
        });
    }

    enviarAlertaAtodos(id) {
        const usuariosID = this.listaTemas[id].alertarAUsuarios;
        usuariosID.forEach(id => {
            if (this.usuario.id === id) {  //suponiendo a cada usuario que haya ingresado al sistema se le enviara notificacion
                console.log('Notficado!');
            }
        })
    }

    enviarAlertaAUsuario(idTema, idUsuario) {
        const usuariosID = this.listaTemas[idTema].alertarAUsuarios;
        usuariosID.forEach(id => {
            if (id === idUsuario) {  //suponiendo a cada usuario que haya ingresado al sistema se le enviara notificacion
                console.log('Notficado!');
            }
        });
    }

    toggleAlarma(alertas, ids = []) {
        ids.forEach(id => {

            if (alertas[id].id === id) {
                alertas[id].leida = true;
            }
        });
        return alertas;
    }

    listarAlertasUsuario() {
        let indice = 0;
        if (Object.keys(this.usuarioLoggeado.alertas).length > 0) {
            Object.keys(this.usuarioLoggeado.alertas).forEach((alerta) => {
                const { fechaExp, tema, leida } = this.usuarioLoggeado.alertas[alerta];
                if (fechaExp !== null) {
                    if (!leida) {
                        indice += 1;
                        console.log(`${(indice + '.').green} Alerta sobre:  ${tema.nombre} `);
                    }
                }
            });
        } else {
            console.log('No hay alertas registradas');
        }
    }

    listarAlertasDadoUnTema(tema){
        
    }

}

module.exports = Session;