import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const AdminBudgetReply = () => {
    const { idBudget } = useParams();
    const [budget, setBudget] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [statusOptions, setStatusOptions] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [reply, setReply] = useState('');

    useEffect(() => {
        const loadBudgetData = async () => {
            try {
                setIsLoading(true);
                // Fetch budget details
                const budgetResponse = await axios.get(`http://localhost:8080/budget/${idBudget}`);
                setBudget(budgetResponse.data);

                // Fetch status options
                const statusResponse = await axios.get('http://localhost:8080/budgetstatus');
                setStatusOptions(statusResponse.data);

                // Set initial values based on fetched data
                setSelectedStatus(budgetResponse.data.idBudgetStatus);
                setIsLoading(false);
            } catch (error) {
                console.error('Error loading budget:', error);
                setIsLoading(false);
            }
        };

        if (idBudget) {
            loadBudgetData();
        }
    }, [idBudget]);

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/budget/update/${idBudget}`, {
                budgetName: budget.budgetName,
                budgetDescript: reply,
                date: budget.date,
                idBudgetStatus: selectedStatus,
                idCart: budget.idCart,
            });
            alert('Budget updated');
            console.log('Budget updated:', response.data);
            // Optionally update local state or UI after successful save
        } catch (error) {
            alert('Error saving budget:', error);
            console.error('Error saving budget:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    const handleReject = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/budget/update/${idBudget}`, {
                idBudgetStatus: 2,
            });
            alert('Budget rejected!');
        } catch (error) {
            alert('Error rejecting budget:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!budget) {
        return <div>No budget found</div>;
    }

    return (
        <div className="container bg-light w-100 p-2x">
            <div className="container">
                <div className="box-container bg-white roundbg h-100 p-4 shadow">
                    <div className="row border-bottom">
                        <h4 className='text-start'>Budget #{budget.idBudget}</h4>
                        <p className='text-start mt-1'>{formatDate(budget.date)}</p>
                    </div>
                    <div className="row m-2 border-bottom">
                        {budget.cart && (
                            <div className="col-12">
                                <div className="row border-bottom m-2">
                                    <div className="d-flex align-items-center">
                                        <span className='fw-semibold col-4'>Cart Price: {budget.cart.cartPrice}</span>
                                        <span className='col-5 ms-4'><strong>License Number: {budget.cart.licenseNumber}</strong></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='row mt-3'>
                        <h6 className='text-start'>Description</h6>
                        <div className='row'>
                            <span>{budget.budgetDescript}</span>
                        </div>
                    </div>
                    <form className='row d-flex mt-4'>
                        <div className="mb-3 col-8">
                            <label htmlFor="descriptioninput">Reply</label>
                            <textarea
                                className="form-control"
                                id="descriptioninput"
                                rows="3"
                                maxLength="250"
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="mb-3 col">
                            <label htmlFor="statusSelect">Status</label>
                            <select
                                id="statusSelect"
                                className="form-select"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <option value="">Select Status</option>
                                {statusOptions.map(stat => (
                                    <option key={stat.idBudgetStatus} value={stat.idBudgetStatus.toString()}>{stat.budgetStatusDescript}</option>
                                ))}
                            </select>
                            <div className="row d-flex mt-3 justify-content-end">
                                <div className="col-4">
                                    <button type="button" className="btn btn-success hover shadow col-12" onClick={handleSave}>Save</button>
                                </div>
                                <div className="col-4">
                                    <button type="button" className="btn btn-info text-white hover shadow col-12">Send Reply</button>
                                </div>
                                <div className="col-4">
                                    <button type="button" className="btn btn-danger hover shadow col-12" onClick={handleReject}>Reject</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminBudgetReply;
