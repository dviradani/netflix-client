import { createContext, useEffect, useReducer } from "react"
import { authReducer } from "./authReducer.js"


export const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    userList: localStorage.getItem('userList') ? JSON.parse(localStorage.getItem('userList')) : null,
    loading: false,
    error: false
}

export const authContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
        localStorage.setItem('userList', JSON.stringify(state.userList))
    },[state.userInfo, state.userList])
return (
<authContext.Provider value={{userInfo: state.userInfo, userList: state.userList, dispatch}}>
    {children}
</authContext.Provider>
)
}
