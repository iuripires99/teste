import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};


function BudgetList({ numRowsToShow }) {
    const [budgets, setBudgets] = useState([]);
    const [budgetIdFilter, setBudgetIdFilter] = useState('');
    const [dateFilter, setDateFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);


/*find buyer cart*/
function useBuyerCart() {
    const [idCart, setCartId] = useState(0);
  
    useEffect(() => {
      const fetchCartId = async () => {
        try {
          const url = "http://localhost:8080/cart/findByBuyer/1";
          const res = await axios.get(url);
          if (res.status === 200) {
            const data2 = res.data;
            setCartId(data2.idCart);
          } else {
            alert("Error Web Service!");
          }
        } catch (error) {
         
        }
      };
  
      fetchCartId();
    }, []);
  
    return idCart;
   
  }
  useBuyerPendingBudgets()
  function useBuyerPendingBudgets() {
    const idCart = useBuyerCart();
    
    useEffect(() => {
      const fetchBudgets = async () => {
        try {
          const url = "http://localhost:8080/budget/findByCart/" + idCart;
          const res = await axios.get(url);
          if (res.status === 200) {
            const data3 = res.data; 
           
            setBudgets(data3);
            console.log(budgets);
          } else {
            alert("Error Web Service!");
          }
        } catch (error) {
         
        }
      };
  
      if (idCart !== 0) {
        fetchBudgets();
      }
    }, [idCart]);
  
  }
    const filteredBudgets = budgets.filter(budget => {
        const budgetDate = new Date(budget.date);
        return (
            budget.idBudget.toString().includes(budgetIdFilter) &&
            
            (!dateFilter || budgetDate >= dateFilter) &&
           
            budget.budgetStatus.budgetStatusDescript.toLowerCase().includes(statusFilter.toLowerCase())
        );
    });
   
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBudgets = filteredBudgets.slice(indexOfFirstItem, indexOfLastItem);
    

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredBudgets.length / itemsPerPage); i++) {
        pageNumbers.push(
            <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(i)}>{i}</button>
            </li>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'New':
                return '#FFD56D'; // yellow
            case 'Rejected':
                return '#EB5757'; // red
            case 'Solved':
                return '#00B69B'; // green
            case 'Waiting':
                return '#2D9CDB'; // blue
            default:
                return 'inherit';
        }
    };

    return (
        <div className="px-0 roundbg h-100 pb-3 bg-white shadow mx-0 col-12">
          
            <div className=" px-0 roundbg h-100 mx-0 row col-12">
                <table className='table text-start my-0'>
                    <thead className='text-white'>
                        <tr>
                            {numRowsToShow < 20 ? (
                                <>
                                    <th style={{ width: '10%' }}>Ticket</th>
                                    <th>Title</th>
                                    <th>Date</th>
                                    <th>Department</th>
                                    <th className='w-10'>Priority</th>
                                    <th className='w-10'>Status</th>
                                    <th>Action</th>
                                </>
                            ) : (
                                <>
                                    <th>
                                        Budget
                                        <input
                                            className="form-control w-75"
                                            type="number"
                                            placeholder="Search"
                                            value={budgetIdFilter}
                                            onChange={(e) => setBudgetIdFilter(e.target.value)}
                                        />
                                    </th>
                                    
                                    <th>
                                        Date
                                        <DatePicker
                                            selected={dateFilter}
                                            onChange={(date) => setDateFilter(date)}
                                            className="form-control w-75"
                                            placeholderText="Select date"
                                        />
                                    </th>
                                    <th>
                                        Status
                                        <input
                                            className="form-control w-75"
                                            type="text"
                                            placeholder="Search"
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                        />
                                    </th>
                                   
                                  
                                    <th className='text-center align-text-top pt-3'>Action</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        
                        {currentBudgets.map((budget, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className='ps-3' style={{ width: '10%' }}>{budget.idBudget}</td>
                                
                                <td>{formatDate(budget.
                                    date)}</td>

                                <td style={{ color: getStatusColor(budget.budgetStatus.budgetStatusDescript) }}>{budget.budgetStatus.budgetStatusDescript}</td>
                                <td className='text-center'>
                                 <Link to={`/ticketreply/${budget.idTicket}`} className='btn btn-outline-warning' onClick={() => console.log(budget.idTicket)}>
                                        See more
                                    </Link> 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {numRowsToShow === 20 && (
                    <nav aria-label="..." className='mt-3 mb-0 d-flex justify-content-center'>
                        <ul className="pagination">
                            {pageNumbers}
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    );
}


export default BudgetList;
