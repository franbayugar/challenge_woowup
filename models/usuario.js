const { v4: uuidv4 } = require('uuid');

class Usuario {
    id = '';
    nombre = '';
    temas = [];
    alertas = {};

    constructor (nombre){
        this.id = uuidv4();
        this.nombre = nombre;
    }

    addTema(tema){
        this.temas.push(tema);
    }

    notificar (alerta){
        this.alertas[alerta.id] = alerta;
    }

    getId(){
        return this.id;
    }

    getTemas(){
        if(this.temas !== null){
        return this.temas;
        }
        return null;
    }

    getAlertas(){
        if(this.alertas !== null){
            const listado = [];
            Object.keys(this.alertas).forEach(key => {
                listado.push(this.alertas[key]);
            })
            return listado;        
        }
        return null;
    }

    poseeAlerta(id){
        return this.alertas.includes(id);
    }
}

module.exports = Usuario;