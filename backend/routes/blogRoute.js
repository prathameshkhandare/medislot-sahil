import express from 'express'
import * as blogController from '../controllers/blogController.js'
import authDoctor from '../middleware/authDoctor.js'

const router = express.Router()

// Public
router.get('/read', blogController.getAllBlogs)

// Protected — doctor must be logged in
router.post('/write', authDoctor, blogController.createBlog)
router.delete('/delete/:id', authDoctor, blogController.deleteBlog)

export default router
