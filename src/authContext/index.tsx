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
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout as logoutAction,
} from "./actions"
import AuthReducer from "./reducer"

const setAxiosRequestInterceptor = (accessToken: string | null) => {
  axios.interceptors.request.use(
    (config) => {
      if (accessToken && config.headers) {
        config.headers["Authorization"] = "Bearer " + accessToken
      }
      // config.headers['Content-Type'] = 'application/json';
      return config
    },
    (error) => {
      Promise.reject(error)
    }
  )
}

const setAxiosResponseInterceptor = (
  dispatch: Dispatch<AuthContextDispatchTypes>
) => {
  axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        dispatch(logoutAction())
        return Promise.reject(error)
      }

      return Promise.reject(error)
    }
  )
}

const user = localStorage.getItem("user")
const accessToken = localStorage.getItem("accessToken")

interface AuthContextProps {
  state: AuthContextState
  dispatch: Dispatch<AuthContextDispatchTypes>
  login: (username: string, password: string) => void
  logout: () => void
}

const INITIAL_STATE = {
  user: user ? JSON.parse(user) : null,
  accessToken: accessToken,
  isFetching: false,
  error: false,
}

export const AuthContext = createContext<AuthContextProps>({
  state: INITIAL_STATE,
  dispatch: () => null,
  login: (username: string, password: string) => {},
  logout: () => {},
})

const AuthContextProvider = (props: { children: ReactNode }) => {
  const { children } = props
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  useEffect(() => {
    setAxiosResponseInterceptor(dispatch)
  }, [])

  useEffect(() => {
    if (state.user) localStorage.setItem("user", JSON.stringify(state.user))
    else localStorage.removeItem("user")
  }, [state.user])

  useEffect(() => {
    if (state.accessToken)
      localStorage.setItem("accessToken", state.accessToken)
    else localStorage.removeItem("accessToken")
    setAxiosRequestInterceptor(state.accessToken)
  }, [state.accessToken])

  const login = useCallback((username: string, password: string) => {
    dispatch(loginStart())
    axios
      .post("auth/login", { username, password })
      .then((res: any) => {
        dispatch(loginSuccess(res.data.userResponse, res.data.accessToken))
      })
      .catch(() => dispatch(loginFailure()))
  }, [])

  const logout = useCallback(() => {
    dispatch(logoutAction())
  }, [])

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
