"use client"
import { useState, useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import { notFound } from "next/navigation"

export default function Page({ params }) {
  const [item, setItem] = useState(null)
  const handle = params.handle
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getdata?handle=${handle}`)
        const result = await res.json()

        if (!result.success || !result.data) {
          toast.error("Handle not found")
          return
        }

        setItem(result.data)
        toast("Copy the link and share your profile!")
      } catch (err) {
        toast.error("Something went wrong")
      }
    }

    fetchData()
  }, [handle])
  const editcard=()=>{

  }
  if (!item) return null // or a loading spinner
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 justify-center items-start py-16 px-4 animate-fade-in">
  <ToastContainer />
  <div className="photo flex justify-center flex-col items-center gap-6 bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-full max-w-xl animate-slide-up">
    <img
      className="rounded-full w-40 h-40 object-cover border-4 border-white shadow-lg transition-transform duration-300 hover:scale-105 hover:rotate-1"
      src={item.pic}
      alt={`${item.handle}'s profile`}
    />
    <span className="font-extrabold text-3xl text-white tracking-wide animate-fade-in-delay">@{item.handle}</span>
    <span className="desc text-center text-white/90 text-base italic animate-fade-in-delay-2">{item.desc}</span>
    <div className="links w-full mt-4 space-y-4">
      {item.links.map((linkItem, index) => (
        <a key={linkItem.link || index} href={linkItem.link} target="_blank" rel="noopener noreferrer">
          <div className="bg-white/20 hover:bg-white/30 transition-all m-3 duration-300 py-4 px-4 w-full text-white font-medium shadow-md rounded-xl text-center backdrop-blur-sm transform hover:scale-105 hover:shadow-xl animate-pop-in">
            {linkItem.linktext}
          </div>
        </a>
      ))}
    </div>
  </div>
</div>
  )
}