import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { io } from 'socket.io-client'
import { AuthContext } from '../Provider/AuthProvider'
import Message from './Message'

const Chat = () => {

    const { user, logOut } = useContext(AuthContext);
    const [users, setUsers] = useState([])
    const [reciever, setReciever] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const socket = useRef()


    const getUsers = async () => {
        const res = await axios.get('https://api.propertyspotter.co.za/allusers');
        setUsers(res.data);
    }

    useEffect(() => {
        socket.current = io('ws://socket.propertyspotter.co.za');
    }, [])

    // socket e data pathabo
    useEffect(() => {
        if (user?._id) {
            socket.current.emit('addActiveUser', user?._id, user?.name);
        }
    }, []);

    // get active user
    useEffect(() => {
        socket.current.on('getActiveUser', (activeUsers) => {
            setOnlineUsers(activeUsers);
        });
    }, [])

    useEffect(() => {
        getUsers()
    }, [])

    const allUsers = users?.filter(u => u?._id !== user?._id)
    const admins = users?.filter(u => u?._id !== user?._id && u?.role === 'admin')
    const agency = users?.filter(u => u?._id !== user?._id && u?.role === 'agency')
    const agents = users?.filter(u => u?._id !== user?._id && u?.role === 'agent')
    const spotters = users?.filter(u => u?._id !== user?._id && u?.role === 'spotter')

    const agentOfAgency = users?.filter(u => u?._id !== user?._id && u?.role === 'agent' && u?.agencyName === user?.name);
    const agencyOfAgent = users?.filter(u => u?._id !== user?._id && u?.role === 'agency' && u?.name === user?.agencyName);



    return (
        <div className='bg-slate-900 max-h-screen'>
               <Helmet>
        <title>Chat</title>
      </Helmet>
            <div className='h-full overflow-y-scroll'>
                <div className="grid gap-2 grid-cols-7 lg:gap-1">
                    <div className="rounded-lg col-span-2 p-2">
                        <li className='p-2 mb-10 my-1 text-xl font-medium flex justify-start items-center gap-2 border border-black rounded-lg'>
                            <img src={user?.photoURL} alt="" className='w-12 h-12 rounded-full' />
                            <div className='text-white'>
                                <h1 className='text-base font-bold capitalize '>{user?.name}</h1>
                                <p className='text-xs'>My Self</p>
                            </div>
                        </li>
                        <div className='overflow-y-scroll h-[65vh] lg:h-[70vh]'>
                            <div>
                                <h1 className='text-2xl font-bold text-white'>Admins Here</h1>
                                {
                                    admins && admins.map((chat, idx) =>
                                        <li onClick={() => setReciever(chat)} key={idx} className='p-2 relative my-2 cursor-pointer hover:shadow-lg text-xl font-medium flex justify-start items-center gap-2 border border-black rounded-lg'>
                                            <img src={chat?.photoURL ? chat?.photoURL : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} alt="" className='w-12 h-12 rounded-full' />
                                            <div>
                                                <h1 className='text-base font-bold capitalize text-white'>{chat.name}</h1>
                                                {onlineUsers.some(user => user.userId === chat._id) ? (
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
                                        </li>
                                    )
                                }
                            </div>
                            {
                                user?.role === 'admin' &&
                                <>
                                    <div>
                                        <h1 className='text-2xl font-bold text-white'>Agents Here</h1>
                                        {
                                            agents && agents.map((chat, idx) =>
                                                <li onClick={() => setReciever(chat)} key={idx} className='p-2 relative my-2 cursor-pointer hover:shadow-lg text-xl font-medium flex justify-start items-center gap-2 border border-black rounded-lg'>
                                                    <img src={chat?.photoURL ? chat?.photoURL : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} alt="" className='w-12 h-12 rounded-full' />
                                                    <div>
                                                        <div className='flex justify-between w-full items-center gap-2'>
                                                            <h1 className='text-base font-bold capitalize text-white'>{chat.name}</h1>
                                                            <h1 className='text-[10px] capitalize text-white'>-({chat.agencyName})</h1>
                                                        </div>
                                                        {onlineUsers.some(user => user.userId === chat._id) ? (
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
                                                </li>
                                            )
                                        }
                                    </div>
                                </>
                            }
                            {
                                user?.role === 'spotter' &&
                                <>
                                    <div>
                                        <h1 className='text-2xl font-bold text-white'>Agency Here</h1>
                                        {
                                            agency && agency.map((chat, idx) =>
                                                <li onClick={() => setReciever(chat)} key={idx} className='p-2 relative my-2 cursor-pointer hover:shadow-lg text-xl font-medium flex justify-start items-center gap-2 border border-black rounded-lg'>
                                                    <img src={chat?.photoURL ? chat?.photoURL : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} alt="" className='w-12 h-12 rounded-full' />
                                                    <div>
                                                        <h1 className='text-base font-bold capitalize text-white'>{chat.name}</h1>
                                                        {onlineUsers.some(user => user.userId === chat._id) ? (
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
                                                </li>
                                            )
                                        }
                                    </div>
                                    <div>
                                        <h1 className='text-2xl font-bold text-white'>Agents Here</h1>
                                        {
                                            agents && agents.map((chat, idx) =>
                                                <li onClick={() => setReciever(chat)} key={idx} className='p-2 relative my-2 cursor-pointer hover:shadow-lg text-xl font-medium flex justify-start items-center gap-2 border border-black rounded-lg'>
                                                    <img src={chat?.photoURL ? chat?.photoURL : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} alt="" className='w-12 h-12 rounded-full' />
                                                    <div>
                                                        <div className='flex justify-between w-full items-center gap-2'>
                                                            <h1 className='text-base font-bold capitalize text-white'>{chat.name}</h1>
                                                            <h1 className='text-[10px] capitalize text-white'>-({chat.agencyName})</h1>
                                                        </div>
                                                        {onlineUsers.some(user => user.userId === chat._id) ? (
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
                                                </li>
                                            )
                                        }
                                    </div>
                                </>
                            }
                            {
                                user?.role === 'agency' &&
                                <>
                                    <div>
                                        <h1 className='text-2xl font-bold text-white'>Your Agents Here</h1>
                                        {
                                            agentOfAgency && agentOfAgency.map((chat, idx) =>
                                                <li onClick={() => setReciever(chat)} key={idx} className='p-2 relative my-2 cursor-pointer hover:shadow-lg text-xl font-medium flex justify-start items-center gap-2 border border-black rounded-lg'>
                                                    <img src={chat?.photoURL ? chat?.photoURL : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} alt="" className='w-12 h-12 rounded-full' />
                                                    <div>
                                                        <h1 className='text-base font-bold capitalize text-white'>{chat.name}</h1>
                                                        {onlineUsers.some(user => user.userId === chat._id) ? (
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
                                                </li>
                                            )
                                        }
                                    </div>
                                </>
                            }
                            {
                                user?.role === 'agent' &&
                                <>
                                    <div>
                                        <h1 className='text-2xl font-bold text-white'>Your Agency Here</h1>
                                        {
                                            agencyOfAgent && agencyOfAgent.map((chat, idx) =>
                                                <li onClick={() => setReciever(chat)} key={idx} className='p-2 relative my-2 cursor-pointer hover:shadow-lg text-xl font-medium flex justify-start items-center gap-2 border border-black rounded-lg'>
                                                    <img src={chat?.photoURL ? chat?.photoURL : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} alt="" className='w-12 h-12 rounded-full' />
                                                    <div>
                                                        <h1 className='text-base font-bold capitalize text-white'>{chat.name}</h1>
                                                        {onlineUsers.some(user => user.userId === chat._id) ? (
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
                                                </li>
                                            )
                                        }
                                    </div>
                                </>
                            }
                            {
                                <>
                                    <div>
                                        <h1 className='text-2xl font-bold text-white'>Spotters Here</h1>
                                        {
                                            spotters && spotters.map((chat, idx) =>
                                                <li onClick={() => setReciever(chat)} key={idx} className='p-2 relative my-2 cursor-pointer hover:shadow-lg text-xl font-medium flex justify-start items-center gap-2 border border-black rounded-lg'>
                                                    <img src={chat?.photoURL ? chat?.photoURL : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} alt="" className='w-12 h-12 rounded-full' />
                                                    <div>
                                                        <h1 className='text-base font-bold capitalize text-white'>{chat.name}</h1>
                                                        {onlineUsers.some(user => user.userId === chat._id) ? (
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
                                                </li>
                                            )
                                        }
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    <div className="rounded-lg lg:col-span-5">
                        <Message socket={socket} reciever={reciever} currentUser={user} onlineUsers={onlineUsers} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat