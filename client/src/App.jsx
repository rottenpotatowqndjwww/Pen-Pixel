import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Navbar from './components/Navbar'
import BlogList from './components/BlogList'
import Footer from './components/Footer'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import Comments from './pages/admin/Comments'
import AdminLayout from './pages/admin/AdminLayout'
import Login from './components/admin/login'
import 'quill/dist/quill.snow.css'
import AboutUs from './pages/AboutUs'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/appContext'

const App = () => {

  const {isAdmin} = useAppContext()

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='blog/:id' element={<Blog />} />
          <Route path='/gotoblog' element={<BlogList />} />
          <Route path='/admin' element={isAdmin? <AdminLayout /> : <Login />} >
                <Route index element={<Dashboard />} />
                <Route path='addBlog' element={<AddBlog />} />
                <Route path='listBlog' element={<ListBlog />} />
                <Route path='comments' element={<Comments />} />
          </Route>
          <Route path='/about' element={<AboutUs />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App
