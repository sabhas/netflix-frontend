import { ActionType, AuthContextDispatchTypes, AuthContextState } from "./types"

const AuthReducer = (
  state: AuthContextState,
  action: AuthContextDispatchTypes
) => {
  switch (action.type) {
    case ActionType.LOGIN_START:
      return {
        user: null,
        accessToken: null,
        isFetching: true,
        error: false,
      }
    case ActionType.LOGIN_SUCCESS:
      return {
        user: action.payload.userResponse,
        accessToken: action.payload.accessToken,
        isFetching: false,
        error: false,
      }
    case ActionType.LOGIN_FAILURE:
      return {
        user: null,
        accessToken: null,
        isFetching: false,
        error: true,
      }
    case ActionType.LOGOUT:
      return {
        user: null,
        accessToken: null,
        isFetching: false,
        error: false,
      }
    default:
      return { ...state }
  }
}

export default AuthReducer
