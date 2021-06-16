const Tarea = require("./tarea");

class Tareas {
    _list = {};

    constructor(){
        this._list = {};
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._list[tarea.id] = tarea;
    }
}

module.exports = Tareas;