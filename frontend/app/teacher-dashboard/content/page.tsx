"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FolderOpen,
  Upload,
  Video,
  FileText,
  Presentation,
  Search,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

export default function ContentLibraryPage() {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [resources, setResources] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Video");
  const [week, setWeek] = useState("Week 1");
  const [search, setSearch] = useState("");
  const [previewResource, setPreviewResource] = useState<any>(null);

  const loadResources = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/content");
      setResources(res.data);
    } catch (error) {
      console.error("Error loading resources:", error);
    }
  };

  const totalVideos = resources.filter((item) => item.type === "Video").length;
  const totalNotes = resources.filter((item) => item.type === "PDF").length;
  const totalPPT = resources.filter((item) => item.type === "PPT").length;
  const totalResources = resources.length;
  
  const totalStorage = (
    resources.reduce((sum: number, item: any) => sum + Number(item.fileSize || 0), 0) /
    (1024 * 1024 * 1024)
  ).toFixed(2);

  useEffect(() => {
    loadResources();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 p-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-[36px] bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 p-10 text-white mb-8"
      >
        <h1 className="text-5xl font-black">Content Library</h1>
        <p className="text-xl text-cyan-100 mt-4">
          Manage videos, notes and presentations for all your classes.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          <div>
            <p className="text-white/80 text-lg">Subjects</p>
            <h2 className="text-5xl font-bold mt-2">5</h2>
          </div>
          <div>
            <p className="text-white/80 text-lg">Total Lectures</p>
            <h2 className="text-5xl font-bold mt-2">{totalVideos}</h2>
          </div>
          <div>
            <p className="text-white/80 text-lg">Total Notes</p>
            <h2 className="text-5xl font-bold mt-2">{totalNotes + totalPPT}</h2>
          </div>
          <div>
            <p className="text-white/80 text-lg">Storage Used</p>
            <h2 className="text-5xl font-bold mt-2">{totalStorage} GB</h2>
          </div>
        </div>
      </motion.div>

      {/* Top Controls */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <button
          onClick={() => setShowUpload(true)}
          className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl py-4 font-semibold flex justify-center items-center gap-2"
        >
          <Upload size={20} />
          Upload Resource
        </button>

        <div className="bg-white rounded-2xl shadow-lg flex items-center px-5">
          <Search size={20} className="text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources..."
            className="w-full p-4 outline-none"
          />
        </div>

        <select className="bg-white rounded-2xl shadow-lg px-5">
          <option>All Resources</option>
          <option>Videos</option>
          <option>Notes</option>
          <option>PPT</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Videos", value: totalVideos, icon: Video },
          { title: "Notes", value: totalNotes, icon: FileText },
          { title: "Presentations", value: totalPPT, icon: Presentation },
          { title: "Total Files", value: totalResources, icon: FolderOpen },
        ].map((item) => (
          <div key={item.title} className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
            <item.icon size={30} />
            <h3 className="mt-4 text-gray-500">{item.title}</h3>
            <p className="text-4xl font-black">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Uploaded Resources */}
      <div className="bg-white/70 backdrop-blur-xl rounded-[32px] shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-8">Uploaded Resources</h2>
        <div className="space-y-5">
          {resources.length === 0 && (
            <div className="bg-white rounded-3xl p-16 text-center border">
              <h2 className="text-3xl font-bold">No Resources Found</h2>
              <p className="text-gray-500 mt-3">Upload your first lecture, notes or PPT.</p>
            </div>
          )}

          {resources
            .filter((item) => item.title?.toLowerCase().includes(search.toLowerCase()))
            .map((item, index) => (
              <motion.div
                key={item._id || item.id || index}
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-3xl p-6 border flex justify-between items-center"
              >
                <div>
                  <div className="flex items-center gap-3">
                    {item.type === "Video" && <Video className="text-blue-600" size={24} />}
                    {item.type === "PDF" && <FileText className="text-red-600" size={24} />}
                    {item.type === "PPT" && <Presentation className="text-orange-600" size={24} />}
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                  </div>
                  <div className="flex gap-6 mt-3 text-gray-500">
                    <span>{item.type}</span>
                    <span>{item.week}</span>
                    <span>{item.size || "N/A"}</span>
                    <span>{item.uploaded || "Recently"}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      if (!item.filePath) {
                        alert("No file found.");
                        return;
                      }
                      const fileURL = `http://localhost:5000/${item.filePath.replace(/\\/g, "/")}`;
                      window.open(fileURL, "_blank");
                    }}
                    className="bg-cyan-100 p-3 rounded-xl hover:bg-cyan-200 transition"
                  >
                    <Eye size={18} />
                  </button>

                  <button className="bg-blue-100 p-3 rounded-xl">
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={async () => {
                      const confirmDelete = confirm("Delete this resource?");
                      if (!confirmDelete) return;
                      try {
                        await axios.delete(`http://localhost:5000/api/content/${item._id || item.id}`);
                        await loadResources();
                        alert("Deleted Successfully ✅");
                      } catch (error) {
                        console.error(error);
                        alert("Delete Failed");
                      }
                    }}
                    className="bg-red-100 p-3 rounded-xl hover:bg-red-200 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[650px] max-h-[90vh] overflow-y-auto rounded-[30px] p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Upload Learning Resource</h2>
              <button onClick={() => setShowUpload(false)} className="text-3xl">×</button>
            </div>

            <div className="space-y-5">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Resource Title"
                className="w-full border rounded-2xl p-4"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Description"
                className="w-full border rounded-2xl p-4"
              />

              <select className="w-full border rounded-2xl p-4">
                <option>Select Class</option>
                <option>Full Stack Development</option>
                <option>Data Analytics</option>
                <option>Python Programming</option>
              </select>

              <select
                value={week}
                onChange={(e) => setWeek(e.target.value)}
                className="w-full border rounded-2xl p-4"
              >
                <option>Select Week</option>
                <option>Week 1</option>
                <option>Week 2</option>
                <option>Week 3</option>
                <option>Week 4</option>
              </select>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border rounded-2xl p-4"
              >
                <option>Video</option>
                <option>PDF</option>
                <option>PPT</option>
              </select>

              <div>
                <input
                  id="fileUpload"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.length) {
                      setSelectedFile(e.target.files[0].name);
                    }
                  }}
                />
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer w-full border-2 border-dashed border-cyan-300 rounded-2xl p-8 flex flex-col items-center justify-center hover:bg-cyan-50 transition"
                >
                  <Upload size={35} className="text-cyan-600 mb-3" />
                  <p className="font-semibold">Click to Choose File</p>
                  <p className="text-sm text-gray-500 mt-2">MP4 • PDF • PPT • DOCX</p>
                </label>

                {selectedFile && (
                  <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3">
                    <p className="text-green-700 font-medium">Selected File</p>
                    <p className="text-gray-700">{selectedFile}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button onClick={() => setShowUpload(false)} className="px-6 py-3 rounded-xl border">
                  Cancel
                </button>
                <button
                  disabled={uploading}
                  onClick={async () => {
                    if (!title || !selectedFile) {
                      alert("Please fill all required fields.");
                      return;
                    }

                    const fileInput = document.getElementById("fileUpload") as HTMLInputElement | null;
                    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
                      alert("Choose a file.");
                      return;
                    }

                    const file = fileInput.files[0];
                    const formData = new FormData();
                    formData.append("title", title);
                    formData.append("description", description);
                    formData.append("type", type);
                    formData.append("week", week);
                    formData.append("className", "Full Stack Development");
                    formData.append("file", file);

                    try {
                      setUploading(true);
                      // 🌟 FIXED: Target port changed from 5001 to 5000
                      await axios.post("http://localhost:5000/api/content/upload", formData);
                      
                      await loadResources();
                      setUploading(false);
                      setShowUpload(false);
                      setTitle("");
                      setDescription("");
                      setSelectedFile("");
                      alert("Uploaded Successfully ✅");
                    } catch (err) {
                      console.error(err);
                      alert("Upload Failed");
                      setUploading(false);
                    }
                  }}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                >
                  {uploading ? "Uploading..." : "Upload Resource"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}