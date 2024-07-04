import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../App.css';


const SalesListBox = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState(null);
    const [saleId, setSaleId] = useState('');
    const [client, setClient] = useState('');
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [bills, setBills] = useState([]);
    const [buyers, setBuyers] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const billResponse = await axios.get('http://localhost:8080/billing');
                setBills(billResponse.data);

                const cartProductResponse = await axios.get('http://localhost:8080/cartProduct');
                setCartProducts(cartProductResponse.data);

                const buyerResponse = await axios.get('http://localhost:8080/buyer');
                setBuyers(buyerResponse.data);

                const productResponse = await axios.get('http://localhost:8080/product');
                setProducts(productResponse.data);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        loadData();
    }, []);

    const handleDateChange = (date) => {
        setStartDate(date);
    };

    const handleSaleIdChange = (e) => {
        setSaleId(e.target.value);
    };

    const handleClientChange = (e) => {
        setClient(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const filteredRows = bills.filter((bill) => {
        // Find corresponding buyer
        const buyer = buyers.find(buyer => buyer.idBuyer === bill.cart.idBuyer);

        // Find corresponding cartProduct
        const cartProduct = cartProducts.find(cp => cp.cartIdCart === bill.idCart);
        const productId = cartProduct ? cartProduct.productIdProduct : null;

        // Find corresponding product
        const product = products.find(prod => prod.idProduct === productId);

        // Date comparison
        const rowDate = new Date(bill.billDate);

        return (
            (!startDate || rowDate >= startDate) &&
            (!saleId || bill.idBill.toString().includes(saleId)) &&
            (!client || (buyer && buyer.buyerName.toLowerCase().includes(client.toLowerCase()))) &&
            (!amount || bill.cart.licenseNumber.toString().toLowerCase().includes(amount.toLowerCase())) &&
            (!price || product.productPrice.toString().includes(price))
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRows.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredRows.length / itemsPerPage); i++) {
        pageNumbers.push(
            <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(i)}>{i}</button>
            </li>
        );
    }

    return (
        <div className="box-container px-0 h-100 shadow roundbg">
            <div className="container bg-white px-0 roundbg">
                <table id="datatable" className='table text-start'>
                    <thead className='text-white'>
                        <tr>
                            <th className="pt-3">Sale ID
                                <input
                                    className="form-control w-75"
                                    id="ticketfilter"
                                    placeholder="Search"
                                    type="number"
                                    value={saleId}
                                    onChange={handleSaleIdChange}
                                />
                            </th>
                            <th>Client
                                <input
                                    className="form-control w-75"
                                    id="titlefilter"
                                    type="text"
                                    placeholder="Search"
                                    value={client}
                                    onChange={handleClientChange}
                                />
                            </th>
                            <th>Date
                                <DatePicker
                                    selected={startDate}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Select Date"
                                    className="form-control w-75"
                                />
                            </th>
                            <th>Products
                                <input
                                    className="form-control w-75"
                                    id="depfilter"
                                    type="text"
                                    placeholder="Search"
                                    value={amount}
                                    onChange={handleAmountChange}
                                />
                            </th>
                            <th>Amount
                                <input
                                    className="form-control w-75"
                                    id="priofilter"
                                    type="number"
                                    placeholder="Search"
                                    value={price}
                                    onChange={handlePriceChange}
                                />
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='text-start'>
                        {currentItems.map((bill, rowIndex) => {
                            const buyer = buyers.find(buyer => buyer.idBuyer === bill.cart.idBuyer);
                            const cartProduct = cartProducts.find(cp => cp.cartIdCart === bill.idCart);
                            const productId = cartProduct ? cartProduct.productIdProduct : null;
                            const product = products.find(prod => prod.idProduct === productId);

                            return (
                                <tr key={rowIndex} style={{ borderRadius: rowIndex === currentItems.length - 1 ? '0 0 15px 15px' : '0' }}>
                                    <td>{bill.idBill}</td>
                                    <td>{buyer ? buyer.buyerName : '-'}</td>
                                    <td>{new Date(bill.billDate).toLocaleDateString('en-GB')}</td>
                                    <td>{product ? product.productName : '-'}</td>
                                    <td>{bill.cart.licenseNumber}</td>
                                    <td>{/* Additional actions or details */}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* Pagination */}
                <nav aria-label="...">
                    <ul className="pagination pb-2 justify-content-center">
                        {pageNumbers}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default SalesListBox;
