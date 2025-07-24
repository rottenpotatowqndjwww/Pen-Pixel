import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';
import axios from 'axios';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [dashboardData, setDashBoardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  useEffect(() => {
    const fetchDashBoard = async () => {
      try {
        const { data } = await axios.get('/api/admin/dashboard', { withCredentials: true });
        data.success
          ? setDashBoardData(data.dashboardData)
          : toast.error(data.message);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchDashBoard();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of your blog management</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Blogs Card */}
        <StatCard icon={assets.dashboard_icon_1} bgColor="blue-50" value={dashboardData.blogs} label="Total Blogs" />
        {/* Comments Card */}
        <StatCard icon={assets.dashboard_icon_2} bgColor="green-50" value={dashboardData.comments} label="Comments" />
        {/* Drafts Card */}
        <StatCard icon={assets.dashboard_icon_3} bgColor="orange-50" value={dashboardData.drafts} label="Drafts" />
      </div>

      {/* Recent Blogs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 p-6 border-b border-gray-100">
          <div className="bg-gray-50 p-2 rounded-lg">
            <img src={assets.dashboard_icon_4} alt="Recent blogs" className="w-5 h-5 object-contain" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Latest Blogs</h2>
            <p className="text-sm text-gray-500">Recently created blog posts</p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">#</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Blog Title</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase max-sm:hidden">Date Created</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(dashboardData.recentBlogs) && dashboardData.recentBlogs.length > 0 ? (
                dashboardData.recentBlogs.map((blog, index) => (
                  <BlogTableItem
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={() => window.location.reload()} // Optional: update to re-fetch if needed
                    index={index + 1}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="bg-gray-100 p-3 rounded-full">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 font-medium">No blogs found</p>
                      <p className="text-gray-400 text-sm">Create your first blog post to get started</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Reusable stat card component
const StatCard = ({ icon, bgColor, value, label }) => (
  <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
    <div className={`bg-${bgColor} p-3 rounded-lg`}>
      <img src={icon} alt={label} className="w-6 h-6 object-contain" />
    </div>
    <div className="flex flex-col">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm font-medium text-gray-500">{label}</p>
    </div>
  </div>
);

export default Dashboard;
