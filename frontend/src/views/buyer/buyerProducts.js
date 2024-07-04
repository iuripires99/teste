import React, { useState } from "react";
import "../../App.css";
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BuyerProductList = () => {
    const [lgShow, setLgShow] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleShow = (productName) => {
        setSelectedProduct(productName);
        setLgShow(true);
    };

    const handleClose = () => {
        setLgShow(false);
        setSelectedProduct(null);
    };

    return (
        <div className="dashboard-content bg-light w-100 h-100">
            <div className="d-flex justify-content-between p-2 mx-3">
                <h2 className="title my-2">Products</h2>
            </div>
            <BoxProgress props={result} handleShow={handleShow} />
            <AddManagerModal
                show={lgShow}
                onHide={handleClose}
                productName={selectedProduct}
            />
        </div>
    );
};

const AddManagerModal = ({ show, onHide, productName }) => (
    <Modal
        size="lg"
        show={show}
        onHide={onHide}
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
                        <label htmlFor="productinput">Product</label>
                        <input
                            type="text"
                            className="form-control"
                            id="productinput"
                            value={productName || ''}
                            readOnly
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="manageremailinput">E-mail</label>
                        <input type="text" className="form-control" id="manageremailinput" placeholder="E-mail" />
                    </div>
                </div>
                <button type="submit" className="btn btn-info text-white">Add</button>
            </form>
        </Modal.Body>
    </Modal>
);

const ProgressDiv = ({ nome, numeroAtivos, numeroTotal, percentage }) => (
    <div className="mb-3">
        <div className="d-flex justify-content-between">
            <p>
                <strong>{nome}</strong>
            </p>
            <div className="d-flex">
                <p>
                    {numeroAtivos} of {numeroTotal}
                </p>
            </div>
        </div>
        <div className="progress">
            <div
                className="progress-bar bg-info"
                role="progressbar"
                style={{ width: `${percentage}%` }}
                aria-valuenow={percentage}
                aria-valuemin="0"
                aria-valuemax="100"
            >
                {percentage}%
            </div>
        </div>
    </div>
);

const ProgressDivs = ({ resultado, handleShow }) => {
    const getStatusClass = (status) => {
        switch (status) {
            case "Outdated":
                return "text-outdated";
            case "Disabled":
                return "text-disabled";
            case "Updated":
                return "text-updated";
            default:
                return "";
        }
    };

    return (
        <div className="col-12">
            <div className="w-100 d-flex p-3 border-bottom">
                <div className="col-2 mx-2">
                    <h5>Name</h5>
                </div>
                <div className="col-1 mx-2">
                    <h5>Status</h5>
                </div>
                <div className="col-3 mx-2">
                    <h5>Installs</h5>
                </div>
                <div className="col-4 mx-2"></div>
            </div>
            {resultado.map((item, index) => (
                <div className="d-flex col-12 p-3 border-bottom" key={index}>
                    <div className="col-2 mx-2 d-flex ">
                        <h5 className="my-auto">{item[0]}</h5>
                    </div>
                    <div className="col-1 mx-2 d-flex">
                        <p className={`my-auto ${getStatusClass(item[3])}`}>{item[3]}</p>
                    </div>
                    <div className="col-3 mx-2">
                        <ProgressDiv
                            key={index}
                            numeroAtivos={item[2]}
                            numeroTotal={item[1]}
                            percentage={item.percentage}
                        />
                    </div>
                    <div className="col-5 ms-auto text-end">
                        <button
                            className="col btn btn-outline-info hover m-2"
                            onClick={() => handleShow(item[0])}
                        >
                            Add manager
                        </button>
                        <Link to='/faq' className="col btn btn-outline-info hover m-2">Help</Link>
                        <button className="col btn btn-outline-danger m-2">
                            Cancel Subscription
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

let data = [
    {
        nome: "Adobe Photoshop",
        numeroTotal: 1000,
        numeroAtivos: 750,
        status: "Outdated",
    },
    {
        nome: "Adobe Illustrator",
        numeroTotal: 900,
        numeroAtivos: 500,
        status: "Outdated",
    },
    {
        nome: "Adobe Animate",
        numeroTotal: 900,
        numeroAtivos: 900,
        status: "Disabled",
    },
    {
        nome: "Adobe After Effects",
        numeroTotal: 800,
        numeroAtivos: 500,
        status: "Updated",
    },
    {
        nome: "Adobe After Effects",
        numeroTotal: 800,
        numeroAtivos: 600,
        status: "Updated",
    },
    {
        nome: "Adobe After Effects",
        numeroTotal: 800,
        numeroAtivos: 500,
        status: "Updated",
    },
];

function createDataArrays(data) {
    // Inicia o array de resultados
    let result = [];

    // Percorre os dados e criar sub-arrays
    for (let i = 0; i < data.length; i++) {
        let subArray = [
            data[i].nome,
            data[i].numeroTotal,
            data[i].numeroAtivos,
            data[i].status,
        ];
        result.push(subArray);
    }

     // Devolve o resultado contendo no máximo 4 sub-arrays
    return result;
}

function calculatePercentages(result) {
    // Inicializa o array de resultados
    let resultado = [];

    // Percorre os dados e cria sub-arrays com percentagem
    for (let i = 0; i < result.length; i++) {
        let item = result[i];
        let percentage = (item[2] / item[1]) * 100;
        // Cria um novo objeto com os valores originais e a percentagem calculada
        let newItem = {
            ...item,
            percentage: percentage.toFixed(0), // Fixa a 2 casas decimais
        };
        resultado.push(newItem);
    }

    // Devolve o array de resultados
    return resultado;
}

function BoxProgress({ props, handleShow }) {
    return (
        <div className="box-container bg-white col-auto roundbg d-flex shadow mx-4">
            <div className="col-12">
                <div className="col-12">
                    <ProgressDivs resultado={resultado} handleShow={handleShow} />
                </div>
            </div>
        </div>
    );
}

let result = createDataArrays(data);
let resultado = calculatePercentages(result);

export default BuyerProductList;
