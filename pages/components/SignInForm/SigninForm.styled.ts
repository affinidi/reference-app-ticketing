import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Button, Typography } from 'components'

export const Title = styled(Typography)`
  margin: ${pxToRem(40)} 0;

  @media (max-width: 1024px) {
    margin: ${pxToRem(40)} 0 ${pxToRem(24)};
  }
`

export const ButtonWrapper = styled(Button)`
  margin-top: ${pxToRem(48)};

  @media (max-width: 1024px) {
    margin-top: ${pxToRem(40)};
  }
`
