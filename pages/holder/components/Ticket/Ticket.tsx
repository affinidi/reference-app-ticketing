import React, { HTMLAttributes } from 'react'
import * as S from './Ticket.styled'

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  isValid: boolean
  children: React.ReactNode
}

export const Ticket: React.FC<BoxProps> = (props) => <S.Ticket {...props} />
