import React from 'react';
import '../../App.css';
import BudgetList from '../../components/buyer/BudgetList'

const numRowsToShow = 20;

const BuyerBudgetList = () => {
    return (
        <div className="dashboard-content bg-light w-100" >
            <h3 className="title my-2 mx-4">Budgets</h3>
            <div className="container text-center">
                <div className="mx-2 mt-4">
                    <div className="col-12">
                        <BudgetList numRowsToShow={numRowsToShow} />
                    </div>
                </div>
            </div>
        </div >

    );
}

export default BuyerBudgetList;
