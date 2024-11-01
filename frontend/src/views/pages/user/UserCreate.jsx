import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CRow,
} from '@coreui/react'
import React from 'react'

function UserCreate() {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('ok')
  }

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Create New User</CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <CFormInput
                  type="text"
                  id="name"
                  label="Name"
                  placeholder="Name"
                  className="mb-2"
                />
                <CFormInput
                  type="text"
                  id="email"
                  label="Email"
                  placeholder="Email"
                  className="mb-2"
                />
                <CFormInput
                  type="password"
                  id="password"
                  label="Password"
                  placeholder="Password"
                  className="mb-2"
                />
                <CFormInput
                  type="password"
                  id="password_confirmation"
                  label="Password Confirmation"
                  placeholder="Password Confirmation"
                  className="mb-3"
                />
                <div className="d-flex justify-content-end">
                  <CButton type="submit" color="primary">
                    Create
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default UserCreate
