import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_BASE, BASE_URL } from '../utils/api';

export default function AdminBlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, role } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    category: 'OSINT',
    tags: '',
    meta_title: '',
    meta_description: '',
    image_url: ''
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/blog');
      return;
    }

    if (id) {
      // Edit mode, fetch article (in our API, we only have get by slug, wait, let's just fetch articles and find by id, or add get by id)
      // Actually, since our API only has GET /{slug}, we might need to find it by slug or update the API to GET by ID.
      // But for now we can fetch all and find, or just assume the user passes the ID to update.
      // Let's modify the backend later if needed, but for now we can do a hacky fetch all.
      fetch(`${API_BASE}/blog`)
        .then(res => res.json())
        .then(data => {
          const article = data.find(a => a._id === id);
          if (article) {
            setFormData({
              title: article.title,
              slug: article.slug,
              content: article.content,
              category: article.category,
              tags: article.tags.join(', '),
              meta_title: article.meta_title || '',
              meta_description: article.meta_description || '',
              image_url: article.image_url || ''
            });
          }
        });
    }
  }, [id, navigate, role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const res = await fetch(`${API_BASE}/blog/upload-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataUpload
      });

      if (!res.ok) throw new Error('Failed to upload image');
      const data = await res.json();
      setFormData(prev => ({ ...prev, image_url: data.url }));
    } catch (err) {
      setError('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    const url = id 
      ? `${API_BASE}/blog/update/${id}`
      : `${API_BASE}/api/blog/create`;
      
    // Wait, the create URL in the original code was '/api/blog/create' but API_BASE already includes '/api'
    const correctUrl = id 
      ? `${API_BASE}/blog/update/${id}`
      : `${API_BASE}/blog/create`;
    const method = id ? 'PUT' : 'POST';

    try {
      const response = await fetch(correctUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Failed to save article');
      }

      navigate('/blog');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-8 glass rounded-2xl border border-matrix-400/[0.06]">
      <h2 className="text-2xl font-bold font-display text-white mb-6">
        {id ? 'Edit Article' : 'Write New Article'}
      </h2>
      {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-surface-900 border border-matrix-400/[0.1] rounded-lg px-4 py-2 text-white focus:border-matrix-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full bg-surface-900 border border-matrix-400/[0.1] rounded-lg px-4 py-2 text-white focus:border-matrix-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full bg-surface-900 border border-matrix-400/[0.1] rounded-lg px-4 py-2 text-white focus:border-matrix-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full bg-surface-900 border border-matrix-400/[0.1] rounded-lg px-4 py-2 text-white focus:border-matrix-400 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Featured Image</label>
          <div className="flex items-center gap-6">
            <div className="w-32 h-20 bg-surface-900 border border-matrix-400/[0.1] rounded-lg overflow-hidden flex items-center justify-center">
              {formData.image_url ? (
                <img src={formData.image_url.startsWith('http') ? formData.image_url : `${BASE_URL}${formData.image_url}`} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px] text-gray-600 uppercase font-mono">No Image</span>
              )}
            </div>
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className={`inline-flex px-4 py-2 bg-surface-800 border border-matrix-400/20 rounded-lg text-xs font-mono text-matrix-400 cursor-pointer hover:bg-surface-700 transition-colors ${uploading ? 'opacity-50 cursor-wait' : ''}`}
              >
                {uploading ? 'UPLOADING...' : formData.image_url ? 'CHANGE IMAGE' : 'SELECT IMAGE'}
              </label>
              {formData.image_url && (
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                  className="ml-4 text-[10px] text-red-400 hover:text-red-300 font-mono uppercase"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Content (Markdown)</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={15}
            className="w-full bg-surface-900 border border-matrix-400/[0.1] rounded-lg px-4 py-2 text-white focus:border-matrix-400 focus:outline-none font-mono text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Meta Title</label>
            <input
              type="text"
              name="meta_title"
              value={formData.meta_title}
              onChange={handleChange}
              className="w-full bg-surface-900 border border-matrix-400/[0.1] rounded-lg px-4 py-2 text-white focus:border-matrix-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Meta Description</label>
            <input
              type="text"
              name="meta_description"
              value={formData.meta_description}
              onChange={handleChange}
              className="w-full bg-surface-900 border border-matrix-400/[0.1] rounded-lg px-4 py-2 text-white focus:border-matrix-400 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 px-6 py-3 bg-matrix-400/10 text-matrix-400 border border-matrix-400/20 rounded-lg hover:bg-matrix-400/20 transition-colors font-medium self-end"
        >
          {id ? 'Update Article' : 'Publish Article'}
        </button>
      </form>
    </div>
  );
}
