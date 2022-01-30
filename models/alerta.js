const { v4: uuidv4 } = require('uuid');

class Alerta {
    id = '';
    fechaExp = null;
    leida = false;
    tema = null;

    constructor(tema) {
        this.id = uuidv4();
        this.tema = tema;
    }

    setFechaExp(date) {
        this.fechaExp = date;
    }

    enviarAlerta(tema, usuario) {
        if (this.fechaExp === null || this.fechaExp >= Date.now()) {
            if (tema.alertarAUsuarios.includes(usuario.id)) {
                usuario.notificar(this);
                console.log(`Notificación sobre: ${tema.nombre}`);
            }
        }
    }

    enviarATodos(tema){
        tema.alertarAUsuarios.forEach(usuarioID => {
            this.enviarAlerta(tema, usuarioID);
        });
    }

    leida(leida = false){
        this.leida = leida;
    }

    getTema(){
        return this.tema;
    }



}


class Urgente extends Alerta {
    enviarAlerta(tema, usuario) {
        console.log(`Notificación sobre: ${tema.nombre}`);
    }
}

module.exports = Alerta, Urgente;