import styled from 'styled-components'
import { pxToRem } from 'utils'

export const Ticket = styled.div<{ isValid: boolean }>`
  position: relative;
  height: ${pxToRem(176)};
  padding: ${pxToRem(24)} ${pxToRem(40)};
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 20px,
    rgba(255, 255, 255, 1) 20px,
    rgba(255, 255, 255, 1) calc(100% - 84px),
    rgba(0, 0, 0, 0) calc(100% - 84px)
  );
  filter: drop-shadow(0 4px 29px rgba(0, 0, 0, 0.15));
  border-radius: 15px;
  cursor: pointer;
  
  * {
    cursor: pointer;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    z-index: 2;
  }

  &:before {
    width: ${pxToRem(20)};
    height: 100%;
    position: absolute;
    left: 0;
    background-image: ${(props) =>
      props.isValid
        ? `url(./images/ticket-preview-highlight-blue.svg)`
        : `url(./images/ticket-preview-highlight-gray.svg)`};
    border-radius: 15px 0 0 15px;
  }

  &:after {
    width: ${pxToRem(84)};
    height: 100%;
    position: absolute;
    right: 0;
    background-image: ${(props) =>
      props.isValid
        ? `url(./images/watermark-blue.svg)`
        : `url(./images/watermark-gray.svg)`};
    border-radius: 0 15px 15px 0;
  }
`
