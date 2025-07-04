import React from 'react'

function AllInvoices() {
  return (
    <>
    <div>
        <h2>All Invoice</h2><br />
        <p>Manage and view all your invoices in one place.</p>
    </div>

        <table className="table">
            <tr>
                <th>Invoice Id</th>
                <th>Client Name</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Action</th>
            </tr>
            <br /><br />
            <tr>
                <td>INV-001</td>
                <td>John Doe</td>
                <td>$500.00</td>
                <td><span className="status paid">Paid</span></td>
                <td>2025-05-01</td>
                <td className='drop'>
                    <i className="bi bi-three-dots"></i>
                    <div className="drop-down">
                        <ul>
                            <li><i className="bi bi-eye"></i> View</li>
                            <li><i className="bi bi-pencil-square"></i> Edit</li>
                            <li><i className="bi bi-trash"></i> Delete</li>
                        </ul>
                    </div>
                </td>
            </tr>
        </table>

    </>
  )
}

export default AllInvoices