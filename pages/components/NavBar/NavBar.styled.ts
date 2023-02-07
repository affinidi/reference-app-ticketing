import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Box } from 'components'

export const Container = styled(Box)`
  padding: ${pxToRem(20)} 0;
  height: ${pxToRem(64)};

  @media (min-width: 1024px) {
    padding: ${pxToRem(22)} 0;
    height: ${pxToRem(72)};
  }
`

export const ButtonContainer = styled.div`
  margin-bottom: ${pxToRem(24)};

  * {
    cursor: pointer;
    text-decoration: none;
    color: ${(props) => props.theme.colors.neutral.secondary['100']};
  }
`

export const Logo = styled.div`
  svg {
    width: ${pxToRem(100)};
    height: ${pxToRem(24)};
  }

  @media (max-width: 1024px) {
    svg {
      width: ${pxToRem(139)};
      height: ${pxToRem(32)};
    }
  }
`

export const IconWrapper = styled.div`
  cursor: pointer;

  path {
    fill: ${(props) => props.theme.colors.brand.primary['100']};
  }
`

export const Content = styled(Box)`
  padding: ${pxToRem(100)};

  @media (max-width: 1024px) {
    padding: ${pxToRem(76)} ${pxToRem(24)} ${pxToRem(24)};
  }
`
