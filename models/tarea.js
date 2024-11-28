const { v4: uuidv4 } = require('uuid');

class Tarea {
    id = '';
    desc = '';
    completadoEn = null;

    constructor(desc) {
        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = null;
    }

    marcarCompletada() {
        this.completadoEn = new Date().toISOString();
    }

    desmarcar() {
        this.completadoEn = null; // Reinicia el estado de la tarea.
    }
}

module.exports = Tarea;
