import React from 'react'
import nav_logo from '../../assets/nav_logo.webp'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
import axios from 'axios'
import toast from 'react-hot-toast'

const AdminLayout = () => {
  const navigate = useNavigate();
  
  const logout = async() => {
    try {
      const {data} = await axios.post('/api/admin/logout', {}, {withCredentials : true})
      if(data.success){
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(data.message)
    }
    navigate('/')
  }
  
  return (
    <>
      {/* Admin Header */}
      <div className='flex items-center justify-between py-3 h-[70px] px-4 sm:px-8 lg:px-12 bg-white border-b border-gray-200 shadow-sm'>
        <div className='flex items-center gap-4'>
          <img 
            src={nav_logo} 
            alt="Brand logo" 
            className='w-32 sm:w-40 cursor-pointer hover:opacity-80 transition-opacity duration-200' 
            onClick={() => navigate('/')} 
          />
          <div className='hidden sm:block'>
            <span className='text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full'>
              Admin Panel
            </span>
          </div>
        </div>
        
        <div className='flex items-center gap-4'>
          
          {/* Logout Button */}
          <button 
            onClick={logout}
            className='bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
          >
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Layout */}
      <div className='flex h-[calc(100vh-70px)] bg-gray-50'>
        <Sidebar />
        <main className='flex-1 overflow-auto'>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default AdminLayout