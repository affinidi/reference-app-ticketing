import { userManagementApiUrl } from 'pages/env'
import {
  Api,
  AuthConfirmationInput as AuthConfirmationInputBase,
  AuthLoginInput,
  AuthSignupInput,
} from './user-management.api'

export interface AuthConfirmationInput extends AuthConfirmationInputBase {
  signup: boolean
}

export const isHttpError = (
  error: unknown,
): error is {
  status: number
  error: {
    message: string
  }
} => {
  return Object.prototype.hasOwnProperty.call(error, 'error')
}

class UserManagementService {
  constructor(
    private readonly client = new Api({
      baseUrl: `${userManagementApiUrl}/v1`,
      baseApiParams: {
        credentials: 'include',
      },
    }).auth,
  ) {}

  async signupUser(params: AuthSignupInput) {
    try {
      const result = await this.client.signupUser(params)
      return result.data
    } catch (error: unknown) {
      if (!isHttpError(error)) {
        throw error
      }
      throw new Error(error?.error?.message)
    }
  }

  async signupConfirmation(params: AuthConfirmationInputBase) {
    try {
      await this.client.signupConfirmation(params)

      return true
    } catch (error: unknown) {
      if (!isHttpError(error)) {
        throw error
      }
      throw new Error(error?.error?.message)
    }
  }

  async logout() {
    try {
      await this.client.logout()
    } catch (error: any) {
      throw new Error(error?.error?.message)
    }
  }

  async signIn(params: AuthLoginInput) {
    const result = await this.client.login(params)
    return result.data
  }

  async signInConfirmation(params: AuthConfirmationInputBase) {
    try {
      await this.client.loginConfirmation(params)

      return true
    } catch (error: unknown) {
      if (!isHttpError(error)) {
        throw error
      }
      throw new Error(error?.error?.message)
    }
  }

  async me() {
    try {
      const result = await this.client.me()
      return result.data
    } catch (error: unknown) {
      if (!isHttpError(error)) {
        throw error
      }
      throw new Error(error?.error?.message)
    }
  }
}

export const userManagementService = new UserManagementService()
