import { Router } from 'express'
import * as hotelController from '../controllers/hotelController.js'

const router = Router()

router.get('/', hotelController.getHotels)
router.get('/search', hotelController.searchHotels)
router.get('/:id', hotelController.getHotel)

export default router
