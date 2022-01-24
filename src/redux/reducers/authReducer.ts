import { Dispatch } from 'redux';
const axios = require('axios')

type User = { id: number, name: string }
type Message = { id: number, text: string }

const initialState = {
    loading: false,
    users: [],
    messages: [],
    error: ""
}

export const FECTH_REQUEST = 'FECTH_REQUEST';
export const FECTH_FAILURE = 'FECTH_FAILURE';
export const FECTH_USERS_SUCCESS = 'FECTH_USERS_SUCCESS';
export const FECTH_MESSAGES_SUCCESS = 'FECTH_MESSAGES_SUCCESS';

const fetchRequest = () => ({ type: FECTH_REQUEST });
const fetchFailure = (error: string) => ({ type: FECTH_FAILURE, error });

const fetchUsersSuccess = (users: User[]) => ({ type: FECTH_USERS_SUCCESS, users });
const fetchMessagesSuccess = (messages: Message[]) => ({ type: FECTH_MESSAGES_SUCCESS, messages });

export const fetchUsers = () => {
    return function (dispatch: Dispatch) {
        dispatch(fetchRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((res: any) => {
                const users = res.data.map((user: User) => {
                    return { id: user.id, name: user.name }
                })
                dispatch(fetchUsersSuccess(users))
            })
            .catch((error: any) => {
                dispatch(fetchFailure(error.messgae))
            })
    }
};

export const fetchMessages = () => {
    return function (dispatch: Dispatch) {
        dispatch(fetchRequest());
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then((res: any) => {
                const messages = res.data.map((msg: { userId: number, title: string }) => {
                    return { id: msg.userId, text: msg.title }
                })
                dispatch(fetchMessagesSuccess(messages))
            })
            .catch((error: any) => {
                dispatch(fetchFailure(error.messgae))
            })
    }
};


export default (state = initialState, action: any) => {
    switch (action.type) {
        case FECTH_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FECTH_FAILURE:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.error
            };
        case FECTH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.users,
                error: null
            };
        case FECTH_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                messages: action.messages,
                error: null
            }
        default:
            return state;
    }
}


