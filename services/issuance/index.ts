import { issuanceApiUrl } from 'pages/env'
import {
  Api as IssuanceAPI,
  CreateIssuanceInput,
  CreateIssuanceOfferInput,
  CreateIssuanceOutput,
  OfferDto,
} from './issuance.api'

class IssuanceService {
  constructor(
    private readonly client = new IssuanceAPI({
      baseUrl: `${issuanceApiUrl}/v1`,
      baseApiParams: {
        credentials: 'include',
      },
    }),
  ) {}

  public createIssuance = async (
    apiKey: string,
    issuanceInput: CreateIssuanceInput,
  ): Promise<CreateIssuanceOutput> => {
    try {
      const resp = await this.client.issuances.createIssuance(issuanceInput, {
        headers: { 'Api-Key': apiKey },
      })
      return resp.data
    } catch (error: any) {
      throw new Error(error?.error?.message)
    }
  }

  public createOffer = async (
    apiKey: string,
    issuanceId: string,
    offerInput: CreateIssuanceOfferInput,
  ): Promise<OfferDto> => {
    try {
      const resp = await this.client.issuances.createOffer(issuanceId, offerInput, {
        headers: { 'Api-Key': apiKey },
      })
      return resp.data
    } catch (error: any) {
      throw new Error(error?.error?.message)
    }
  }
}

const issuanceService = new IssuanceService()

export { issuanceService }
