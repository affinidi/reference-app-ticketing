import { FC } from 'react'
import { Formik } from 'formik'

import { Container, Header, Input, Textarea } from 'components'
import { JSON_SCHEMA_URL } from 'utils'

import { initialValues, useCredentialForm } from './useCredentialForm'
import * as S from './CredentialForm.styled'


const CredentialForm: FC = () => {
  const { handleSubmit, validate, isCreating } = useCredentialForm()

  return (
    <>
      <Header title="Enter details" />

      <Container>
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-3">
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
              {(formikProps) => (
                <form id="form" onSubmit={formikProps.handleSubmit}>
                  <S.Title variant="p1">
                    Please fill in the form below to issue a credential.
                  </S.Title>

                  <Input label="Schema URL" value={JSON_SCHEMA_URL} disabled />

                  <S.Heading variant="h6">Event details</S.Heading>

                  <div className="grid lg:grid-cols-2 lg:gap-x-8">
                    <S.InputWrapper
                      label="Event name"
                      placeholder="Enter event name"
                      name="eventName"
                      maxLength={100}
                      value={formikProps.values.eventName}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={formikProps.touched.eventName ? Boolean(formikProps.errors.eventName) : false}
                      helpText={formikProps.touched.eventName ? formikProps.errors.eventName : ''}
                      onBlur={formikProps.handleBlur}
                    />
                    <S.InputWrapper
                      label="Event location"
                      placeholder="Enter event location"
                      name="eventLocation"
                      maxLength={500}
                      value={formikProps.values.eventLocation}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={formikProps.touched.eventLocation ? Boolean(formikProps.errors.eventLocation) : false}
                      helpText={formikProps.touched.eventLocation ? formikProps.errors.eventLocation : ''}
                      onBlur={formikProps.handleBlur}
                    />
                    <S.InputWrapper
                      label="Start date & time"
                      name="eventStartDateTime"
                      type="datetime-local"
                      value={formikProps.values.eventStartDateTime}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={formikProps.touched.eventStartDateTime ? Boolean(formikProps.errors.eventStartDateTime) : false}
                      helpText={formikProps.touched.eventStartDateTime ? formikProps.errors.eventStartDateTime : ''}
                      onBlur={formikProps.handleBlur}
                    />
                    <S.InputWrapper
                      label="End date & time"
                      name="eventEndDateTime"
                      type="datetime-local"
                      value={formikProps.values.eventEndDateTime}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={formikProps.touched.eventEndDateTime ? Boolean(formikProps.errors.eventEndDateTime) : false}
                      helpText={formikProps.touched.eventEndDateTime ? formikProps.errors.eventEndDateTime : ''}
                      onBlur={formikProps.handleBlur}
                    />
                    <Textarea
                      label="Event description"
                      name="eventDescription"
                      placeholder="Enter event description"
                      maxLength={1000}
                      value={formikProps.values.eventDescription}
                      onChange={(value, e) => formikProps.handleChange(e)}
                      hasError={formikProps.touched.eventDescription ? Boolean(formikProps.errors.eventDescription) : false}
                      helpText={formikProps.touched.eventDescription ? formikProps.errors.eventDescription : ''}
                      onBlur={formikProps.handleBlur}
                    />
                  </div>

                  <S.Heading variant="h6">Ticket holder information</S.Heading>

                  <div className="grid lg:grid-cols-2 lg:gap-x-8">
                    <S.InputWrapper
                      label="Ticket holder name"
                      name="name"
                      maxLength={100}
                      placeholder="Enter ticket holder name"
                      value={formikProps.values.name}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={formikProps.touched.name ? Boolean(formikProps.errors.name) : false}
                      helpText={formikProps.touched.name ? formikProps.errors.name : ''}
                      onBlur={formikProps.handleBlur}
                    />
                    <S.InputWrapper
                      label="Ticket holder email"
                      name="email"
                      type="email"
                      placeholder="Enter ticket holder email"
                      maxLength={100}
                      value={formikProps.values.email}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={formikProps.touched.email ? Boolean(formikProps.errors.email) : false}
                      helpText={formikProps.touched.email ? formikProps.errors.email : ''}
                      onBlur={formikProps.handleBlur}
                    />
                  </div>

                  <S.ButtonWrapper
                    type="submit"
                    form="form"
                    disabled={!(formikProps.isValid && formikProps.dirty)}
                    loading={isCreating}
                  >
                    Issue ticket
                  </S.ButtonWrapper>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </Container>
    </>
  )
}

export default CredentialForm;
