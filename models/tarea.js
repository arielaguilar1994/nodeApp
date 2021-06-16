const { v4: uuidV4 } = require('uuid');

class Tarea {
    id = '';
    description = '';
    completedIn = null;

    constructor(desc){
        this.id = uuidV4();
        this.description = desc;
        this.completedIn = null;
    }
}

module.exports = Tarea;