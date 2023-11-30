const express = require('express')
const  { createPost } = require('../conrollers/postControllers')

const router = express.Router()


router.post("/create", createPost)

module.exports = router