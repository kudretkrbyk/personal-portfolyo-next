import { useState } from "react";
import {
  useGetAllForAdminQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from "../services/blogApi";

const API_URL = import.meta.env.VITE_IMG_URL;

export default function BlogSetting() {
  const { data: blogs = [], isLoading } = useGetAllForAdminQuery();
  const [addBlog] = useAddBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    image: null,
    imageUrl: "", // 👈 eski görsel için
    approved: true,
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      content: "",
      image: null,
      approved: false,
    });
    setEditMode(false);
    setEditId(null);
    setMessage("");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("slug", formData.slug);
    form.append("content", formData.content);
    form.append("approved", formData.approved);

    if (formData.image) {
      form.append("image", formData.image); // Yeni görsel varsa
    } else if (formData.imageUrl) {
      form.append("imageUrl", formData.imageUrl); // Eski görseli gönderiyoruz
    }

    try {
      if (editMode) {
        await updateBlog({ id: editId, formData: form }).unwrap();
      } else {
        await addBlog(form).unwrap();
      }
      resetForm();
    } catch (err) {
      setMessage("İşlem başarısız: " + (err?.data?.message || err.message));
    }
  };

  const handleEdit = (blog) => {
    setEditMode(true);
    setEditId(blog.id);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      imageUrl: blog.image,
      approved: true,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu blog yazısını silmek istiyor musunuz?")) {
      try {
        await deleteBlog(id).unwrap();
      } catch (err) {
        setMessage("Silme başarısız: " + (err?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h2 className="text-3xl font-bold text-center mb-8">Blog Yönetimi</h2>

      <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg mb-10">
        <h3 className="text-2xl font-bold mb-6">
          {editMode ? "Blog Güncelle" : "Yeni Blog Ekle"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Blog Başlığı"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            name="slug"
            placeholder="URL Slug (seo-uyumlu)"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-gray-700 text-white"
          />
          <textarea
            name="content"
            placeholder="Blog İçeriği"
            value={formData.content}
            onChange={handleChange}
            rows="6"
            required
            className="w-full p-3 rounded bg-gray-700 text-white"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white"
          />
          <button
            aria-label="güncelleme ve ekleme butonu"
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 w-full py-3 rounded text-white font-bold transition"
          >
            {isLoading ? "İşleniyor..." : editMode ? "Güncelle" : "Ekle"}
          </button>
        </form>
        {message && <p className="text-red-400 text-center mt-4">{message}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-gray-800 p-6 rounded-lg relative hover:bg-gray-700 transition"
          >
            <img
              loading="lazy"
              src={`${API_URL}${blog.image}`}
              alt={blog.title}
              crossOrigin="anonymous"
              className="w-full object-cover rounded-lg mb-4 h-48"
            />
            <h4 className="text-xl font-bold">{blog.title}</h4>
            <p className="text-gray-300 mt-2 line-clamp-3">{blog.content}</p>
            <div className="flex gap-4 mt-4">
              <button
                aria-label="düzenleme butonu"
                onClick={() => handleEdit(blog)}
                className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-black font-bold"
              >
                Düzenle
              </button>
              <button
                aria-label="Silme butonu"
                onClick={() => handleDelete(blog.id)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-bold"
              >
                Sil
              </button>
              {blog.approved === false && (
                <div className="bg-red-500 p-1 rounded">!Blog Taslak </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
