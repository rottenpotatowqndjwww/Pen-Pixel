import { createContext, useContext, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

// Set base URL globally
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [input, setInput] = useState("")
  const [isAdmin,setIsAdmin]  = useState(null)

  const fetchBlogs = async (isMounted) => {
  try {
    const { data } = await axios.get('/api/blog/all', { withCredentials: true })

    if (isMounted) {
      if (data.success) {
        setBlogs(data.blogs)
      } else {
        toast.error(data.message || "Failed to fetch blogs.")
      }
    }
  } catch (error) {
    if (isMounted) {
      toast.error(error.response?.data?.message || error.message)
    }
  }
}

const authAdmin = async (isMounted) => {
  try {
    const { data } = await axios.get('/api/admin/auth-admin', { withCredentials: true })

    if (isMounted) {
      if (data.success) {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }
    }
  } catch (error) {
    if (isMounted) {
      setIsAdmin(false)
    }
  }
}

useEffect(() => {
  let isMounted = true

  fetchBlogs(isMounted)
  authAdmin(isMounted)

  return () => {
    isMounted = false
  }
}, [])


  const value = { token, blogs, input, setToken, setBlogs, setInput , isAdmin ,setIsAdmin}

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
