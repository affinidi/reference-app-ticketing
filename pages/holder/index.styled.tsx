import styled from 'styled-components'
import { pxToRem } from 'utils'
import { Typography } from 'components'

export const IconContainer = styled.div`
  margin: ${pxToRem(44)} auto ${pxToRem(48)};

  svg {
    max-width: 100%;
  }
`

export const SubTitle = styled(Typography)`
  margin: ${pxToRem(48)} 0 ${pxToRem(24)};
`
