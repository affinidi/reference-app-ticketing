import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'

import { ROUTES } from 'utils'
import { useAuthContext } from 'hooks/useAuthContext'
import { logout } from 'hooks/useAuthentication'

export const useNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { authState, updateAuthState } = useAuthContext()
  const { push } = useRouter()

  const isAuthorized = authState.authorizedAsIssuer || authState.authorizedAsHolder

  const handleGoHomePage = () => {
    push(ROUTES.home)
  }

  const handleLogOut = useCallback(async () => {
    await logout(authState)
    updateAuthState({
      authorizedAsIssuer: false,
      authorizedAsHolder: false,
    })
    setIsMenuOpen(false)
    push(ROUTES.home)
  }, [authState, push, updateAuthState])

  return { isMenuOpen, handleLogOut, setIsMenuOpen, handleGoHomePage, isAuthorized }
}
