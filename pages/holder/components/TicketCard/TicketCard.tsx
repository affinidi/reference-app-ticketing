import { FC } from 'react'

import { Credential } from 'pages/holder/types'
import { ROUTES } from 'utils'

import { Box, Typography } from 'components'
import { Ticket } from '../Ticket/Ticket'
import { useRouter } from 'next/router'

export type TicketCardProps = {
  credential: Credential
  isValid: boolean
}

const TicketCard: FC<TicketCardProps> = ({ credential, isValid }) => {
  const router = useRouter()

  return (
    <Ticket
      isValid={isValid}
      onClick={() => router.push(`${ROUTES.holder.credential}/${credential.credentialId}`)}
    >
      <Box gap={32}>
        <Box>
          <Typography variant="h6">{credential.title}</Typography>
          <Typography variant="s2">Entry Ticket</Typography>
        </Box>

        <Box direction="row" gap={32}>
          <Box>
            <Typography variant="c1">Start Date</Typography>
            <Typography variant="p4">{credential.date}</Typography>
          </Box>
          <Box>
            <Typography variant="c1">Start Time</Typography>
            <Typography variant="p4">{credential.time}</Typography>
          </Box>
        </Box>
      </Box>
    </Ticket>
  )
}

export default TicketCard
