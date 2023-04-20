// configuración de multer
const multer = require('multer')
const {dirname} = require('path')
console.log(`${dirname(__dirname)}/public/uploads`)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${dirname(__dirname)}/public/uploads`)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }   
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype !== 'application/pdf'){
        req.fileValidationError = 'Formato no válido, solo pdf'
        return cb(null, false, new Error('Formato no válido'))
    }
    cb(null, true)
}

const uploader = multer({
    storage,
    fileFilter,
    onError: (err, next) => {
        console.log('error', err)
        next(err)
    }
})

module.exports = {uploader}