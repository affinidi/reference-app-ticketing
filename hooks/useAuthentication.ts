import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useState } from 'react'

import { cloudWalletService } from 'services/cloud-wallet'
import {
  userManagementService,
  AuthConfirmationInput,
  isHttpError,
} from 'services/user-management'
import {
  ConfirmSignInInput,
  ConfirmSignInOutput,
  SignInInput,
} from 'services/cloud-wallet/cloud-wallet.api'
import { useRouter } from 'next/router'

export type ErrorResponse = {
  name: string
  traceId: string
  message: string
  details: {
    field: string
    issue: string
    location: string
  }
}
export const holderSignIn = ({ username }: SignInInput) => {
  return cloudWalletService.signInPasswordless({ username })
}

export const issuerSignInOrSignUp = async ({ username }: SignInInput) => {
  try {
    const token = await userManagementService.signIn({ username })

    return {
      token,
      signup: false,
    }
  } catch (error: unknown) {
    if (!isHttpError(error)) {
      throw error
    }

    if (error.status === 404 || error.status === 422) {
      const token = await userManagementService.signupUser({ username })

      return {
        token,
        signup: true,
      }
    }

    throw new Error(error?.error?.message)
  }
}

export const holderConfirmSignin = ({
  token,
  confirmationCode,
}: ConfirmSignInInput) => {
  return cloudWalletService.confirmSignInPasswordless({
    token,
    confirmationCode,
  })
}

export const issuerConfirmSigninOrSignup = ({
  token,
  confirmationCode,
  signup,
}: AuthConfirmationInput) => {
  if (signup) {
    return userManagementService.signupConfirmation({
      token,
      confirmationCode,
    })
  }

  return userManagementService.signInConfirmation({ token, confirmationCode })
}

export const logout = async (authState: UserState) => {
  if (authState.authorizedAsHolder) {
    try {
      await cloudWalletService.logOut()
    } catch (e) {}
  }

  if (authState.authorizedAsIssuer) {
    try {
      await userManagementService.logout()
    } catch (e) {}
  }
}

export const useHolderSignInMutation = () => {
  return useMutation<string, ErrorResponse, SignInInput, () => void>(
    (data: SignInInput) => holderSignIn(data)
  )
}

export const useIssuerSignInMutation = () => {
  return useMutation<
    {
      token: string
      signup: boolean
    },
    ErrorResponse,
    SignInInput,
    () => void
  >((data: SignInInput) => issuerSignInOrSignUp(data))
}

export const useConfirmSignInMutation = () => {
  return useMutation<
    ConfirmSignInOutput,
    ErrorResponse,
    ConfirmSignInInput,
    () => void
  >((data: ConfirmSignInInput) => holderConfirmSignin(data))
}

export const useIssuerConfirmSignInMutation = () => {
  return useMutation<boolean, ErrorResponse, AuthConfirmationInput, () => void>(
    (data: AuthConfirmationInput) => issuerConfirmSigninOrSignup(data)
  )
}

export type UserState = {
  username: string
  refreshToken: string
  accessToken: string
  did: string
  authorizedAsIssuer: boolean
  authorizedAsHolder: boolean
  loading: boolean
  vcOfferToken: string
  appFlow: 'holder' | 'issuer' | 'verifier' | null
}

const BASIC_STATE: UserState = {
  username: '',
  accessToken: '',
  did: '',
  refreshToken: '',
  authorizedAsHolder: false,
  authorizedAsIssuer: false,
  loading: true,
  vcOfferToken: '',
  appFlow: null,
}

export const useAuthentication = () => {
  const [authState, setAuthState] = useState<UserState>(BASIC_STATE)
  const router = useRouter()

  const updatePartiallyState =
    <T>(updateFunction: Dispatch<SetStateAction<T>>) =>
    (newState: Partial<T>) => {
      updateFunction((prev) => ({ ...prev, ...newState }))
    }
  const updateAuthState = updatePartiallyState<typeof authState>(setAuthState)

  const authenticate = async () => {
    if (router.pathname.includes('/issuer')) {
      try {
        const response = await userManagementService.me()
        if (response) {
          updateAuthState({ loading: false, authorizedAsIssuer: true })
        }
      } catch (error) {
        updateAuthState({ loading: false, authorizedAsIssuer: false })
      }

      return
    }

    try {
      const response = await cloudWalletService.getDid()
      if (response) {
        updateAuthState({ loading: false, authorizedAsHolder: true })
      }
    } catch (error) {
      updateAuthState({ loading: false, authorizedAsHolder: false })
    }
  }

  return { authState, setAuthState, updateAuthState, authenticate }
}
