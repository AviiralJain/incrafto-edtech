"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  Search,
  Video,
  FileText,
  Presentation,
  Download,
  Eye,
  FolderOpen,
} from "lucide-react";
import { ThemeToggle } from '@/components/layout/theme-toggle'

export default function StudentContentPage() {

  const [resources, setResources] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/content"
      );

      setResources(Array.isArray(res.data) ? res.data : []);

    } catch (err) {
      console.log(err);
      setResources([]);
    }

  };

  const filteredResources = resources.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-8">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Hero */}

      <div className="rounded-[36px] bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 p-10 text-white">

        <h1 className="text-5xl font-black">

          Learning Resources

        </h1>

        <p className="text-cyan-100 text-xl mt-3">

          Watch lectures, read notes and download study material.

        </p>

      </div>

      {/* Search */}

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl mt-8 p-6">

        <div className="flex items-center gap-4">

          <Search />

          <input

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

            placeholder="Search resources..."

            className="w-full outline-none bg-transparent text-slate-900 dark:text-white"

          />

        </div>

      </div>

      {/* Resources */}

      <div className="grid lg:grid-cols-2 gap-8 mt-8">

        {filteredResources.map((item)=>(

          <div

            key={item._id}

            className="bg-white dark:bg-slate-900 rounded-[30px] shadow-xl p-8"

          >

            <div className="flex justify-between items-start">

              <div>

                <div className="flex items-center gap-3">

                  {item.type==="Video" &&

                    <Video className="text-blue-600"/>

                  }

                  {item.type==="PDF" &&

                    <FileText className="text-red-600"/>

                  }

                  {item.type==="PPT" &&

                    <Presentation className="text-orange-600"/>

                  }

                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

                    {item.title}

                  </h2>

                </div>

                <p className="text-gray-500 dark:text-gray-400 mt-3">

                  {item.description}

                </p>

                <div className="flex gap-6 mt-5 text-gray-500 dark:text-gray-400">

                  <span>{item.week}</span>

                  <span>

                    {(item.fileSize/1024/1024).toFixed(1)} MB

                  </span>

                </div>

              </div>

            </div>

            <div className="flex gap-4 mt-8">

              <button

                onClick={()=>{

                  window.open(

                    `http://localhost:5000/${item.filePath.replace(/\\/g,"/")}`,

                    "_blank"

                  )

                }}

                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white flex justify-center items-center gap-2"

              >

                <Eye size={18}/>

                View

              </button>

              <a

                href={`http://localhost:5000/${item.filePath.replace(/\\/g,"/")}`}

                download

                className="flex-1 py-3 rounded-2xl border dark:border-slate-700 flex justify-center items-center gap-2 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition"

              >

                <Download size={18}/>

                Download

              </a>

            </div>

          </div>

        ))}

        {filteredResources.length===0 &&(

          <div className="col-span-2 bg-white dark:bg-slate-900 rounded-[30px] p-20 shadow-xl text-center">

            <FolderOpen

              size={70}

              className="mx-auto text-gray-300"

            />

            <h2 className="text-3xl font-bold mt-6 text-slate-900 dark:text-white">

              No Resources Available

            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-3">

              Your teacher hasn't uploaded any learning material yet.

            </p>

          </div>

        )}

      </div>

    </div>

  );

}