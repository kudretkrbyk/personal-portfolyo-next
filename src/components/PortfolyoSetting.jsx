import { useState } from "react";
import {
  useGetProjectsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "../services/projectApi";

const API_URL = import.meta.env.VITE_IMG_URL;

export default function PortfolyoSetting() {
  const { data: projects = [], isLoading, isError } = useGetProjectsQuery();
  const [addProject] = useAddProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    description: "",
    image: null,
    liveview: "",
    github: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const resetForm = () => {
    setFormData({
      title: "",
      tag: "",
      description: "",
      image: null,
      liveview: "",
      github: "",
    });
    setEditMode(false);
    setEditId(null);
    setMessage("");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("tag", formData.tag);
    form.append("description", formData.description);
    form.append("image", formData.image);
    form.append("liveview", formData.liveview);
    form.append("github", formData.github);

    try {
      if (editMode) {
        await updateProject({ id: editId, formData }).unwrap();
      } else {
        await addProject(form).unwrap();
      }
      resetForm();
    } catch (err) {
      setMessage("İşlem başarısız: " + (err?.data?.message || err.message));
    }
  };

  const handleEdit = (project) => {
    setEditMode(true);
    setEditId(project.id);
    setFormData({
      title: project.title,
      tag: project.tag,
      description: project.description,
      image: null,
      liveview: project.liveview,
      github: project.github,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu projeyi silmek istediğinize emin misiniz?")) {
      try {
        await deleteProject(id).unwrap();
      } catch (err) {
        setMessage("Silme başarısız: " + (err?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10  ">
      <h2 className="text-3xl font-bold text-center mb-8">
        Admin Panel: Projeler
      </h2>

      <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg mb-10">
        <h3 className="text-2xl font-bold mb-6">
          {editMode ? "Projeyi Güncelle" : "Yeni Proje Ekle"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Proje Başlığı"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            name="tag"
            placeholder="Kategori (tag)"
            value={formData.tag}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-gray-700 text-white"
          />
          <textarea
            name="description"
            placeholder="Proje Açıklaması"
            value={formData.description}
            onChange={handleChange}
            rows="4"
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
          <input
            type="text"
            name="liveview"
            placeholder="Live Site Linki"
            value={formData.liveview}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            name="github"
            placeholder="GitHub Linki"
            value={formData.github}
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
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-800 p-6 rounded-lg relative hover:bg-gray-700 transition"
          >
            <img
              crossOrigin="anonymous"
              loading="lazy"
              src={`${API_URL}${project.image}`}
              alt={project.title}
              className="w-full object-cover rounded-lg mb-4"
            />
            <h4 className="text-xl font-bold">{project.title}</h4>
            <p className="text-gray-400">{project.tag}</p>
            <p className="text-gray-300 mt-2">{project.description}</p>
            <div className="flex gap-4 mt-4">
              <button
                aria-label="Düzenleme Butonu"
                onClick={() => handleEdit(project)}
                className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-black font-bold"
              >
                Düzenle
              </button>
              <button
                aria-label="Silme Butonu"
                onClick={() => handleDelete(project.id)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-bold"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
