import { FC, useEffect } from 'react'

import { ROUTES } from 'utils'
import { useAuthContext } from 'hooks/useAuthContext'
import { ErrorResponse } from 'hooks/useAuthentication'
import { Box, Button, Container, Header, Spinner } from 'components'

import { ResultContent } from './ResultContent'
import * as S from './Result.styled'
import { useRouter } from 'next/router'

export type ResultProps = {
  isLoading: boolean
  error: ErrorResponse | null
  isValid: boolean
  pathTo: string
}

export const Result: FC<ResultProps> = ({ isLoading, isValid, error, pathTo }) => {
  const router = useRouter()
  const { authState } = useAuthContext()

  useEffect(() => {
    if (authState.appFlow === null || authState.appFlow === 'holder') {
      router.push(ROUTES.home)
    }
  }, [authState.appFlow, router])

  if (isLoading) {
    return (
      <>
        <Header
          title={authState.appFlow === 'verifier' ? 'QR code scanned' : 'Ticket Issued'}
          hasBackIcon
        />
        <Container>
          <Spinner />
        </Container>
      </>
    )
  }

  const isResultValid = isValid && !error

  return (
    <>
      <Header
        title={authState.appFlow === 'verifier' ? 'QR code scanned' : 'Ticket issued'}
        hasBackIcon
      />
      <Container>
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          <Box className="lg:col-start-2" alignItems="center">
            <ResultContent isValid={isResultValid} isIssuance={authState.appFlow === 'issuer'} />
            <S.ResultPara variant="p1">
              {authState.appFlow === 'verifier'
                ? isResultValid
                  ? 'Ticket successfully checked.'
                  : 'Ticket is invalid'
                : 'Your ticket has been issued.'}
            </S.ResultPara>

            <Button
              fullWidth
              color="quaternary"
              variant="outlined"
              onClick={() => router.push(pathTo)}
            >
              {authState.appFlow === 'verifier' ? 'SCAN NEXT QR CODE' : 'ISSUE NEXT TICKET'}
            </Button>
          </Box>
        </div>
      </Container>
    </>
  )
}
