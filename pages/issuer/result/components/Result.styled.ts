import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Typography } from 'components'

export const ResultTitle = styled(Typography)<{ $isVerified?: boolean; $isIssuance?: boolean }>`
  color: ${(props) =>
    props.$isIssuance || props.$isVerified
      ? props.theme.colors.utility.success[70]
      : props.theme.colors.utility.danger[70]};
  margin: ${pxToRem(48)} 0 ${pxToRem(16)};
`

export const ResultPara = styled(Typography)`
  margin-bottom: ${pxToRem(48)};
`

export const ImgWrapper = styled.div`
  svg {
    max-width: 100%;
    height: auto;
  }
`
