import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import Layout from './components/Layout'
import { AuthProvider, useAuth } from './context/AuthContext'

// Lazy loaded pages
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Terms = lazy(() => import('./pages/Terms'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const AdminBlogEditor = lazy(() => import('./pages/AdminBlogEditor'))
const ToolScanner = lazy(() => import('./pages/ToolScanner'))
const IpScanner = lazy(() => import('./pages/IpScanner'))

const LoadingFallback = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
    <div className="w-12 h-12 border-2 border-matrix-400/20 border-t-matrix-400 rounded-full animate-spin" />
    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Decrypting Page Assets...</p>
  </div>
)

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
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tools/:toolId" element={<ToolScanner />} />
              <Route path="/dns-lookup" element={<ToolScanner toolId="dns-lookup" />} />
              <Route path="/ssl-checker" element={<ToolScanner toolId="ssl-checker" />} />
              <Route path="/security-headers" element={<ToolScanner toolId="security-headers" />} />
              <Route path="/vulnerability-scanner" element={<ToolScanner toolId="vulnerability-scanner" />} />
              <Route path="/threat-intelligence" element={<ToolScanner toolId="threat-intelligence" />} />
              <Route path="/ip-scanner" element={<IpScanner />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/edit/:id" element={<AdminRoute><AdminBlogEditor /></AdminRoute>} />
              <Route path="/blog/new" element={<AdminRoute><AdminBlogEditor /></AdminRoute>} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  )
}
