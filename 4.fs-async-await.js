/* const { promisify } = require('node:util')
const readFilePromise = promisify(fs.readFile) */
// Esto solo en los modulos nativos que no tienen promesas nativas


//TOP LEVEL AWAIT (los enmaScriptmodules pueden usar el await en el cuerpo del archivo)


const { readFile } =  require('node:fs/promises')

//IIFE - Inmedialty invoked Function Expression
;(
async () => {

    console.log('Leyendo el primer archivo...')
    const text = await readFile('./archivo.txt', 'utf-8')
    console.log('primer texto: ', text)
    console.log('----> Hacer cosas mientras lee el archivo...')
    
    
    console.log('Leyendo el segundo archivo...')
    const secondText = await readFile('./archivo2.txt', 'utf-8')
    console.log('segundo texto: ', secondText)

})()


