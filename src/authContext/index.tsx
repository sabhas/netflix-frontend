import React, {
  createContext,
  useEffect,
  useReducer,
  useCallback,
  Dispatch,
  ReactNode,
} from "react"
import axios from "axios"
import { AuthContextState, AuthContextDispatchTypes } from "./types"
import { loginStart, loginSuccess, loginFailure } from "./actions"
import AuthReducer from "./reducer"

const user = localStorage.getItem("user")

interface AuthContextProps {
  state: AuthContextState
  dispatch: Dispatch<AuthContextDispatchTypes>
  login: (username: string, password: string) => void
}

const INITIAL_STATE = {
  user: user ? JSON.parse(user) : null,
  isFetching: false,
  error: false,
}

export const AuthContext = createContext<AuthContextProps>({
  state: INITIAL_STATE,
  dispatch: () => null,
  login: (username: string, password: string) => {},
})

const AuthContextProvider = (props: { children: ReactNode }) => {
  const { children } = props
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user))
  }, [state.user])

  const login = useCallback((username: string, password: string) => {
    dispatch(loginStart())
    axios
      .post("auth/login", { username, password })
      .then((res: any) => {
        dispatch(loginSuccess(res.data))
      })
      .catch(() => dispatch(loginFailure()))
  }, [])

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
