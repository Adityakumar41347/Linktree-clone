"use client"
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
const Generated = () => {
    const router = useRouter()
    const searchparams = useSearchParams()
    const notify = () => toast("Wow so easy!");
    // const [link, setlink] = useState("")
    // const [linktext, setlinktext] = useState("")
    const [links, setlinks] = useState([{ link: "", linktext: "" }])
    const [handle, sethandle] = useState("")
    const [pic, setpic] = useState("")
    useEffect(() => {
        const query = searchparams.get("handle")
        if (query) {
            
            sethandle(query)
        }
    }, [searchparams])


    console.log(handle)
    const submitprofile = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "links": links,
            "handle": handle,
            "pic": pic
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const r = await fetch("http://localhost:3000/api/add", requestOptions)
        const result = await r.json()
        if (result.success) {
            
            const targetUrl = `${process.env.NEXT_PUBLIC_HOST}/${handle}`
            console.log("Redirecting to:", targetUrl)
            router.push(targetUrl)
               toast.success(result.message)
            sethandle("")
            setlinks([])
            setpic("")

        }
        else {
            toast.error(result.message)
            sethandle("")
        }



    }
    const setlink = (index, link, linktext) => {
        setlinks((initiallinks) => {
            return initiallinks.map((item, i) => {
                if (i == index) {
                    return { link, linktext }
                }
                else {
                    return item
                }
            })
        })
    }
    const addlink = () => {
        setlinks(links.concat([{ "link": "", "linktext": "" }]))
    }

    return (

        <>
            <ToastContainer />
            <div className='bg-[#e9c0e9] min-h-screen grid grid-cols-2 '>

                <div className="col1 w-full flex flex-col mx-14 justify-center items-center ">
                    <div className=' flex flex-col w-full'>
                        <h1 className='text-2xl font-bold'>Create your Bitree</h1>
                        <h2 className='text-xl m-4 font-semibold'>Step1:Claim Your Handel</h2>
                        <input onChange={e => { sethandle(e.target.value) }} value={handle} className='bg-white p-4  mx-9 rounded-3xl  w-[85%] ' type="text" placeholder='Enter your Handel' />
                        <h2 className='text-xl m-4 font-semibold'>Step2:Provide the link</h2>
                        {links && links.map((item, index) => {
                            return (<div key={index} className='flex w-[85%] my-3 mx-9 gap-1'>
                                <input onChange={e => { setlink(index, item.link, e.target.value) }} value={item.linktext} className='bg-white p-4 rounded-3xl outline-pink-500  w-[47%] ' type="text" placeholder='Enter your Link Name' />
                                <input onChange={e => { setlink(index, e.target.value, item.linktext) }} value={item.link} className='bg-white p-4 rounded-3xl  w-[47%] ' type="text" placeholder='Enter your Link' />

                            </div>
                            
                            )
                        })}
                        <button onClick={() => addlink()} className='bg-black text-white m-2 p-3 mx-9 rounded-4xl w-[20%]'>Add Link</button>

                        <h2 className='text-xl m-4 font-semibold'>Step2:Add the Picture</h2>
                        <input onChange={e => { setpic(e.target.value) }} value={pic} className='bg-white p-4  mx-9 rounded-3xl  w-[85%] ' type="text" placeholder='Enter your Handel' />
                        <button onClick={submitprofile} disabled={pic == "" || handle == "" || links[0].linktext == "" || links[0].link == ""} className='bg-black disabled:bg-slate-500 p-4 m-2 rounded-3xl mx-9  w-[20%] text-white'>Create a bitlik</button>
                    </div>
                </div>
                <div className="col2 h-screen w-full">
                    <img className='w-full h-screen object-contain' src="/generate.png" alt="image not found " />
                </div>
            </div></>
    )
}

export default Generated
