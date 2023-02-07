import styled, { css } from 'styled-components'

import { pxToRem } from 'utils'
import { Theme } from 'utils/theme'

import Typography from '../Typography/Typography'

type Props = {
  $hasError?: boolean
  $disabled?: boolean
  theme: Theme
}

const getTextColor = (props: Props) => {
  if (props.$hasError) {
    return props.theme.colors.utility.danger['100']
  }

  if (props.$disabled) {
    return props.theme.colors.neutral.primary['30']
  }

  return ''
}

export const Label = styled(Typography)<{ $hasError?: boolean; $disabled?: boolean }>`
  color: ${getTextColor};
`

export const Textarea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  height: ${pxToRem(130)};
  padding: ${pxToRem(10)} ${pxToRem(16)};
  border: 1px solid transparent;
  background: ${(props) => props.theme.colors.neutral.secondary['100']};
  font-family: 'Open Sans', sans-serif;
  font-weight: 500;
  font-size: ${pxToRem(16)};
  border-radius: 4px;
  line-height: ${pxToRem(22)};
  letter-spacing: 0.2px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'text')};
  transition: all 0.125s ease-in-out;
  outline: none;
  resize: none;
  border: 1px solid ${(props) => props.theme.colors.neutral.primary['15']};

  ${(props) =>
    props.$hasError &&
    css`
      color: ${props.theme.colors.utility.danger['100']};
      padding: ${pxToRem(15)} ${pxToRem(11)};
      border: 2px solid ${props.theme.colors.utility.danger['100']};
    `}
  ${(props) =>
    !props.$hasError &&
    css`
      &:not([disabled]) {
        &:hover,
        &:focus {
          border: 1px solid ${props.theme.colors.brand.primary['90']};
        }
      }
    `}
  ::placeholder {
    font-weight: 500;
    color: ${(props) => props.theme.colors.neutral.primary['30']};
  }

  &[disabled] {
    color: ${(props) => props.theme.colors.neutral.primary['30']};
  }
`

export const HelpText = styled(Typography)<{ $hasError?: boolean; $disabled?: boolean }>`
  color: ${getTextColor};
`
