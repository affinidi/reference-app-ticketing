import { FC } from 'react'
import { useRouter } from 'next/router'

import { BackIcon } from 'assets'

import Container from '../Container/Container'

import * as S from './Header.styled'

export type HeaderProps = {
  title: string
  hasBackIcon?: boolean
  path?: string
}

const Header: FC<HeaderProps> = ({ title, hasBackIcon, path }) => {
  const navigate = useRouter()

  return (
    <Container>
      <S.Container justifyContent='flex-end'>
        {hasBackIcon && (
          <S.IconWrapper
            onClick={() =>
              path ? navigate.push(path) : hasBackIcon ? navigate.back() : null
            }
          >
            <BackIcon />
          </S.IconWrapper>
        )}

        <S.Title variant='h4'>{title}</S.Title>
      </S.Container>
    </Container>
  )
}

export default Header
