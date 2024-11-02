import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserCreate from './UserCreate'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Alert from '../../../components/Alert'

function UserIndex() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState([])
  const [pagination, setPagination] = useState({})

  const fetchData = async (searchTerm = '', page = 1) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
        params: { search: searchTerm, page: page, paginate: 10 }, // Sertakan parameter page
      })
      if (response.status === 200) {
        setUsers(response.data.data)
        setPagination(response.data.meta.pagination) // Ambil metadata pagination
      }
    } catch (error) {
      console.log('error ' + error)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${id}`)
      if (response.status === 200) {
        Alert('success', response.data.meta.status, response.data.meta.message)
        fetchData(searchTerm, pagination.current_page) // Panggil fetchData untuk memperbarui data
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value) // Set nilai pencarian
    fetchData(e.target.value) // Panggil fetchData dengan nilai pencarian
  }

  const handlePageChange = (page) => {
    fetchData(searchTerm, page) // Panggil fetchData dengan halaman yang dipilih
  }

  const showingPagination = () => {
    return `Showing ${(pagination.current_page - 1) * pagination.per_page + 1} to${' '}
    ${Math.min(pagination.current_page * pagination.per_page, pagination.total)} of${' '}
    ${pagination.total || 0} entries`
  }

  const showSwal = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id)
      }
    })
  }

  useEffect(() => {
    fetchData(searchTerm)
  }, [searchTerm])

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Data User</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  <Link to={'/user/create'} className="btn btn-primary mb-3">
                    Create New User
                  </Link>
                </CCol>
                <CCol lg={3}>
                  <CFormInput
                    type="text"
                    id="search"
                    placeholder="Search"
                    className="mb-2 w-10"
                    width={20}
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </CCol>
              </CRow>
              <CTable>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {users.length < 1 ? (
                    <CTableRow>
                      <CTableDataCell colSpan={3}>
                        <p className="text-center">User Not Found!</p>
                      </CTableDataCell>
                    </CTableRow>
                  ) : (
                    users.map((user, index) => (
                      <CTableRow key={user.id}>
                        <CTableDataCell>{user.name}</CTableDataCell>
                        <CTableDataCell>{user.email}</CTableDataCell>
                        <CTableDataCell>
                          <div className="d-flex gap-2">
                            <Link to={'/user/edit/' + user.id} className="btn btn-info text-white">
                              Edit
                            </Link>
                            <Link
                              className="btn btn-danger text-white"
                              onClick={() => showSwal(user.id)}
                            >
                              Hapus
                            </Link>
                          </div>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  )}
                </CTableBody>
              </CTable>
              {/* Pagination Control */}
              <CRow className="d-flex justify-content-between align-items-center">
                <CCol>
                  <div>{showingPagination()}</div>
                </CCol>

                <CCol lg={5}>
                  <div className="">
                    <nav aria-label="Page navigation">
                      <ul className="pagination justify-content-end">
                        <li
                          className={`page-item ${pagination.current_page === 1 ? 'disabled' : ''}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(pagination.current_page - 1)}
                            disabled={pagination.current_page === 1}
                          >
                            Previous
                          </button>
                        </li>

                        {/* Menampilkan nomor halaman */}
                        {pagination.current_page > 3 && (
                          <>
                            <li className="page-item">
                              <button className="page-link" onClick={() => handlePageChange(1)}>
                                1
                              </button>
                            </li>
                            {pagination.current_page > 4 && (
                              <li className="page-item disabled">
                                <span className="page-link">...</span>
                              </li>
                            )}
                          </>
                        )}

                        {Array.from({ length: Math.min(3, pagination.last_page) }, (_, index) => {
                          const pageNumber = Math.max(2, pagination.current_page - 2) + index
                          if (pageNumber <= pagination.last_page) {
                            return (
                              <li
                                key={pageNumber}
                                className={`page-item ${pagination.current_page === pageNumber ? 'active' : ''}`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() => handlePageChange(pageNumber)}
                                >
                                  {pageNumber}
                                </button>
                              </li>
                            )
                          }
                          return null
                        })}

                        {pagination.current_page < pagination.last_page - 2 && (
                          <>
                            {pagination.current_page < pagination.last_page - 3 && (
                              <li className="page-item disabled">
                                <span className="page-link">...</span>
                              </li>
                            )}
                            <li className="page-item">
                              <button
                                className="page-link"
                                onClick={() => handlePageChange(pagination.last_page)}
                              >
                                {pagination.last_page}
                              </button>
                            </li>
                          </>
                        )}

                        <li
                          className={`page-item ${pagination.current_page === pagination.last_page ? 'disabled' : ''}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(pagination.current_page + 1)}
                            disabled={pagination.current_page === pagination.last_page}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default UserIndex
