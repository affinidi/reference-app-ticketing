import { FC } from 'react'

import { SignInForm } from 'pages/components/SignInForm'

import { useHolderSignIn } from './useHolderSignIn'

export const HolderSignIn: FC = () => {
  const { handleSignIn, setUsername, disabled, error, isLoading, inputError, setInputError } =
    useHolderSignIn()

  return (
    <SignInForm
      handleSignIn={handleSignIn}
      setUsername={setUsername}
      disabled={disabled}
      isLoading={isLoading}
      error={error}
      inputError={inputError}
      setInputError={setInputError}
      role="holder"
    />
  )
}

export default HolderSignIn
