import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import UserCreate from './UserCreate'

function UserIndex() {
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Data User</strong>
            </CCardHeader>
            <CCardBody>
              <Link to={'/user/create'} className="btn btn-primary mb-3">
                Create New User
              </Link>
              <CTable>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell scope="col">No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Password</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell>1</CTableDataCell>
                    <CTableDataCell>Agung Kusaeri</CTableDataCell>
                    <CTableDataCell>agung.kusaeri9@gmail.com</CTableDataCell>
                    <CTableDataCell>password123</CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex gap-2">
                        <Link className="btn btn-info text-white">Edit</Link>
                        <Link className="btn btn-danger text-white">Hapus</Link>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default UserIndex
