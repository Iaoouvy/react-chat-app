import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import { fetchUsers, fetchMessages } from "../redux/reducers/authReducer";
import Chat from './Chat'
import { Modal } from './utils/Modal'

const User = (props: any) => {
	type User = { id: number, name: string }
	const [users, setUsers] = useState<Array<User>>([]);
	const [showModal, setShowModal] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState<Number>(1);

	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	useEffect(() => {
		//fetch users and messages
		(async () => await Promise.all([props.fetchUsers(), props.fetchMessages()]))()	
	}, [])

	useEffect(() => {
		setUsers(props.users)
	}, [props.users])

	const addUser = (userName: string) => {
		if (!userName) return
		setUsers([...users, { id: users.length + 1, name: userName }])
	}

	return (
		<>
		{props.loading ? <div className='flex h-screen m-auto items-center'>loading...</div> : (
			<>
			{/* Modal to add New user */}
			{showModal && <Modal handleClose={handleClose} handleShow={handleShow} addUser={addUser}/>}

			<div className='flex flex-col w-72 space-y-8 shadow bg-gray-100'>
				<div className="h-12 flex flex-row justify-between items-center flex-none mt-4 p-6">
					<h1 className="font-medium text-3xl">Users</h1>
					<button
						className='flex flex-row items-center h-8 font-medium border border-blue-900 rounded-3xl p-2 mt-2 hover:bg-blue-200'
						onClick={() => setShowModal(true)}
					>Add <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
						</svg></button>
				</div>
				<div className="flex-auto items-start m-4 space-y-2 overflow-y-scroll">
					{users.map((user: User) => {
						return (
							<div key={user.id} className="border-b hover:bg-sky-200">
								<button className='flex flex-row items-center h-16' onClick={() => setSelectedUserId(user.id)}>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
									</svg>
									{user.name}</button>
							</div>
						)
					})}
				</div>
			</div>
			{/* Render chat box for selected user */}
			{props.messages.length > 0 && <Chat selectedUserId={selectedUserId} messages={props.messages} />}
			</>
		)}
		</>
	)
}

const mapStateToProps = (state: any) => {
	return {
		users: state.auth.users || [],
		messages: state.auth.messages || [],
		loading: state.auth.loading || false,
	}
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		fetchUsers: () => dispatch(fetchUsers()),
		fetchMessages: () => dispatch(fetchMessages())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(User)