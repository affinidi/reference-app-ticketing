import { createContext, FC, ReactNode } from 'react'

import { useAuthentication } from 'hooks/useAuthentication'

export const AuthContext = createContext(
  {} as ReturnType<typeof useAuthentication>
)

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useAuthentication()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
