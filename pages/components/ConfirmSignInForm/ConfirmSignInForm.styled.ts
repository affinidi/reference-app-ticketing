import styled, { css } from 'styled-components'

import { pxToRem } from 'utils'
import { Box, Button, Input, Typography } from 'components'

export const Wrapper = styled.div`
  padding-bottom: ${pxToRem(40)};
`

export const Title = styled(Typography)`
  margin: ${pxToRem(40)} 0;
`

export const VerificationFieldContainer = styled(Box)`
  @media (max-width: 1024px) {
    gap: ${pxToRem(16)};
  }
`

export const Label = styled(Typography)<{ hasError: boolean }>`
  ${(props) =>
    props.hasError &&
    css`
      color: ${props.theme.colors.utility.danger['100']};
    `}
`

export const VerificationField = styled(Input)`
  input {
    text-align: center;
    padding: ${pxToRem(4)} ${pxToRem(8)};
    border-radius: ${pxToRem(8)};
    font-size: ${pxToRem(28)};
    font-weight: bold;
    background: ${(props) => props.theme.colors.brand.primary['3']};

    &:focus {
      padding: ${pxToRem(4)} ${pxToRem(8)} !important;
    }
  }
`

export const SignInButton = styled(Button)`
  margin: ${pxToRem(48)} 0;

  @media (max-width: 1024px) {
    margin: ${pxToRem(40)} 0;
  }
`
