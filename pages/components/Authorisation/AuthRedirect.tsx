import { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { ROUTES } from 'utils'
import { Spinner } from 'components'

import { useAuthContext } from 'hooks/useAuthContext'

type AuthRedirectProps = {
  children: React.ReactNode
}

export const AuthRedirect: FC<AuthRedirectProps> = ({ children }) => {
  const { route, replace } = useRouter()
  const { authState, authenticate } = useAuthContext()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    authenticate()
  }, [])

  useEffect(() => {
    if (!authState.loading) {
      if (route.includes('/holder')) {
        if (
          !authState.authorizedAsHolder &&
          route !== ROUTES.holder.signIn &&
          route !== ROUTES.holder.confirmSignIn
        ) {
           replace(ROUTES.holder.signIn)
        } else if (
          authState.authorizedAsHolder &&
          (route === ROUTES.holder.signIn ||
            route === ROUTES.holder.confirmSignIn)
        ) {
          if (authState.vcOfferToken) {
            replace(ROUTES.holder.claimVc)
          } else {
            replace(ROUTES.holder.home)
          }
        }
      }

      if (route.includes('/issuer')) {
        if (
          !authState.authorizedAsIssuer &&
          route !== ROUTES.issuer.signIn &&
          route !== ROUTES.issuer.confirmSignIn
        ) {
          replace(ROUTES.issuer.signIn)
        } else if (
          authState.authorizedAsIssuer &&
          (route === ROUTES.issuer.signIn ||
            route === ROUTES.issuer.confirmSignIn)
        ) {
           replace(ROUTES.issuer.credentialForm)
        }
      }

      setIsLoading(false)
    }
  }, [route, replace, authState])

  if (isLoading) {
    return <Spinner />
  }

  return <>{children}</>
}
