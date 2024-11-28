const Tarea = require('./tarea');
require('colors');

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push({ id: key, ...tarea });
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listarTareas() {
        console.log('\n==============================='.green);
        console.log('       Lista de Tareas        '.yellow);
        console.log('===============================\n'.green);

        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}.`.green;
            const { desc, completadoEn } = tarea;
            const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    listarCompletadas() {
        console.log('\nTareas completadas:'.yellow);
        const completadas = this.listadoArr.filter(tarea => tarea.completadoEn);
        if (completadas.length === 0) {
            console.log('No hay tareas completadas.'.red);
        } else {
            completadas.forEach((tarea, i) => {
                const idx = `${i + 1}.`.green;
                console.log(`${idx} ${tarea.desc} :: ${tarea.completadoEn.green}`);
            });
        }
    }

    listarPendientes() {
        console.log('\nTareas pendientes:'.yellow);
        const pendientes = this.listadoArr.filter(tarea => !tarea.completadoEn);
        if (pendientes.length === 0) {
            console.log('No hay tareas pendientes.'.red);
        } else {
            pendientes.forEach((tarea, i) => {
                const idx = `${i + 1}.`.green;
                console.log(`${idx} ${tarea.desc}`);
            });
        }
    }

    completarTareas(ids = []) {
        ids.forEach(id => {
            if (this._listado[id]) {
                this._listado[id].completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }
}

module.exports = Tareas;
