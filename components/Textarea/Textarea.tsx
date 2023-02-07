import React, { forwardRef, TextareaHTMLAttributes } from 'react'

import Box from '../Box/Box'

import * as S from './Textarea.styled'

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label?: string
  variant?: string
  hasError?: boolean
  helpText?: string
  onChange?: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ onChange, hasError, helpText, label, className, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(event.target.value, event)
      }
    }

    return (
      <Box direction="column" gap={4} className={className}>
        {label && (
          <S.Label variant="p4" tag="label" $hasError={hasError} $disabled={props.disabled}>
            {label}
          </S.Label>
        )}

        <S.Textarea
          onChange={handleChange}
          data-testid="textarea"
          $hasError={hasError}
          ref={ref}
          {...props}
        />

        {helpText && (
          <S.HelpText variant="p4" $hasError={hasError} $disabled={props.disabled}>
            {helpText}
          </S.HelpText>
        )}
      </Box>
    )
  },
)

export default Textarea
