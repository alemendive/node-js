/* const { promisify } = require('node:util')
const readFilePromise = promisify(fs.readFile) */
// Esto solo en los modulos nativos que no tienen promesas nativas

// TOP LEVEL AWAIT (los enmaScriptmodules pueden usar el await en el cuerpo del archivo)

import { readFile } from 'node:fs/promises'

Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8')
]).then(([text, secondText]) => {
  console.log('primer texto: ', text)
  console.log('segundo texto: ', secondText)
})
