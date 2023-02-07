import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Button, Input, Typography } from 'components'

export const Heading = styled(Typography)`
  margin: ${pxToRem(48)} 0 ${pxToRem(24)};
`

export const Title = styled(Typography)`
  margin-bottom: ${pxToRem(24)};
`

export const InputWrapper = styled(Input)`
  margin-bottom: ${pxToRem(24)};
`

export const ButtonWrapper = styled(Button)`
  margin-bottom: ${pxToRem(40)};
`
