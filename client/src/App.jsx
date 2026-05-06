import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import About from './pages/About'
import Contact from './pages/Contact'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminBlogEditor from './pages/AdminBlogEditor'
import { AuthProvider, useAuth } from './context/AuthContext'

import IpScanner from './pages/IpScanner'

const AdminRoute = ({ children }) => {
  const { role } = useAuth();
  if (role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  useEffect(() => {
    document.documentElement.className = 'dark'
  }, [])

  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ip-scanner" element={<IpScanner />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/edit/:id" element={<AdminRoute><AdminBlogEditor /></AdminRoute>} />
            <Route path="/blog/create" element={<AdminRoute><AdminBlogEditor /></AdminRoute>} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  )
}
