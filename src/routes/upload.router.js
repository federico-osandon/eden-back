const {Router} = require('express')
const fs = require('fs')
const {dirname} = require('path')
const { uploader } = require('../utils/uploader')

const router = Router()

router.get('/', async (req, res) => {
    try {       
        const resp = await fs.promises.readdir(`${dirname(__dirname)}/public/uploads`)        
        
        res.status(200).send({ 
            status: 'success',
            payload: resp
         })
        
    } catch (error) {
        console.log(error)
    }
  })

router.get('/:fileName', (req, res) => {
    const {fileName} = req.params
    const filePath = `${dirname(__dirname)}/public/uploads/${fileName}`
    res.download(filePath)
})

router.post('/', uploader.single('myFile'),(req,res) => {
    // console.log('file: ',req.file)
    // console.log('fileValidationError: ',req.fileValidationError)
    if(req.fileValidationError){
        return res.status(400).send({
            status: 'error',
            payload: req.fileValidationError
        })
    }
    res.status(200).send({
        status: 'success',
        payload: 'Archivo subido con éxito'
    })
})

router.delete('/:fileName', async (req, res) => {
    try {
        const { fileName } = req.params
        const filePath = `${dirname(__dirname)}/public/uploads/${fileName}`
        await fs.promises.unlink(filePath)
        // console.log(result)
        // if (!result) {
        //     return res.status(400).send({
        //         status: 'error',
        //         payload: 'No se pudo eliminar el archivo'
        //     })
        // }      
        res.status(200).send({
            status: 'success',
            payload: 'Archivo eliminado con éxito'
        })        
    } catch (error) {
        console.log(error)
    }
})

module.exports = router