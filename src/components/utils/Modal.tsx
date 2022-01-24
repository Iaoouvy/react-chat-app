import { useState } from "react";

export const Modal = (props: any) => {
    const [name, setName] = useState("")

    return (
        <div className='bg-black flex justify-center items-center absolute inset-0 bg-opacity-30'>
            <div className='bg-white p-6 rounded-xl shadow-2xl space-y-10'>
                <div className="flex flex-col items-center space-y-2">
                    <h3>Please enter the user name</h3>
                    <input className="border border-x-2 border-blue-600 rounded-md p-1" onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div className="flex flex-row justify-end space-x-2">
                    <button className="border border-blue-800 px-2 py-1 rounded-md shadow-2xl hover:bg-slate-200" onClick={() => props.handleClose()}>Cancel</button>
                    <button className="border border-blue-800 px-2 py-1 rounded-md shadow-2xl hover:bg-blue-200" onClick={() => {props.addUser(name); props.handleClose()}}>Add</button>
                </div>
            </div>
        </div>
    )
}