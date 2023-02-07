import { FC, HTMLAttributes, ReactNode } from 'react'

import * as S from './Container.styled'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  title?: string
}

const Container: FC<ContainerProps> = ({ children, title }) => (
  <S.Container>
    {title && <S.Title variant="p1">{title}</S.Title>}

    {children}
  </S.Container>
)

export default Container
