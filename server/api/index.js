import express from 'express'
import controller from './controller.js'

const router = express.Router()

router
  .post('/store', controller.onStore)
  .get('/get', controller.onGet)
  .post('/search', controller.onSearch)

export default router
