import { FC } from 'react'
import { ValidCredential, InvalidCredential, IssuedIcon } from 'assets'
import * as S from './Result.styled'

export type ResultContentProps = {
  isValid: boolean
  isIssuance?: boolean
}
export const ResultContent: FC<ResultContentProps> = ({ isValid, isIssuance }) => {
  return (
    <>
      {isValid ? isIssuance ? <IssuedIcon /> : <ValidCredential /> : <InvalidCredential />}
      <S.ResultTitle variant="h5" $isVerified={isValid} $isIssuance={isIssuance}>
        {isValid ? (isIssuance ? 'Ticket successfully issued' : 'Valid ticket') : 'Invalid ticket'}
      </S.ResultTitle>
    </>
  )
}
