import { apiKeyHash, verifierApiUrl } from 'pages/env'
import { Api as VerifierApi, W3CCredential } from './verifier.api'

class VerifierService {
  constructor(
    private readonly client = new VerifierApi({
      baseUrl: `${verifierApiUrl}/v1`,
      baseApiParams: {
        headers: {
          'Api-Key': apiKeyHash,
          'Content-Type': 'application/json',
        },
      },
    }),
  ) {}

  verifyVc = async (data: W3CCredential) => {
    try {
      const result = await this.client.verifier.verifyCredentials({ verifiableCredentials: [data] })
      return result.data
    } catch (error: any) {
      throw new Error(error?.error?.message)
    }
  }
}

const verifierService = new VerifierService()

export { verifierService }
