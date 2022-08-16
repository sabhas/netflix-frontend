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

export const loginSuccess = (
  userResponse: User,
  accessToken: string
): LoginSuccess => ({
  type: ActionType.LOGIN_SUCCESS,
  payload: { userResponse, accessToken },
})

export const loginFailure = (): LoginFailure => ({
  type: ActionType.LOGIN_FAILURE,
})

export const logout = (): Logout => ({
  type: ActionType.LOGOUT,
})
