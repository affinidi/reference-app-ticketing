import { useMutation } from '@tanstack/react-query'
import { verifierService } from 'services/verifier'
import { W3CCredential, VerifyCredentialOutput } from 'services/verifier/verifier.api'

type ErrorResponse = {
  name: string
  traceId: string
  message: string
  details: {
    field: string
    issue: string
    location: string
  }
}

export const verifyCredentials = (data: W3CCredential) => {
  return verifierService.verifyVc(data)
}

export const useVerifyCredentialsMutation = () => {
  return useMutation<VerifyCredentialOutput | undefined, ErrorResponse, W3CCredential, () => void>(
    (data: W3CCredential) => verifyCredentials(data),
  )
}
