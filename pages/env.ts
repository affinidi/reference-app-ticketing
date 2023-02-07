// shared envs for frontend and backend

export const hostUrl = require(process.env.NEXT_PUBLIC_HOST)

export const issuanceApiUrl = require(process.env.NEXT_PUBLIC_ISSUANCE_API_URL)
export const userManagementApiUrl = require(process.env.NEXT_PUBLIC_USER_MANAGEMENT_API_URL)
export const verifierApiUrl = require(process.env.NEXT_PUBLIC_VERIFIER_API_URL)
export const cloudWalletApiUrl = require(process.env.NEXT_PUBLIC_CLOUD_WALLET_API_URL)

export const apiKeyHash = require(process.env.NEXT_PUBLIC_API_KEY_HASH)
export const projectDid = require(process.env.NEXT_PUBLIC_PROJECT_DID)
export const projectId = require(process.env.NEXT_PUBLIC_PROJECT_ID)

function require<T>(value: T | undefined): T {
  if (!value) {
    throw new Error('Environment value is missing')
  }

  return value
}

