import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import ClientListBox from '../../components/admin/ClientListBox';

const AdminClientList = () => {
    const [clientList, setClientList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [managerResponse, buyerResponse] = await Promise.all([
                    axios.get('http://localhost:8080/manager'),
                    axios.get('http://localhost:8080/buyer')
                ]);

                const managers = managerResponse.data.map(manager => [
                    manager.managerName, 
                    manager.managerNif, 
                    manager.managerEmail, 
                    'Manager',
                    manager.idManager,
                ]);

                const buyers = buyerResponse.data.map(buyer => [
                    buyer.buyerName, 
                    buyer.buyerNif, 
                    buyer.buyerEmail,
                    'Buyer',
                    buyer.idBuyer,
                ]);

                const combinedList = [...managers, ...buyers];
                setClientList(combinedList);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard-content bg-light w-100">
            <h4 className="title my-2 mx-4">Clients</h4>
            <div className="container">
                <div className="my-4">
                    <ClientListBox clientList={clientList} />
                </div>
            </div>
        </div>
    );
}

export default AdminClientList;
