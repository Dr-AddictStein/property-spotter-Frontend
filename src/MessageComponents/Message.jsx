import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { FaPoll } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineVideoCall, MdOutlineWifiCalling } from "react-icons/md";
import InputEmoji from "react-input-emoji";
import * as timeago from 'timeago.js';


const Message = ({ currentUser, reciever, socket, onlineUsers }) => {

    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [hasMessages, setHasMessages] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const messagesEndRef = useRef(null);

    // State to track if there are messages
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(`https://api.propertyspotter.co.za/message/get-message/${reciever._id}/${currentUser?._id}`);
            setMessages(res.data);
            setHasMessages(res.data.length > 0);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }

    useEffect(() => {
        socket.current?.on('receive-message', (data) => {
            setMessages(prevMessages => [...prevMessages, data]);
        });
    }, [socket]);


    useEffect(() => {
        fetchData();
    }, [reciever])

    // Scroll to bottom function
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    const sendMessage = async (e) => {
        e.preventDefault();

        try {
            socket.current.emit('send-message', {
                senderId: currentUser._id,
                recieverId: reciever._id,
                text: {
                    message: newMessage,
                    image: '',
                },
                time: new Date(),
            })
            await axios.post('https://api.propertyspotter.co.za/message/send-message', {
                senderId: currentUser._id,
                recieverId: reciever._id,
                text: {
                    message: newMessage,
                    image: '',
                }
            });
            fetchData();
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }


    const handleEmojiSelect = (emoji) => {
        setInputMessage(inputMessage + emoji.native);
    }

    const handleSentImage = async (event) => {
        // const file = event.target.files[0];
        // const fileName = Date.now() + file.name.replace(/\s+/g, '');
        // const formData = new FormData();
        // formData.append('senderId', currentUser._id);
        // formData.append('recieverId', reciever._id);
        // formData.append('image', event.target.files[0]);
        // try {
        //     const res = await axios.post('http://localhost:5001/api/messages/message', formData);
        //     if (res.data?.text?.image) {
        //         // send data to the socket io
        //         socket.current.emit('send-message', {
        //             senderId: currentUser._id,
        //             recieverId: reciever._id,
        //             text: {
        //                 message: '',
        //                 image: fileName,
        //             },
        //             time: new Date(),
        //         })
        //     }
        // } catch (error) {
        //     console.error('Error sending image:', error);
        // }
    };


    return (
        <div className='p-4 flex flex-col h-[90vh]'>
            <div className='shadow-lg rounded-xl flex justify-between items-center'>
                <div className='p-2 text-xl relative font-medium flex justify-start items-center gap-2 rounded-lg'>
                    <img src={reciever?.photoURL} alt="" className='w-12 h-12 rounded-full' />
                    <div className='ml-2'>
                        <h1 className='text-white'>{reciever?.name}</h1>
                        {onlineUsers.some(user => user.userId === reciever._id) ? (
                            <div className="flex items-center">
                                <span className="absolute bottom-4 left-12 w-2 h-2 rounded-full bg-green-700 mr-2"></span>
                                <p className="text-sm text-green-700">Online</p>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <span className="absolute bottom-4 left-12 w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                                <p className="text-sm text-red-500">Offline</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex justify-center items-center gap-5 pr-10'>
                    <button className='cursor-pointer'>
                        <MdOutlineWifiCalling className='text-xl font-bold' />
                    </button>
                    <button className='cursor-pointer'>
                        <MdOutlineVideoCall className='text-2xl font-bold' />
                    </button>
                    <button className='cursor-pointer'>
                        <HiDotsVertical className='text-xl font-bold' />
                    </button>
                </div>
            </div>

            <div className='overflow-y-auto flex-grow px-5' style={{ scrollBehavior: 'smooth' }}>
                {/* Conditional rendering based on message availability */}
                {hasMessages ? (
                    <div className="flex flex-col space-y-2 py-5 overflow-y-scroll">
                        {messages.map((message, idx) => (
                            <div
                                key={idx}
                                className={`${message.senderId === currentUser._id
                                    ? "self-end"
                                    : "self-start"
                                    } p-4 rounded-lg max-w-xs ${message.text.message ? "bg-blue-500 text-white" : "bg-black"
                                    }`}
                            >
                                <p className="text-sm">{message?.text?.message}</p>
                                {message?.text?.image && (
                                    <img
                                        src={`../../../public/images/${message?.text?.image}`}
                                        alt=""
                                        className="h-40 w-32"
                                    />
                                )}
                                <p className="text-xs text-gray-600 text-end">
                                    {timeago.format(message.createdAt)}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-32">
                        <p className="text-gray-500">Tap to start conversation</p>
                    </div>
                )}
            </div>

            {/* for sending message */}
            <div className="flex items-center justify-between">
                <form onSubmit={sendMessage}
                    className='mx-10 w-full flex justify-between items-center'>
                    <div className='flex justify-center items-center gap-5'>
                        <button>
                            <IoIosAddCircle className='text-2xl' />
                        </button>
                        <button >
                            <FaPoll className='text-2xl' />
                        </button>
                        <div className="my-10 flex justify-center">
                            <label className="flex h-full w-max items-end gap-4 rounded-full bg-cyan-500 px-6 py-2 text-white active:ring-4 active:ring-cyan-200 cursor-pointer" htmlFor="file">
                                <svg width={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <g id="Complete">
                                            <g id="upload">
                                                <path d="M3,12.3v7a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2v-7" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                                <g>
                                                    <polyline data-name="Right" fill="none" id="Right-2" points="7.9 6.7 12 2.7 16.1 6.7" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline>
                                                    <line fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="16.3" y2="4.8"></line>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </label>
                            <input onChange={handleSentImage} className="hidden z-50" id="file" type="file" />
                        </div>
                    </div>
                    <div className="relative w-[90%]">
                        <div className='relative'>
                            <InputEmoji
                                value={newMessage}
                                onChange={setNewMessage}
                                cleanOnEnter
                                placeholder="Type a message"
                            />
                        </div>
                        {showEmojiPicker && (
                            <div className="absolute bottom-12 right-0 z-10">
                                <Picker onSelect={handleEmojiSelect} />
                            </div>
                        )}
                    </div>
                    <button
                        // onClick={sendMessage}
                        type='submit'
                        className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Message;
