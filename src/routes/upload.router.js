const {Router} = require('express')
const fs = require('fs')
const {dirname} = require('path')
const { uploader } = require('../utils/uploader')

const router = Router()

router.get('/', async (req, res) => {
    try {
        // let pdfs
        console.log(`${dirname(__dirname)}/public/uploads`)
        const resp = await fs.promises.readdir(`${dirname(__dirname)}/public/uploads`)
        
        // console.log(resp)
        res.status(200).send({ 
            status: 'success',
            payload: resp
         })
        
    } catch (error) {
        console.log(error)
    }
  })

  router.get('/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = `${dirname(__dirname)}/public/uploads/${fileName}`
    res.download(filePath)
  })

router.post('/', uploader.single('myFile'),(req,res) => {
    console.log('file: ',req.file)
    console.log('fileValidationError: ',req.fileValidationError)
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

module.exports = router