require('colors');
const { inquirerMenu, pausa, leerInput, listadoTemas, listadoTemasSimple, listadoUsuarios, listadoAlertas } = require('./helpers/inquirer');
const Usuario = require('./models/usuario');
const Tema = require('./models/tema');
const Session = require('./models/session');
const Alerta = require('./models/alerta');
const Urgente = require('./models/alerta');

console.clear();

const main = async () => {
    let opt = '';
    let session = new Session();

    do {

        opt = await inquirerMenu();

        switch (opt) {

            case '1':
                const nombreUser = await leerInput('Ingrese su nombre');
                const user = new Usuario(nombreUser);
                session.registrarUser(user);
                break;
            case '2':
                const nombreTema = await leerInput('Ingrese el nombre del tema');
                const tema = new Tema(nombreTema);
                session.registrarTema(tema);
                break;
            case '3':
                if (session.getTemas().length) {
                    let ids = await listadoTemas(session.getTemas(), session.usuarioLoggeado.getId());
                    session.toggleTema(ids, session.usuarioLoggeado.getId());
                }
                else {
                    console.log('No hay temas registrados');
                }
                break;
            case '4':
                let id = await listadoTemasSimple(session.getTemas());
                let alert = new Alerta(session.listaTemas[id]);
                alert.enviarATodos(session.listaTemas[id]);
                break;
            case '5':
                let idTema = await listadoTemasSimple(session.getTemas());
                let idUsuario = await listadoUsuarios(session.listaTemas[idTema], session.listaUsuarios);
                if (idUsuario !== null) {
                    alertUser = new Alerta(session.listaTemas[idTema]);
                    alertUser.enviarAlerta(session.listaTemas[idTema], session.listaUsuarios[idUsuario]);
                } else {
                    console.log('No hay usuarios subscriptos al tema');
                }
                break;
            case '6':
                if(session.usuarioLoggeado !== null && session.usuarioLoggeado.getAlertas() !== null){
                let alertasUser = session.usuarioLoggeado.getAlertas();
                let ids = await listadoAlertas(alertasUser); 
                session.toggleAlarma(session.usuarioLoggeado.alertas, ids);
                }else{
                    console.log('No hay alertas disponibles');
                }
                break;
            case '7':
                if(session.usuarioLoggeado !== null){
                session.listarAlertasUsuario();
                }else{
                    console.log('Debe logearse primero');
                }
            break;




        }


        if (opt !== '0') await pausa();

    } while (opt !== '0');




}

main();