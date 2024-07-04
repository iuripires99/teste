import React from 'react';
import '../../App.css';
import BoughtList from "../../components/buyer/BoughtList";

const list = [
    1, 'Software 1', '01-02-2024', 'Amount', 'Price',
    1, 'Software 1', '01-02-2024', 'Amount', 'Price',
    1, 'Software 1', '01-02-2024', 'Amount', 'Price',
    1, 'Software 1', '01-02-2024', 'Amount', 'Price',
    1, 'Software 1', '01-02-2024', 'Amount', 'Price',
    1, 'Software 1', '01-02-2024', 'Amount', 'Price',
    1, 'Software 1', '01-02-2024', 'Amount', 'Price',
    1, 'Software 1', '01-02-2024', 'Amount', 'Price',
];

const rows = [];
const itemsPerRow = 5;

// Itera sobre a lista 'list' com incrementos de 'itemsPerRow' para criar linhas de dados.
for (let i = 0; i < list.length; i += itemsPerRow) {
     // Extrai um subarray da 'list' com 'itemsPerRow' elementos e adiciona à matriz 'rows'.
    rows.push(list.slice(i, i + itemsPerRow));
}


const BuyerPurchasesList = () => {
    return (
        <div className="dashboard-content bg-light w-100 h-100">
            <div className='d-flex justify-content-between p-2 mx-3'>
                <h4 className="title my-2 ">Purchases</h4>
            </div>
            <BoughtList rows={rows}/>
        </div>

    );
}

export default BuyerPurchasesList;
