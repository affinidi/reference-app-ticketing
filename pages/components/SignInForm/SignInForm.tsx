import { Dispatch, FC, FormEvent, SetStateAction } from 'react'

import { Container, ContainerForm, Header, Input } from 'components'

import * as S from './SigninForm.styled'

type SignInFormProps = {
  handleSignIn(e: FormEvent): void
  setUsername(username: string): void
  disabled: boolean
  isLoading: boolean
  error: Error | null
  inputError: string | null
  setInputError: Dispatch<SetStateAction<string | null>>
  role: 'holder' | 'issuer'
}

export const SignInForm: FC<SignInFormProps> = ({
  handleSignIn,
  setUsername,
  disabled,
  error,
  inputError,
  setInputError,
  isLoading,
  role,
}) => {
  const handleChange = (value: string) => {
    if (inputError) {
      setInputError(null)
    }

    setUsername(value)
  }

  return (
    <>
      <Header title={`Sign in as ${role}`} />

      <Container>
        <div className="grid lg:grid-cols-3 lg:gap-16">
          <ContainerForm className="lg:col-start-2" onSubmit={handleSignIn}>
            <S.Title variant="p1">Please enter your email address to sign in.</S.Title>

            <Input
              id="email"
              type="email"
              label="Email address"
              placeholder="Enter your email address"
              onChange={handleChange}
              hasError={Boolean(inputError || error?.message)}
              helpText={inputError || error?.message}
            />

            <S.ButtonWrapper fullWidth disabled={disabled} loading={isLoading} type="submit">
              send verification code
            </S.ButtonWrapper>
          </ContainerForm>
        </div>
      </Container>
    </>
  )
}
