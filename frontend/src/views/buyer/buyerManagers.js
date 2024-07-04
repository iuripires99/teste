import React, { useState } from 'react';
import '../../App.css';
import ManagersList from '../../components/buyer/ManagersList';
import Select from 'react-select';
import { Modal } from 'react-bootstrap';

const BuyerManagersList = () => {
    const [lgShow, setLgShow] = useState(false);
    const [modal, setmodal] = useState(null);

    const managersList = [
        ['Luana Meneguci', '123456789', 'luanameneguci@gmail.com', 'Adobe Photoshop'],
        ['Andre Pascoal', '123456789', 'luanameneguci@gmail.com', 'Adobe Photoshop'],
        ['Luana Meneguci', '123456789', 'luanameneguci@gmail.com', 'Adobe Photoshop'],
        ['Luana Meneguci', '123456789', 'luanameneguci@gmail.com', 'Adobe Photoshop'],
        ['Luana Meneguci', '123456789', 'luanameneguci@gmail.com', 'Adobe Photoshop'],
        ['Luana Meneguci', '321321321', 'luanameneguci@gmail.com', 'Adobe Photoshop'],
    ];

    const productList = [
        { value: 'Photoshop', label: 'Photoshop' },
        { value: 'Figma', label: 'Figma' },
        { value: 'VS Code', label: 'VS Code' }
    ];

    const handleShow = (modal) => {
        setmodal(modal);
        setLgShow(true);
    };

    const handleClose = () => {
        setLgShow(false);
        setmodal(null);
    };

    return (
        <div className="container bg-light w-100 h-100">
            <div className='d-flex justify-content-between p-2 mx-4'>
                <h4 className="title my-2 mx-3">Managers</h4>
                <button
                    onClick={() => handleShow(modal)}
                    className="btn btn-block btn-lg text-info hover1 mx-3"
                    style={{ backgroundColor: "#C8F2FE" }}
                >
                    <strong>Add Manager</strong>
                </button>
            </div>
            <ManagersList managersList={managersList} />
            <Modal
                size="mg"
                show={lgShow}
                onHide={handleClose}
                aria-labelledby="addmanager"
                style={{ padding: '10px' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Manager</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="col">
                            <div className="form-group mb-3">
                                <label htmlFor="manageremailinput">E-mail</label>
                                <input type="text" className="form-control" id="manageremailinput" placeholder="E-mail" />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="packagesinput">Add Products</label>
                                <Select
                                    id="productsinput"
                                    options={productList}
                                    isMulti
                                    placeholder="Choose Products..."
                                    className="form-control p-0"
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-info text-white">Add</button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default BuyerManagersList;