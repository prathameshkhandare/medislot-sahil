"use client"

import { useState, useEffect, useContext } from "react"
import { Loader2, Trash2 } from "lucide-react"
import { DoctorContext } from "../../context/DoctorContext"
import { toast } from "react-toastify"

function BlogList() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const { dToken, backendUrl, profileData, getProfileData } = useContext(DoctorContext)

  // Get logged-in doctor profile so we know their _id
  useEffect(() => {
    if (dToken && !profileData) getProfileData()
  }, [dToken])

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/blog/read`)
      const data = await response.json()
      setBlogs(data)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const handleDelete = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return
    try {
      const res = await fetch(`${backendUrl}/api/blog/delete/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          dtoken: dToken,   // authDoctor reads this header
        },
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Blog deleted successfully')
        fetchBlogs()
      } else {
        toast.error(data.message || 'Could not delete blog')
      }
    } catch (err) {
      toast.error('Error deleting blog')
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (blogs.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No blogs found.</p>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => {
        // Show delete button only on this doctor's own blogs
        const isOwner = profileData && (blog.docId === profileData._id)

        return (
          <div key={blog._id} className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden relative">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={blog.image || "/placeholder.svg?height=200&width=400"}
                alt={blog.title}
                className="h-full w-full object-cover transition-transform hover:scale-105"
                onError={(e) => { e.target.src = "/placeholder.svg?height=200&width=400" }}
              />
            </div>

            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {blog.category}
                </span>
                {isOwner && (
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors"
                    title="Delete your blog"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                )}
              </div>
              <h3 className="text-xl font-bold">{blog.title}</h3>
              <p className="mt-2 line-clamp-3 text-muted-foreground text-sm">{blog.content}</p>
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>By {blog.author}</span>
                <span>{new Date(blog.createdAt || blog.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BlogList
