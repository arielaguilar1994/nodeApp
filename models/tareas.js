const Tarea = require("./tarea");

class Tareas {
    _list = {};

    get listadoArr(){
        const listado = [];

        Object.keys(this._list).forEach( key => {
            listado.push( this._list[key] );
        });

        return listado;
    }

    constructor(){
        this._list = {};
    }

    borrarTarea( id = ''){

        if( this._list[id] ){
            delete this._list[id];
        }
        
    }

    cargarTaresFromArray ( tareas = [] ){
        tareas.forEach( tarea => {
            this._list[tarea.id] = tarea;
        });
    }

    listadoCompleto(){
        this.listadoArr.forEach((tarea, i) => {
            
            this.imprimirItemFormatt(tarea, i);

        });
    }

    liastarPendientesCompletadas( completadas = true ){
        let indice = 0;
        this.listadoArr.forEach( tarea => {
            if(completadas && tarea.completedIn ){
                indice += 1;
                this.imprimirItemFormatt(tarea, indice)
            }else if(!completadas && !tarea.completedIn){
                indice += 1;
                this.imprimirItemFormatt(tarea, indice)
            }
        });
    }


    imprimirItemFormatt(tarea, i){
        const idx = `${i + 1}`.green;
        const { description, completedIn } = tarea;
        const state = (completedIn) ? `${'Completado'.green} - ${completedIn}` : 'Pendiente'.red;

        console.log(`${idx}. ${description} :: ${ state }`);
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._list[tarea.id] = tarea;
    }

    toggleCompletadas( ids = []){
        ids.forEach( (id) => {
            const tarea = this._list[id];
            if( !tarea.completedIn ){
                 tarea.completedIn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( (tarea) => {
            if( !ids.includes(tarea.id) ){
                this._list[tarea.id].completedIn = null;
            } 
        });
    }
}

module.exports = Tareas;