import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import notificationicon from "../../images/notification.png";

// Função auxiliar para formatar a data
const formatDateString = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
};

// Função getStatusClass para retornar classes CSS com base no status
const getStatusClass = (status) => {
    switch (status) {
        case "Unsolved":
            return "text-danger";
        case "Solved":
            return "text-success";
        case "Waiting":
            return "text-primary";
        case "New":
            return "text-warning";
        default:
            return "";
    }
};

// Conteúdo de exemplo para a tabela de tickets
const ticketboxcontent = [
    [1, 'Maquina Pifou', '13/12/2022', 'Solved'],
    [2, 'Chatbot Avariou', '15/06/2024', 'New'],
    [3, 'Não sei', '13/06/2024', 'Waiting'],
    [4, 'João Ratão', '13/06/2024', 'Unsolved'],
    [5, 'João Ratão', '13/06/2024', 'New'],
    [6, 'João Ratão', '13/06/2024', 'New'],
    [7, 'João Ratão', '13/06/2024', 'New'],
    [8, 'João Ratão', '13/06/2024', 'New'],
    [9, 'João Ratão', '22/06/2024', 'New'],
    [10, 'João Ratão', '13/06/2024', 'New'],
    [11, 'João Ratão', '13/06/2024', 'New'],
    [12, 'João Ratão', '13/06/2024', 'New'],
    [13, 'João Ratão', '13/06/2024', 'New'],
    [14, 'João Ratão', '13/06/2024', 'New'],
    [15, 'João Ratão', '31/06/2024', 'New'],
    [16, 'João Ratão', '13/06/2024', 'New'],
    [17, 'João Ratão', '13/06/2024', 'New'],
    [18, 'João Ratão', '13/06/2024', 'New'],
    [1, 'Maquina Pifou', '13/12/2022', 'Solved'],
    [2, 'Chatbot Avariou', '15/06/2024', 'New'],
    [3, 'Não sei', '13/06/2024', 'Waiting'],
    [4, 'João Ratão', '13/06/2024', 'Unsolved'],
    [5, 'João Ratão', '13/06/2024', 'New'],
    [6, 'João Ratão', '13/06/2024', 'New'],
    [7, 'João Ratão', '13/06/2024', 'New'],
    [8, 'João Ratão', '13/06/2024', 'New'],
    [9, 'João Ratão', '22/06/2024', 'New'],
    [10, 'João Ratão', '13/06/2024', 'New'],
    [11, 'João Ratão', '13/06/2024', 'New'],
    [12, 'João Ratão', '13/06/2024', 'New'],
    [13, 'João Ratão', '13/06/2024', 'New'],
    [14, 'João Ratão', '13/06/2024', 'New'],
    [15, 'João Ratão', '31/06/2024', 'New'],
    [16, 'João Ratão', '13/06/2024', 'New'],
    [17, 'João Ratão', '13/06/2024', 'New'],
    [18, 'João Ratão', '13/06/2024', 'New'],
    [1, 'Maquina Pifou', '13/12/2022', 'Solved'],
    [2, 'Chatbot Avariou', '15/06/2024', 'New'],
    [3, 'Não sei', '13/06/2024', 'Waiting'],
    [4, 'João Ratão', '13/06/2024', 'Unsolved'],
    [5, 'João Ratão', '13/06/2024', 'New'],
    [6, 'João Ratão', '13/06/2024', 'New'],
    [7, 'João Ratão', '13/06/2024', 'New'],
    [8, 'João Ratão', '13/06/2024', 'New'],
    [9, 'João Ratão', '22/06/2024', 'New'],
    [10, 'João Ratão', '13/06/2024', 'New'],
    [11, 'João Ratão', '13/06/2024', 'New'],
    [12, 'João Ratão', '13/06/2024', 'New'],
    [13, 'João Ratão', '13/06/2024', 'New'],
    [14, 'João Ratão', '13/06/2024', 'New'],
    [15, 'João Ratão', '31/06/2024', 'New'],
    [16, 'João Ratão', '13/06/2024', 'New'],
    [17, 'João Ratão', '13/06/2024', 'New'],
    [18, 'João Ratão', '13/06/2024', 'New'],
];

const TicketListBox = () => {
    // Estados para controlo de modais e tickets selecionados
    const [lgShow, setLgShow] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    // Estados para filtros
    const [ticketId, setTicketId] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(null); // Alterado para null para DatePicker
    const [status, setStatus] = useState('');

    // Estado para paginação
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(20);

    const handleShow = (ticket) => {
        setSelectedTicket(ticket);
        setLgShow(true);
    };

    // Filtragem dos tickets com base nos valores de entrada
    const filteredRows = ticketboxcontent.filter(row => {
        const rowDate = formatDateString(row[2]);
        return (
            row[0].toString().includes(ticketId.toString()) &&
            row[1].toLowerCase().includes(title.toLowerCase()) &&
            (!date || rowDate >= date) && // Comparar rowDate com a data selecionada
            row[3].toLowerCase().includes(status.toLowerCase())
        );
    });

    // Calcular a paginação
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

    // Alterar página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Função para obter a cor do status com base no valor do status
    const getStatusColor = (status) => {
        switch (status) {
            case 'New':
                return '#FFD56D'; // amarelo
            case 'Unsolved':
                return '#EB5757'; // vermelho
            case 'Solved':
                return '#00B69B'; // verde
            case 'Waiting':
                return '#2D9CDB'; // azul
            default:
                return 'inherit'; // cor padrão
        }
    };

    return (
        <div className="container d-flex px-0 roundbg h-100 pb-3 bg-white shadow">
            <div className="container px-0 roundbg h-100">
                <table className='table text-start my-0'>
                    <thead className='text-white pt-2'>
                        <tr>
                            <th>Ticket</th>
                            <th>Título</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((ticket, rowIndex) => (
                            <tr key={rowIndex}>
                                {ticket.map((data, colIndex) => {
                                    let color = 'inherit';
                                    if (colIndex === 3) {
                                        // Aplicar cor do status com base na função getStatusColor
                                        color = getStatusColor(data);
                                    }
                                    return (
                                        <td key={colIndex} className='ps-3' style={{ color }}>
                                            {data}
                                        </td>
                                    );
                                })}
                                <td className='text-center'>
                                    <button className='btn btn-outline-warning' onClick={() => handleShow(ticket)}>Ver mais</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                {/* Mostrar o seletor de página se filteredRows.length for maior que rowsPerPage */}
                {filteredRows.length > rowsPerPage && (
                    <nav aria-label="..." className='ms-3 mt-4'>
                        <ul className="pagination">
                            {Array(Math.ceil(filteredRows.length / rowsPerPage)).fill().map((_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <a className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</a>
                                </li>
                            ))}
                            <li className="page-item">
                                <a className="page-link" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredRows.length / rowsPerPage)}>Próximo</a>
                            </li>
                        </ul>
                    </nav>
                )}

                {/* Modal para exibir os detalhes do ticket selecionado */}
                <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="ticketedit"
                    style={{ padding: '10px' }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Ticket #{selectedTicket ? selectedTicket[0] : ''}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedTicket && (
                            <form>
                                <div className='container'>
                                    <div className="row mb-4">
                                        <div className="col-3 text-body-secondary">DATA</div>
                                        <div className="col-9">{selectedTicket[2]}</div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-3 text-body-secondary">DESCRIÇÃO</div>
                                        <div className="col-9">
                                            Lorem Ipsum é simplesmente texto fictício da indústria de impressão e composição. Lorem Ipsum tem sido o texto fictício padrão da indústria desde os anos 1500.
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-3 text-body-secondary">ANEXOS</div>
                                        <div className="col-9">
                                            <div className="row">
                                                <div className="col-4 d-flex flex-column text-center fw-medium">
                                                    Impressões
                                                    <img src={notificationicon} className='ticket-print mx-auto mt-1' alt="Impressões" />
                                                </div>
                                                <div className="col-4 d-flex flex-column text-center fw-medium">
                                                    Impressões
                                                    <img src={notificationicon} className='ticket-print mx-auto mt-1' alt="Impressões" />
                                                </div>
                                                <div className="col-4 d-flex flex-column text-center fw-medium">
                                                    Impressões
                                                    <img src={notificationicon} className='ticket-print mx-auto mt-1' alt="Impressões" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-3 text-body-secondary">STATUS</div>
                                        <div className="col-4" style={{ color: getStatusColor(selectedTicket[3]) }}>
                                            {selectedTicket[3]}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

// Faz o display da TicketListBox
const ManagerTicketList = () => {
    return (
        <div className="dashboard-content bg-light w-100">
            <h4 className="title my-2 mx-4">Tickets</h4>
            <div className="container">
                <div className="my-4">
                    <TicketListBox />
                </div>
            </div>
        </div>
    );
};

export default ManagerTicketList;
