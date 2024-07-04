import React, { useState } from "react"; // Importa React e o hook useState do pacote "react"
import { Link } from 'react-router-dom'; // Importa Link do React Router para navegação

const ManagerProductList = () => {
    // Variáveis de estado
    const [lgShow, setLgShow] = useState(false); // Estado para controlar a visibilidade do modal
    const [selectedProduct, setSelectedProduct] = useState(null); // Estado para guardar os dados do produto selecionado
    const [currentPage, setCurrentPage] = useState(1); // Estado para controlar o número da página atual
    const [rowsPerPage] = useState(5); // Número de linhas por página

    // Função para mostrar o modal e definir o produto selecionado
    const handleShow = (productName) => {
        setSelectedProduct(productName); // Define o nome do produto selecionado
        setLgShow(true); // Mostra o modal
    };

    // Função para esconder o modal e redefinir o produto selecionado
    const handleClose = () => {
        setLgShow(false); // Esconde o modal
        setSelectedProduct(null); // Redefine o produto selecionado
    };

    // Dados de exemplo representando produtos
    let data = [
        {
            nome: "Adobe Photoshop",
            status: "Outdated",
        },
        {
            nome: "Adobe Illustrator",
            status: "Outdated",
        },
        {
            nome: "Adobe Animate",
            status: "Disabled",
        },
        {
            nome: "Adobe After Effects",
            status: "Updated",
        },
        {
            nome: "Adobe After Effects",
            status: "Updated",
        },
        {
            nome: "Adobe After Effects",
            status: "Updated",
        },
        {
            nome: "Adobe After Effects",
            status: "Updated",
        },
        {
            nome: "Adobe After Effects",
            status: "Updated",
        },
        {
            nome: "Adobe After Effects",
            status: "Updated",
        },
        {
            nome: "Adobe After Effects",
            status: "Updated",
        },
        {
            nome: "Adobe After Effects",
            status: "Updated",
        },
        {
            nome: "Adobe After Effects",
            status: "Updated",
        },
        {
            nome: "Adobe After Effects",
            status: "Updated",
        },
        {
            nome: "Adobe After Effects",
            status: "Updated",
        },
        {
            nome: "Adobe After Effects",
            status: "Updated",
        },
    ];

    // Função para determinar a classe CSS com base no status do produto
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

    // Calcula quais linhas mostrar na página atual
    const indexOfLastRow = currentPage * rowsPerPage; // index da última linha na página atual
    const indexOfFirstRow = indexOfLastRow - rowsPerPage; // index da primeira linha na página atual
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow); // Guarda as linhas da a página atual

    // Muda pagina atual
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Mostra um alerta com o nome do produto atualizado
    const handleUpdate = (productName) => {
        alert(`${productName} updated successfully`); 
    };

    return (
        <div className="dashboard-content bg-light w-100 h-100">
            {/* Título */}
            <div className="d-flex justify-content-between p-2 mx-3">
                <h2 className="title my-2">Products</h2>
            </div>

            {/* Lista de Produtos */}
            <div className="col-12 bg-white roundbg">
                <div className="w-100 d-flex p-3 border-bottom">
                    <div className="col-3 mx-2">
                        <h5>Name</h5>
                    </div>
                    <div className="col-1 mx-2">
                        <h5>Status</h5>
                    </div>
                    <div className="col-4 mx-2"></div>
                </div>

                {/* Linhas da tabela */}
                {currentRows.map((item, index) => (
                    <div className="d-flex col-12 p-3 border-bottom" key={index}>
                        {/* Nome do Produto */}
                        <div className="col-3 mx-2 d-flex ">
                            <h5 className="my-auto">{item.nome}</h5>
                        </div>

                        {/* Status do Produto */}
                        <div className="col-1 mx-2 d-flex">
                            <p className={`my-auto ${getStatusClass(item.status)}`}>{item.status}</p>
                        </div>

                        {/* Ações */}
                        <div className="col-4 ms-auto text-end">
                            {/* Botão de Atualização */}
                            {item.status === "Outdated" && (
                                <button
                                    className="col btn btn-outline-warning hover m-2"
                                    onClick={() => handleUpdate(item.nome)} // Chama a função handleUpdate ao clicar
                                >
                                    Update
                                </button>
                            )}

                            {/* Vai para a pagina do Produto */}
                            <Link to='/product' className="col btn btn-outline-success hover m-2">See more</Link>

                            {/* Vai para a FAQ */}
                            <Link to='/faq' className="col btn btn-outline-info hover m-2">Help</Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Paginação */}
            {data.length > rowsPerPage && (
                <nav aria-label="...">
                    <ul className="pagination justify-content-end mt-3">
                        {/* Map através do array de paginação */}
                        {Array(Math.ceil(data.length / rowsPerPage)).fill().map((_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default ManagerProductList;
