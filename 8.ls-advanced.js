const { stat } = require('node:fs')
const fs = require('node:fs/promises')
const path  = require('node:path')

const folder = process.argv[2] ?? '.'

async function ls(folder){
let files
try{
    files = await fs.readdir(folder)
} catch{
    console.error(`No se pudo leer el directorio ${folder}`)
    process.exit(1)
}

const filesPromises = files.map(async file =>{
    const filePath = path.join(folder, file)
    let stats

    console.log('------')

    try{
    stats = await fs.stat(filePath) // status - informacion del archivo
    console.log('stats')
    } catch {
        console.error(`No se pudo leer el archivo ${filePath}`)
        process.exit(1)
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'
    const fileSize = stats.size.toString()
    const fileModified = stats.mtime.toLocaleDateString()

    return `${fileType} ${file.padEnd(20)} ${fileSize.padStart(10)} ${fileModified}`
})

const fileInfo = await Promise.all(filesPromises)

fileInfo.forEach(fileInfo => console.log(fileInfo))
}



ls(folder)
