const inquirer = require('inquirer');
require('colors');

const options = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Sistema de alertas, seleccione una opción',
        choices: [{
            value: '1',
            name: `${'1.'.green} Registrar usuario`
        },
        {
            value: '2',
            name: `${'2.'.green} Registrar tema`
        },
        {
            value: '3',
            name: `${'3.'.green} Suscribirse a un tema`
        },
        {
            value: '4',
            name: `${'4.'.green} Enviar alerta a todos los usuarios`
        },
        {
            value: '5',
            name: `${'5.'.green} Enviar alerta a un usuario`
        },
        {
            value: '6',
            name: `${'6.'.green} Mis alertas`
        },
        {
            value: '7',
            name: `${'7.'.green} Listar alertas de un usuario no expiradas`
        },
        {
            value: '8',
            name: `${'8.'.green} Listar alertas de un tema no expiradas`
        },
        {
            value: '0',
            name: `${'0.'.red} Salir`
        }
        ]
    }
];




const inquirerMenu = async () => {
    console.clear();
    console.log('======================='.green);
    console.log('Seleccione una opción'.white);
    console.log('=======================\n'.green);

    const { opcion } = await inquirer.prompt(options);

    return opcion;

}

const pausa = async () => {
    const pausaMsg = [
        {
            type: 'input',
            name: 'salida',
            message: `\nPresione ${'ENTER'.green} para continuar\n`,

        }
    ];

    console.log('\n');

    await inquirer.prompt(pausaMsg);
}

const leerInput = async (message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Por favor ingrese un valor';
            }
            return true;
        }

    }];
    const { desc } = await inquirer.prompt(question);

    return desc;

}

const listadoTemasSimple = async (temas = []) => {
    const choices = temas.map((tema, i) => {
        const idx = `${i + 1}`.green;

        return {
            value: tema.id,
            name: `${idx} ${tema.nombre}`
        }
    });


    const preguntas = [{
        type: 'list',
        name: 'ids',
        message: 'Seleccione el tema para enviar una alerta a los usuarios subscriptos',
        choices
    }];


    const { ids } = await inquirer.prompt(preguntas);

    return ids;
}

const listadoTemas = async (temas = [], userID) => {
    const choices = temas.map((tema, i) => {
        const idx = `${i + 1}`.green;

        return {
            value: tema.id,
            name: `${idx} ${tema.nombre}`,
            checked: (tema.alertarAUsuarios.includes(userID))
                ? true
                : false
        }
    });


    const preguntas = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Seleccione un tema para recibir alerta',
        choices
    }];


    const { ids } = await inquirer.prompt(preguntas);

    return ids;
}

const listadoAlertas = async (alertas) => {
    const choices = alertas.map((alerta, i) => {
        const idx = `${i + 1}`.green;
        return {
            value: alerta.id,
            name: `${idx} Alerta sobre: ${alerta.tema.nombre}`,
            checked: (alerta.leida)
            ? true
            : false
        }
    });


    const preguntas = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Marque las notificaciones como leidas',
        choices
    }];


    const { ids } = await inquirer.prompt(preguntas);

    return ids;
}

const listadoUsuarios = async (tema, usuarios) => {
    if (tema.alertarAUsuarios.length) {
        const choices = tema.alertarAUsuarios.map((usuario, i) => {

            const idx = `${i + 1}`.green;

            return {
                value: usuarios[usuario].id,
                name: `${idx} ${usuarios[usuario].nombre}`
            }

        })

        const preguntas = [{
            type: 'list',
            name: 'ids',
            message: 'Seleccione el usuario al que desea enviar la alerta',
            choices
        }];


        const { ids } = await inquirer.prompt(preguntas);

        return ids;
    }
    return null;
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTemas,
    listadoTemasSimple,
    listadoUsuarios,
    listadoAlertas
}