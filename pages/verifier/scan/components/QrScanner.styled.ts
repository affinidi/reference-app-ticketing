import styled from 'styled-components'

export const Overlay = styled.div`
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 84px solid rgba(70, 78, 102, 0.7);
  }
`
