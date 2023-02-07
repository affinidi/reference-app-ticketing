import { FC } from 'react'

import { SignInForm } from 'pages/components/SignInForm'

import { useIssuerSignIn } from './useIssuerSignIn'

export const IssuerSignIn: FC = () => {
  const { handleSignIn, setUsername, disabled, error, isLoading, inputError, setInputError } =
    useIssuerSignIn()

  return (
    <SignInForm
      handleSignIn={handleSignIn}
      setUsername={setUsername}
      disabled={disabled}
      isLoading={isLoading}
      error={error}
      role="issuer"
      inputError={inputError}
      setInputError={setInputError}
    />
  )
}

export default IssuerSignIn
