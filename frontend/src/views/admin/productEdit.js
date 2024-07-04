import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

const EditProduct = () => {
    const { idProduct } = useParams(); // Fetch the id from URL parameter
    const [product, setProduct] = useState({
        productName: '',
        productPrice: '',
        productDescript: '',
        image: '',
    });
    const [editedProduct, setEditedProduct] = useState({
        productName: '',
        productPrice: '',
        productDescript: '',
        image: '',
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Define loadProduct function outside of useEffect
    const loadProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/product/${idProduct}`);
            const data = response.data;
            setProduct(data);
            setEditedProduct(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching product details:', error);
            setError(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadProduct(); // Call loadProduct initially when component mounts
    }, [idProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({
            ...editedProduct,
            [name]: value,
        });
    };

    const handleSave = async () => {
        const url = `http://localhost:8080/product/update/${idProduct}`;

        const data = {
            productName: editedProduct.productName,
            productPrice: editedProduct.productPrice,
            productDescript: editedProduct.productDescript,
            image: editedProduct.image,
        };

        try {
            const response = await axios.put(url, data);
            console.log('Response from server:', response); // Log the entire response object for debugging

            if (response.data && response.data.success === true) {
                setProduct(response.data.data); // Update local state with updated data
                alert(response.data.message || 'Product updated successfully!');
                loadProduct(); // Reload product details after successful update
            } else {
                let errorMessage = response.data && response.data.message ? response.data.message : 'Unknown error';
                alert('Failed to update product: ' + errorMessage);
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product.');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching product details: {error.message}</div>;
    }

    return (
        <div className="dashboard-content bg-light w-100 p-2 mt-4">
            <div className="container">
                <div className="box-container bg-white roundbg d-flex h-100 p-2 shadow">
                    <div className="col-12">
                        <h2 className='text-start p-3'>{product.productName}</h2>
                        <form>
                            <div className="row mx-1">
                                <div className="col-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="productnameinput">Product Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="productnameinput"
                                            name="productName"
                                            placeholder="Name"
                                            value={editedProduct.productName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="productpriceinput">Unit Price</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="productpriceinput"
                                            name="productPrice"
                                            placeholder="Unit Price"
                                            value={editedProduct.productPrice}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="descriptioninput">Description</label>
                                        <textarea
                                            className="form-control"
                                            id="descriptioninput"
                                            name="productDescript"
                                            rows="2"
                                            maxLength="75"
                                            value={editedProduct.productDescript}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="imagelinkinput">Image</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="imagelinkinput"
                                            name="image"
                                            placeholder="Image"
                                            value={editedProduct.image}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="row d-flex flex-row m-3">
                            <div className='col-8'></div>
                            <div className="col-2">
                                <button type="button" className="btn btn-outline-success col-12 hover" onClick={handleSave}>Save</button>
                            </div>
                            <div className="col-2">
                                <button type="button" className="btn btn-outline-danger col-12 hover">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;
