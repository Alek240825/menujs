const fs = require('fs');
const path = require('path');

// Función para guardar datos en el archivo 'data.txt'
const guardarDB = (data) => {
    const archivo = './db/data.txt';

    // Si los datos son un arreglo de objetos, puedes formatearlos como una tabla
    if (Array.isArray(data)) {
        const headers = Object.keys(data[0]);
        const headerRow = `| ${headers.map(header => header.padEnd(20)).join(' | ')} |`;
        const separator = `| ${headers.map(() => '-'.padEnd(20)).join(' | ')} |`;
        
        const rows = data.map(item => {
            return `| ${headers.map(header => (item[header] || '').toString().padEnd(20)).join(' | ')} |`;
        });

        // Escribir los datos en el archivo de manera estructurada
        const table = `+${'-'.repeat(headerRow.length - 2)}+\n${headerRow}\n${separator}\n${rows.join('\n')}\n+${'-'.repeat(headerRow.length - 2)}+`;

        fs.writeFileSync(archivo, table); // Guardar en formato tabla
    } else {
        // Si no es un arreglo, guardar los datos en formato JSON legible
        fs.writeFileSync(archivo, JSON.stringify(data, null, 2)); // Guardar con formato legible
    }
}

// Función para registrar una acción con formato de tabla
const logAccion = (accion) => {
    const logDir = './db'; // Directorio donde se almacenan los logs
    const logFile = path.join(logDir, 'log.txt');
    
    // Verifica si el directorio existe, y si no, lo crea
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true }); // Crea el directorio de forma recursiva
    }

    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${accion}\n`;

    // Verificar si el archivo existe y si no, agregar encabezado de la tabla
    if (!fs.existsSync(logFile)) {
        const header = `+----------------------------+--------------------------------------------+\n`;
        const headerRow = `| ${'Timestamp'.padEnd(24)} | ${'Acción'.padEnd(40)} |\n`;
        const separator = `+----------------------------+--------------------------------------------+\n`;
        fs.writeFileSync(logFile, header + headerRow + separator);
    }

    // Escribir el registro en formato de tabla
    const logRow = `| ${timestamp.padEnd(24)} | ${accion.padEnd(40)} |\n`;
    fs.appendFileSync(logFile, logRow); // Append para no sobrescribir el archivo
}

module.exports = {
    guardarDB,
    logAccion
};
