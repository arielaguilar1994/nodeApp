const { guardarDB, leerDB } = require('./helpers/guardarArchivos');
const { inquirerMenu, pausa, readInput, listadoTareasBorrar, confirm, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

require('colors');
// const { mostrarMenu, pausa } = require('./helpers/mensajes')
console.clear();

const main = async() => {
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){
        tareas.cargarTaresFromArray(tareasDB);
    }

    do {
        // opt = await mostrarMenu();
        // console.log({opt});
        // await pausa();
        
        //imprimir menu
        opt = await inquirerMenu();
 
        switch (opt) {
            case '1':
                const desc = await readInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.liastarPendientesCompletadas(true);
                break;
            case '4':
                tareas.liastarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== 0){
                    const confirmed = await confirm('¿Estas seguro?');
                    if(confirmed){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
                break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !== '0');
};

main();