import session from "express-session"

const initialState = {
    username: '',
    profilePic: '',
}
const UPDATE_USER = 'UPDATE_USER'
const LOGOUT = 'LOGOUT'
const REDUX_STATE_PIC = 'REDUX_STATE_PIC'

export function updateUser(user){
    return {
        type: UPDATE_USER,
        payload: user
    }
}
export function profilePic(user){
    return{
        type: REDUX_STATE_PIC,
        payload: user.profile_pic
    }
}
export function logout(){
    return{
        type: LOGOUT,
    }
}


export default function reducer(state= initialState, action){
    switch(action.type){
        case UPDATE_USER:
            return{...state, username: action.payload}
        case LOGOUT:
            return{...state, username: ""}
        case REDUX_STATE_PIC:
            return{...state, profilePic: action.payload}
        default: 
        return {...state};
    }
}