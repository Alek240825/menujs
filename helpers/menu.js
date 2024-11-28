const inquirer = require('inquirer');
require('colors');

const questions = {
  type: "list",
  name: "options",
  message: "Escoge la opción de tu preferencia. ",
  choices: [
    {
      value: "1",
      name: `${"1".red} Crear tarea`,
    },
    {
      value: "2",
      name: `${"2".red} Listar tareas`,
    },
    {
      value: "3",
      name: `${"3".red} Listar tareas completas`,
    },
    {
      value: "4",
      name: `${"4".red} Listar tareas pendientes`,
    },
    {
      value: "5",
      name: `${"5".red} Completar tarea(s)`,
    },
    {
      value: "6",
      name: `${"6".red} Borrar tarea`,
    },
    {
      value: "0",
      name: `${"0".red} Salir`,
    },
  ],
};

const menu = async () => {
  console.clear(); //Limpia la consola
  console.log(`${"°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°".blue}`);
  console.log(`${"°                                   °".blue}`);
  console.log(`${"°         Bienvenido al menú        °".yellow}`);
  console.log(`${"°                                   °".blue}`);
  console.log(`${"°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°".blue}`);

  const { options } = await inquirer.prompt(questions);  // Removed .default here
  return options; //retorna la opción que el usuario selecciona
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione la tecla ${"enter".green}`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question); // Removed .default here
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question); // Removed .default here
  return desc;
};

module.exports = {
  menu,
  pausa,
  leerInput,
};
