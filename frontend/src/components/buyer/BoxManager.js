// BoxManager.jsx

import React from 'react';

const BoxManager = ({ buyerData }) => {
  // Ensure buyerData is not null or undefined before accessing managers
  if (!buyerData || !buyerData.managers || buyerData.managers.length === 0) {
    return (
      <div>
        <h2>Manager Names:</h2>
        <p>No managers found</p>
      </div>
    );
  }

  // Extract manager names
  const managerNames = buyerData.managers.map(manager => manager.managerName);

  return (
    <div className='col-12 bg-white roundbg h-100 shadow'>
      <h4 className='text-start p-3'>Managers</h4>
      <ul className='p-0'>
        {managerNames.map((name, index) => (
          <li key={index} className='list-group-item border-bottom py-2 col-11 mx-auto'><strong><h5>{name}</h5></strong></li>
        ))}
      </ul>
    </div>
  );
};

export default BoxManager;
