import { USER_SIGNIN, USER_SIGNOUT, UPDATE_USERLIST } from "./reducerActions";


export const authReducer = (state, { type, payload }) => {
  switch (type) {

      case USER_SIGNIN:
          return {
              ...state,
              userInfo: payload
          }
      case USER_SIGNOUT:
          localStorage.removeItem('userInfo');
          return {
              ...state,
              userInfo: null,
          }
      case UPDATE_USERLIST:
            return {
                ...state,
                userList: payload
            }
      default:
          return state;
  }
}
