import Blog from '../models/blog.js'

// GET: /api/blog/read  (public)
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 })
    res.json(blogs)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs', error: err.message })
  }
}

// POST: /api/blog/write  (protected — doctor only)
export const createBlog = async (req, res) => {
  try {
    const { title, content, author, image, category, docId } = req.body
    if (!title || !content || !author || !image || !category) {
      return res.status(400).json({ message: 'Please fill all fields' })
    }

    const blog = new Blog({ title, content, author, image, category, docId: docId || '' })
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
  } catch (err) {
    res.status(500).json({ message: 'Error creating blog', error: err.message })
  }
}

// DELETE: /api/blog/delete/:id  (protected — only the author doctor)
export const deleteBlog = async (req, res) => {
  try {
    const { docId } = req.body   // injected by authDoctor middleware
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' })
    }

    // If blog has a docId recorded, only that doctor can delete it
    if (blog.docId && blog.docId !== docId) {
      return res.status(403).json({ success: false, message: 'Not authorised to delete this blog' })
    }

    await Blog.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Blog deleted successfully' })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting blog', error: err.message })
  }
}
