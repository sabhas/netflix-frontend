import { User } from "../types"
import {
  ActionType,
  LoginStart,
  LoginSuccess,
  LoginFailure,
  Logout,
} from "./types"

export const loginStart = (): LoginStart => ({
  type: ActionType.LOGIN_START,
})

export const loginSuccess = (user: User): LoginSuccess => ({
  type: ActionType.LOGIN_SUCCESS,
  payload: user,
})

export const loginFailure = (): LoginFailure => ({
  type: ActionType.LOGIN_FAILURE,
})

export const logout = (): Logout => ({
  type: ActionType.LOGOUT,
})
