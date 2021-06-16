const { inquirerMenu, pausa, readInput } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

require('colors');
// const { mostrarMenu, pausa } = require('./helpers/mensajes')
console.clear();

const main = async() => {
    let opt = '';
    const tareas = new Tareas();

    do {
        // opt = await mostrarMenu();
        // console.log({opt});
        // await pausa();
        
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await readInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                console.log(tareas._list);
                break;
            case '3':
                break;
            case '4':
                break;
            case '5':
                break;
        }

        await pausa();

    } while (opt !== '0');
};

main();