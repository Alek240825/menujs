const { menu, pausa, leerInput } = require("./helpers/menu");
const Tareas = require("./models/tareas");
const { guardarDB, logAccion } = require('./helpers/guardarArchivo'); // Importamos la función
const inquirer = require('inquirer');

const principal = async () => {
    let opt = '';
    const tareas = new Tareas();

    do {
        opt = await menu();

        switch (opt) {
            case "1": // Crear tarea
                const desc = await leerInput("Descripción: ");
                tareas.crearTarea(desc);
                console.log('\nTarea creada exitosamente!'.green);
                logAccion(`Tarea creada: ${desc}`); // Registrar la acción
                guardarDB(tareas.listadoArr); // Guardar el estado actualizado de las tareas
                break;

            case "2": // Listar todas las tareas
                tareas.listarTareas();
                logAccion('Listado de todas las tareas');
                break;

            case "3": // Listar tareas completadas
                tareas.listarCompletadas();
                logAccion('Listado de tareas completadas');
                break;

            case "4": // Listar tareas pendientes
                tareas.listarPendientes();
                logAccion('Listado de tareas pendientes');
                break;

            case "5": // Completar tareas
                const ids = await mostrarChecklist(tareas.listadoArr);
                tareas.completarTareas(ids);
                console.log('\nTareas completadas exitosamente!'.green);
                logAccion(`Tareas completadas: ${ids.join(', ')}`);
                guardarDB(tareas.listadoArr); // Guardar el estado actualizado de las tareas
                break;

            case "6": // Borrar tarea
                const id = await confirmarBorrarTarea(tareas.listadoArr);
                if (id !== '0') {
                    const confirm = await confirmar('¿Está seguro de borrar esta tarea?');
                    if (confirm) {
                        tareas.borrarTarea(id);
                        console.log('\nTarea borrada exitosamente!'.green);
                        logAccion(`Tarea borrada: ${id}`);
                        guardarDB(tareas.listadoArr); // Guardar el estado actualizado de las tareas
                    }
                }
                break;

            default:
                break;
        }

        await pausa();
    } while (opt !== "0");

    console.log('Gracias por usar el gestor de tareas!'.green);
};

const mostrarChecklist = async (tareas) => {
    const choices = tareas.map((tarea, i) => ({
        value: tarea.id,
        name: `${i + 1}. ${tarea.desc}`,
        checked: !!tarea.completadoEn,
    }));

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione las tareas a completar',
            choices,
        },
    ];

    const respuestas = await inquirer.prompt(preguntas);
    return respuestas.ids;
};

const confirmarBorrarTarea = async (tareas) => {
    const choices = tareas.map((tarea, i) => ({
        value: tarea.id,
        name: `${i + 1}. ${tarea.desc}`,
    }));

    choices.unshift({ value: '0', name: 'Cancelar'.red });

    const pregunta = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione la tarea a borrar',
            choices,
        },
    ];

    const { id } = await inquirer.prompt(pregunta);
    return id;
};

const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message,
        },
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
};

principal();
