const {Router} = require('express')
const uploadRouter = require('./upload.router')

const router = Router()

router.use('/api/pdfs', uploadRouter)


module.exports = router