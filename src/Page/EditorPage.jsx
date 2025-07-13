import { useGSAP } from '@gsap/react';
import React, { useState, useRef } from 'react'
import 'remixicon/fonts/remixicon.css';
import gsap from "gsap"
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { UpdateUser } from '../Store/Action/UserAction';
const EditorPage = () => {

    const dispatch=useDispatch()
    let { id } = useParams()
    const [user, setuser] = useState(JSON.parse(localStorage.getItem("User")))
    const [fData, setfData] = useState(user.folder.find((data)=>data.id==id))
    const [isBold, setisBold] = useState(false)
    const [italic, setitalic] = useState(false)
    const [underline, setunderline] = useState(false)
    const [st, setst] = useState(false)
    const [fontSize, setFontSize] = useState(4)
    const [fontColor, setFontColor] = useState('#000000')
    const [highlightColor, setHighlightColor] = useState('#ffff00')
    const editorRef = useRef(null);
    const [tittle, settittle] = useState(fData.tittle)
    const [content, setContent] = useState(fData.description);
    const [URL, setURL] = useState(fData.URL)

    React.useEffect(() => {
        if (editorRef.current && content) {
            editorRef.current.innerHTML = content;
        }
    }, []);
    const submitHandler=async(e)=>{
    e.preventDefault();
    // Get the latest user data
    const userData = JSON.parse(localStorage.getItem("User"));
    // Find the folder index by id
    const folderIndex = userData.folder.findIndex((data) => data.id == id);
    console.log(folderIndex)
    if (folderIndex !== -1) {
        // Update the folder's properties
        userData.folder[folderIndex] = {
        ...userData.folder[folderIndex],
        tittle,
        description: content,
        URL,
        };
        // Save to localStorage
        const res=dispatch(UpdateUser(userData.id,userData))
        localStorage.setItem("User", JSON.stringify(userData));
        setuser(userData);
        if(res){
        toast.success("data updated!");
        }
         else {
        toast.error("data not Updated!");
    }
        // Optionally, dispatch to update backend
        // await dispatch(UpdateUser(userData.id, userData));
    } else {
        toast.error("Folder not found!");
    }
    }

    const formateDoc = (cmd, value = null) => {
        if (!editorRef.current) return;
        editorRef.current.focus();
        if (value !== null) {
            document.execCommand(cmd, false, value)
        } else {
            document.execCommand(cmd)
        }
    }

    // Paste handler using Clipboard API
    const handlePaste = async () => {
        if (!editorRef.current) return;
        editorRef.current.focus();
        try {
            const text = await navigator.clipboard.readText();
            document.execCommand("insertText", false, text);
        } catch (err) {
            alert("Clipboard access denied or not supported.");
        }
    }

    useGSAP(() => {
        const t1 = gsap.timeline()
        t1.to(".main", {
            opacity: 1
        })
    })

    return (
        <div className="main  opacity-0 w-full bg-gray-300 ">
            <div className="bg-zinc-900 text-white p-4">
                {/* Ribbon Content */}
                <div className="flex flex-wrap items-start gap-4 text-xs ">
                    {/* Clipboard */}
                    <button onClick={handlePaste} className="flex flex-col cursor-pointer items-center p-3 bg-zinc-800 rounded-lg w-28">
                        <i className="ri-clipboard-fill text-3xl text-orange-400 mb-1" />
                        <span className='text-[1.3em]'>Paste</span>
                    </button>

                    {/* Font Section */}
                    <div className="flex flex-col gap-3 p-3 bg-zinc-800 rounded-lg w-86">
                        <div className="flex items-center gap-2">
                            <select
                                className="bg-zinc-700 text-white p-1 rounded text-sm w-46"
                                onChange={e => formateDoc("fontName", e.target.value)}
                            >
                                <option value="Trebuchet MS">Trebuchet MS</option>
                                <option value="Arial">Arial</option>
                                <option value="Calibri">Calibri</option>
                            </select>
                            <input
                                type="number"
                                min={1}
                                max={7}
                                value={fontSize}
                                onChange={e => {
                                    setFontSize(e.target.value)
                                    formateDoc("fontSize", e.target.value)
                                }}
                                className="w-16 bg-zinc-700 text-white text-center rounded p-1"
                            />
                            <button className="italicIcon px-2 py-1 rounded bg-zinc-700 flex items-center justify-center cursor-pointer hover:bg-zinc-600 transition duration-200">
                                <i onClick={() => { document.querySelector(".col").click() }} className="ri-mark-pen-line text-sm px-2"></i>
                                <input
                                    type="color"
                                    value={highlightColor}
                                    onChange={e => {
                                        setHighlightColor(e.target.value)
                                        formateDoc("hiliteColor", e.target.value)
                                    }}
                                    title="Highlight"
                                    className="col w-6 hidden h-6 p-0 border-0 bg-transparent cursor-pointer"
                                    style={{ margin: '0 4px' }}
                                />
                            </button>
                        </div>
                        <div className="flex gap-1 flex-wrap text-white text-sm">
                            <button onClick={() => {
                                formateDoc("bold")
                                setisBold(!isBold)
                            }} className={`boldIcon px-2 py-1 rounded flex items-center justify-center cursor-pointer transition duration-200 ${!isBold ? "bg-zinc-700 hover:bg-zinc-600" : "bg-blue-700 hover:bg-blue-600"}`}>
                                <i className="ri-bold text-lg" title="Bold" />
                            </button>
                            <button onClick={() => {
                                setitalic(!italic)
                                formateDoc("italic")
                            }} className={`boldIcon px-2 py-1 rounded flex items-center justify-center cursor-pointer transition duration-200 ${!italic ? "bg-zinc-700 hover:bg-zinc-600" : "bg-blue-700 hover:bg-blue-600"}`}>
                                <i className="ri-italic text-lg" title="Italic" />
                            </button>
                            <button onClick={() => {
                                setunderline(!underline)
                                formateDoc("underline")
                            }} className={`boldIcon px-2 py-1 rounded flex items-center justify-center cursor-pointer transition duration-200 ${!underline ? "bg-zinc-700 hover:bg-zinc-600" : "bg-blue-700 hover:bg-blue-600"}`}>
                                <i className="ri-underline text-lg" title="Underline" />
                            </button>
                            <button onClick={() => {
                                setst(!st)
                                formateDoc("strikeThrough")
                            }} className={`boldIcon px-2 py-1 rounded flex items-center justify-center cursor-pointer transition duration-200 ${!st ? "bg-zinc-700 hover:bg-zinc-600" : "bg-blue-700 hover:bg-blue-600"}`}>
                                <i className="ri-strikethrough text-lg" title="Strikethrough" />
                            </button>
                            <button
                                onClick={() => formateDoc("superscript")}
                                className="italicIcon px-2 py-1 rounded bg-zinc-700 flex items-center justify-center cursor-pointer hover:bg-zinc-600 transition duration-200"
                            >
                                <i className="ri-superscript text-lg" title="Superscript" />
                            </button>
                            <button
                                onClick={() => formateDoc("subscript")}
                                className="italicIcon px-2 py-1 rounded bg-zinc-700 flex items-center justify-center cursor-pointer hover:bg-zinc-600 transition duration-200"
                            >
                                <i className="ri-subscript text-lg" title="Subscript" />
                            </button>
                            <button
                                onClick={() => formateDoc("fontSize", fontSize)}
                                className="italicIcon px-2 py-1 rounded bg-zinc-700 flex items-center justify-center cursor-pointer hover:bg-zinc-600 transition duration-200"
                            >
                                <i className="ri-font-size-2 text-lg" title="Font Size" />
                            </button>
                            <button className="italicIcon px-2 py-1 rounded bg-zinc-700 flex items-center justify-center cursor-pointer hover:bg-zinc-600 transition duration-200"
                            >
                                <i onClick={() => { document.querySelector(".fonts").click() }} class="ri-font-color text-lg"></i>
                                <input
                                    type="color"
                                    value={fontColor}
                                    onChange={e => {
                                        setFontColor(e.target.value)
                                        formateDoc("foreColor", e.target.value)
                                    }}
                                    title="Font Color"
                                    className="fonts hidden w-6 h-6 hidden rounded-full bg-transparent cursor-pointer"
                                    style={{ margin: '0 4px' }}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Paragraph Section */}
                    <div className="flex flex-col p-3 bg-zinc-800 rounded-lg w-1/9 gap-2">
                        <div className="flex justify-start gap-3">
                            <button
                                onClick={() => formateDoc("justifyLeft")}
                                className="italicIcon px-2 py-1 rounded bg-zinc-700 flex items-center justify-center cursor-pointer hover:bg-zinc-600 transition duration-200">
                                <i className="ri-align-left text-xl" title="Align Left" />
                            </button>
                            <button
                                onClick={() => formateDoc("justifyCenter")}
                                className="italicIcon px-2 py-1 rounded bg-zinc-700 flex items-center justify-center cursor-pointer hover:bg-zinc-600 transition duration-200">
                                <i className="ri-align-center text-xl" title="Align Center" />
                            </button>
                            <button
                                onClick={() => formateDoc("justifyRight")}
                                className="italicIcon px-2 py-1 rounded bg-zinc-700 flex items-center justify-center cursor-pointer hover:bg-zinc-600 transition duration-200">
                                <i className="ri-align-right text-xl" title="Align Right" />
                            </button>
                            <button
                                onClick={() => formateDoc("justifyFull")}
                                className="italicIcon px-2 py-1 rounded bg-zinc-700 flex items-center justify-center cursor-pointer hover:bg-zinc-600 transition duration-200">
                                <i className="ri-align-justify text-xl" title="Justify" />
                            </button>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onMouseDown={e => { e.preventDefault(); formateDoc("insertUnorderedList"); }}
                                className="italicIcon px-2 py-1 rounded bg-zinc-700 flex items-center justify-center cursor-pointer hover:bg-zinc-600 transition duration-200">
                                <i className="ri-list-unordered text-xl" />
                            </button>
                            <button
                                onMouseDown={e => { e.preventDefault(); formateDoc("insertOrderedList"); }}
                                className="italicIcon px-2 py-1 rounded bg-zinc-700 flex items-center justify-center cursor-pointer hover:bg-zinc-600 transition duration-200">
                                <i className="ri-list-ordered text-xl" />
                            </button>
                            <button
                                onClick={() => formateDoc("outdent")}
                                className="italicIcon px-2 py-1 rounded bg-zinc-700 flex items-center justify-center cursor-pointer hover:bg-zinc-600 transition duration-200">
                                <i className="ri-indent-decrease text-xl" title="Decrease Indent" />
                            </button>
                            <button
                                onClick={() => formateDoc("indent")}
                                className="italicIcon px-2 py-1 rounded bg-zinc-700 flex items-center justify-center cursor-pointer hover:bg-zinc-600 transition duration-200">
                                <i className="ri-indent-increase text-xl" title="Increase Indent" />
                            </button>
                        </div>
                    </div>

                    {/* Styles */}
                    <div className="flex space-x-3 bg-zinc-800 rounded-lg p-3">
                        {[
                            { label: "Heading1", block: "H1" },
                            { label: "Heading2", block: "H2" },
                            { label: "Heading3", block: "H3" },
                            { label: "No Spacing", block: "PRE" }
                        ].map((style) => (
                            <button
                                key={style.label}
                                onMouseDown={e => {
                                    e.preventDefault();
                                    formateDoc("formatBlock", style.block);
                                }}
                                className="bg-white text-xl font-semibold text-black cursor-pointer px-4 py-4 rounded shadow"
                            >
                                {style.label}
                            </button>
                        ))}
                    </div>

                    {/* Editing & Add-ins */}
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col bg-zinc-800 p-2 rounded-lg text-white text-xs gap-2">
                            <button
                                onClick={() => formateDoc("undo")}
                                className="flex items-center  gap-2 cursor-pointer">
                                <i class="ri-arrow-go-back-line text-lg"></i> <span className='text-[1.2em]'>Undo</span>
                            </button>
                            <div
                                onClick={() => formateDoc("redo")}
                                className="flex items-center gap-2 cursor-pointer">
                                <i class="ri-arrow-go-forward-line text-lg"></i><span className='text-[1.2em]'>Redo</span>
                            </div>
                        </div>

                        {/* Add-ins */}
                        <div className="flex flex-col items-center bg-zinc-800 p-3 rounded-lg">
                            <i className="ri-puzzle-fill text-4xl text-orange-500 mb-1" />
                            <span className='text-[1.3em] '>Add-ins</span>
                        </div>

                        {/* Ghostwriter */}
                        <div onClick={(e)=>{
                            submitHandler(e)
                        }} className="flex flex-col items-center bg-zinc-800 p-3 rounded-lg cursor-pointer">
                            <i className="ri-save-3-line text-4xl"></i>
                            <span className='text-[1.3em]'>Save Data</span>
                        </div>

                    </div>
                </div>
            </div>
            <section className='w-full h-[90vh] flex items-center justify-center gap-30  relative '>
                <div className="part2 w-[85vw] h-full bg-white rounded-md " >
                    <div className="image w-full h-40 rounded-md relative ">
                        <div className='flex items-center gap-2 absolute bottom-1 right-4'>
                            <button
                                className='bg-green-600 text-white px-3 py-2 text-xm font-bold rounded-md cursor-pointer'
                                name='file'
                                onClick={() => document.getElementById('themeFileInput').click()}
                            >
                                Update Theme
                            </button>
                            <input
                                className='hidden'
                                type="file"
                                name="file"
                                id="themeFileInput"
                                accept="image/*"
                                onChange={e => {
                                    // Example: set background image of .image div
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        console.log(reader)
                                        reader.onload = ev => {
                                            const imgDiv = document.querySelector('.image');
                                                setURL(ev.target.result)
                                            if (imgDiv) {
                                                imgDiv.style.backgroundImage = `url('${ev.target.result}')`;
                                                imgDiv.style.backgroundSize = 'cover';
                                                imgDiv.style.backgroundPosition = 'center';
                                            }
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </div>
                        <img className='w-full h-full object-cover' src={URL} alt="" />
                    </div>
                    <input value={tittle} onChange={(e)=>{settittle(e.target.value)}} className='p-1 text-2xl font-bold outline-none placeholder:text-black mx-2' type="text" name="fileName" id="" />
                    <div
                        ref={editorRef}
                        className='w-full  min-h-[70vh] overflow-y-hidden outline-none overflow-x-hidden p-2 text-black text-[1.2em] font-Roboto '
                        contentEditable="true"
                        spellCheck="false"
                        onInput={e => setContent(e.currentTarget.innerHTML)}
                        suppressContentEditableWarning={true}
                    >
                        
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EditorPage