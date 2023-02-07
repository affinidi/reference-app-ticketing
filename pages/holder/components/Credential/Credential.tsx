import { FC } from 'react'
import { AnyData } from 'services/cloud-wallet/cloud-wallet.api'
import { format } from 'date-fns'

import { TicketDetails } from '../TicketDetails/TicketDetails'

import * as S from './Credential.styled'

export type CredentialProps = {
  credentialSubject: AnyData
  qrCode?: string
}

export const renderLiteral = (value: unknown): string => {
  if (typeof value !== 'string') {
    return `${value}`
  }

  const parsedDate = Date.parse(value)
  if (!parsedDate) {
    return value
  }

  const d = new Date(parsedDate)
  return d.toDateString()
}

const getDetails = ({
  detailsObject,
  nested = false,
  qrCode,
}: {
  detailsObject: unknown
  nested?: boolean
  qrCode?: string
}) => {
  if (Array.isArray(detailsObject)) {
    return (
      <S.Div nested={nested}>
        {detailsObject.map((value, index) => (
          <S.Div key={index}>{getDetails({ detailsObject: value, nested: true })}</S.Div>
        ))}
      </S.Div>
    )
  }

  if (typeof detailsObject === 'object' && detailsObject !== null) {
    return (
      qrCode && (
        <TicketDetails
          eventName={detailsObject.eventName}
          startDate={format(new Date(detailsObject.startDate), 'dd.MM.yyy')}
          endDate={format(new Date(detailsObject.endDate), 'dd.MM.yyy')}
          startTime={format(new Date(detailsObject.startDate), 'HH.mm')}
          endTime={format(new Date(detailsObject.endDate), 'HH.mm')}
          location={detailsObject.place}
          qrCode={qrCode}
        />
      )
    )
  }

  return <S.Div>{renderLiteral(detailsObject)}</S.Div>
}

export const Credential: FC<CredentialProps> = ({ credentialSubject, qrCode }) => {
  return <>{getDetails({ detailsObject: credentialSubject, qrCode })}</>
}
