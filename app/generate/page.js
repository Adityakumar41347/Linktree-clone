import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
const Generated = () => {
    const notify = () => toast("Wow so easy!");
    const addlink = async (text, link, handler) => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "Link": link,
                "Linktext": text,
                "handler": handler
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            const r=await fetch("http://localhost:3000/api/add", requestOptions)
            const result=await r.json()
            toast(r.message)
                
        }
    return (
        

    <div className='bg-[#e9c0e9] min-h-screen grid grid-cols-2 '>
        <ToastContainer />
        <div className="col1 w-full flex flex-col mx-14 justify-center items-center ">

            <div className=' flex flex-col w-full'>
                <h1 className='text-2xl font-bold'>Create your Bitree</h1>
                <h2 className='text-xl m-4 font-semibold'>Step1:Claim Your Handel</h2>
                <input className='bg-white p-4  mx-9 rounded-3xl  w-[85%] ' type="text" placeholder='Enter your Handel' />
                <h2 className='text-xl m-4 font-semibold'>Step2:Provide the link</h2>
                <div className='flex w-[85%] mx-9 gap-1'>
                    <input className='bg-white p-4 rounded-3xl outline-pink-500  w-[47%] ' type="text" placeholder='Enter your Link Name' />
                    <input className='bg-white p-4 rounded-3xl  w-[47%] ' type="text" placeholder='Enter your Link' />
                    <button className='bg-pink-300 px-3 rounded-4xl w-[20%]'>Add Link</button>
                </div>
                <h2 className='text-xl m-4 font-semibold'>Step2:Add the Picture</h2>
                <input className='bg-white p-4  mx-9 rounded-3xl  w-[85%] ' type="text" placeholder='Enter your Handel' />
                <button className='bg-black p-3 m-2 rounded-3xl mx-9 w-fit text-white'>Create a bitlik</button>
            </div>
        </div>
        <div className="col2 h-screen w-full">
            <img className='w-full h-screen object-contain' src="/generate.png" alt="image not found " />
        </div>
    </div>
  )
}

export default Generated
