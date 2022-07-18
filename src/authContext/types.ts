import { User } from "../types"

export interface AuthContextState {
  user: User | null
  isFetching: boolean
  error: boolean
}

export enum ActionType {
  LOGIN_START = "LOGIN_START",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
  LOGOUT = "LOGOUT",
}

export interface LoginStart {
  type: ActionType.LOGIN_START
}

export interface LoginSuccess {
  type: ActionType.LOGIN_SUCCESS
  payload: User
}

export interface LoginFailure {
  type: ActionType.LOGIN_FAILURE
}

export interface Logout {
  type: ActionType.LOGOUT
}

export type AuthContextDispatchTypes =
  | LoginStart
  | LoginSuccess
  | LoginFailure
  | Logout
