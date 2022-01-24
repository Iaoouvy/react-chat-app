import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import { fetchUsers, fetchMessages } from "../redux/reducers/authReducer";

const Chat = (props: any) => {
    const userId = 323
    type Message = { id: number, text: string }
    const [msg, setMsg] = useState<string>("")
    const [chat, setChat] = useState<Array<Message>>([])
    const chatRef = React.useRef<HTMLDivElement>(null)

    useEffect(() => {
        const CurrUserMessages = props.messages.filter((msg: Message) => msg.id === props.selectedUserId)
        setChat(CurrUserMessages)
    }, [props.selectedUserId])

    useEffect(() => {
        //scroll to the bottom of the chat
        if (chatRef.current) {
            chatRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [chat])

    const onSendMsg = () => {
        if (!msg) return
        setChat([...chat, { id: userId, text: msg }])
        setMsg("")
    }

    const onInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onSendMsg()
        }
    }

    return (
        <div className='flex flex-col justify-between flex-auto rounded-tl-xl border-1 shadow'>
            <div className="h-16 font-semibold text-2xl p-4 bg-gradient-to-r text-white from-blue-500 via-cyan-500 to-blue-500">Chat Messages</div>
            {/* Display chat messages */}
            <div className="overflow-y-auto flex flex-col flex-auto align-top space-y-4 p-4">
                {chat.map((msg: Message, idx) => {
                    return (
                        <div className={`flex flex-row${msg.id === userId ? "-reverse" : ""} items-center h-16`} key={idx}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className='bg-cyan-400 p-3 rounded-2xl shadow-xl'>{msg.text}</p>
                        </div>
                    )
                })}
                <div ref={chatRef} />
            </div>
            <div className='flex flex-row items-center space-x-2 mx-4 px-2'>
                <p className='flex-none'>New Message</p>
                <p className='border-y flex-auto border-blue-600 mt-2'></p>
            </div>
            {/* Input to send new message */}
            <div className="flex felx-row justify-evenly items-center m-2">
                <input
                    className="h-24 w-full m-2 shadow-xl rounded-lg px-4"
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
                    onKeyPress={onInputKeyPress}
                ></input>
                <button
                    className="flex flex-row mr-4 p-2 font-medium items-center rounded-3xl h-10 border border-blue-900 hover:bg-blue-200"
                    onClick={onSendMsg}
                >SEND <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        users: state.auth.users || [],
        messages: state.auth.messages || [],
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchUsers: () => {
            dispatch(fetchUsers())
        },
        fetchMessages: () => dispatch(fetchMessages())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)