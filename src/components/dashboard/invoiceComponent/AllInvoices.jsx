import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { BASE_URL } from '../../../../globals'
import axios from 'axios'

function AllInvoices() {
  const { user, companyId } = useAuth()
  const [invoices, setInvoices] = useState([])

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/invoices/company/${companyId}`)
      setInvoices(response.data)
      console.table(response.data)
    } catch (error) {
      console.error('Error fetching invoices:', error)
    }
  }

  useEffect(() => {
    if (companyId) {
      fetchInvoices()
    }
  }, [companyId]) // ✅ rerun when companyId is available

  return (
    <>
      <div>
        <h2>All Invoices</h2>
        <p>Manage and view all your invoices in one place.</p>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Invoice Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.title}</td>
              <td>{invoice.description}</td>
              <td>{new Date(invoice.date).toISOString().split("T")[0]}</td>    
              <td className='drop'>
                <i className="bi bi-three-dots"></i>
                <div className="drop-down">
                  <ul>
                    <Link 
                        to={`/invoices/invoice-details/${invoice.id}`}
                        state={{ invoiceId: invoice.id, invoiceTitle: invoice.title, invoiceDescription: invoice.description, invoiceDate: invoice.date }}
                    >

                      <li><i className="bi bi-eye"></i> View</li>
                    </Link>
                    <li><i className="bi bi-pencil-square"></i> Edit</li>
                    <li><i className="bi bi-trash"></i> Delete</li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default AllInvoices
