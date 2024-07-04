import React, { useState, useEffect } from "react";
import "../../App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Shop from "../../views/buyer/buyerShop";

const BuyerPayment = () => {
  const items = [
    // Lista de items no carrinho de compras
    {
      image:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp",
      name: "Iphone 11 pro",
      description: "256GB, Navy Blue",
      quantity: 2,
      price: 900,
    },
    {
      image:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img2.webp",
      name: "Samsung Galaxy S20",
      description: "128GB, Cosmic Gray",
      quantity: 1,
      price: 800,
    },
    {
      image:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img3.webp",
      name: "Google Pixel 4a",
      description: "128GB, Just Black",
      quantity: 3,
      price: 500,
    },
  ];

  // Função para somar a quantidade total dos itens no carrinho
  const sumTotalQuantity = (items) => {
    let totalQuantity = 0;
    items.forEach((item) => {
      totalQuantity += item.quantity; // Incrementa o total de quantidade com a quantidade de cada item
    });
    return totalQuantity; // Retorna o total de quantidade
  };

  // Calcular a quantidade total utilizando a função sumTotalQuantity
  const totalQuantity = sumTotalQuantity(items);

  // Estado para armazenar o preço total
  const [totalPrice, setTotalPrice] = useState(0);

  // Efeito para calcular o preço total quando os items mudam
  useEffect(() => {
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += item.price * item.quantity; // multiplica o valor do preço com a quantidade de cada item
    });
    setTotalPrice(totalPrice);
  }, [items]);

  // Estado para o número do cartão
  const [cardNumber, setCardNumber] = useState("");

  // Função para lidar com a mudança no input do número do cartão e formatá-lo com espaços a cada 4 dígitos
  const handleCardNumberChange = (event) => {
    // Remove tudo o que não é digito
    const inputWithoutSpaces = event.target.value.replace(/\s+/g, "");

    // Formata com espaços a cada 4 digits
    let formattedValue = inputWithoutSpaces.replace(/(\d{4})/g, "$1 ").trim();

    // Faz update ao estado
    setCardNumber(formattedValue);
  };

  // Estado para a data de expiração
  const [expiry, setExpiry] = useState("");

  // Função para lidar com a mudança na data de expiração e inserir '/' após os primeiros 2 caracteres (MM)
  const handleExpiryChange = (event) => {
    let formattedValue = event.target.value;

    // Inserte '/' após os dois primeiros numeros
    if (formattedValue.length === 2 && !formattedValue.includes("/")) {
      formattedValue += "/";
    }

    // Faz update ao estado
    setExpiry(formattedValue);
  };

  return (
    <div>
      <section className="h-100 h-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="bg-white roundbg shadow">
                <div className=" p-4">
                  <div className="row">
                    <div className="col-lg-7">
                      <h5 className="mb-3">
                        <Link
                          to="/shop"
                          className="text-body d-flex align-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-chevron-left my-auto"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                            />
                          </svg>
                          Continue shopping
                        </Link>
                      </h5>
                      <hr />

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-1">Shopping cart</p>
                          <p className="mb-0">
                            You have <strong>{totalQuantity}</strong> items in
                            your cart
                          </p>
                        </div>
                      </div>

                      <div>
                        <ShoppingCart items={items} />
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="p-3 bg-info text-white roundbg">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="mb-0">Card details</h5>
                          </div>
                          <div className="d-flex justify-content-between">
                            <img src="https://img.icons8.com/?size=100&id=13608&format=png&color=000000" />
                            <img src="https://img.icons8.com/?size=100&id=13611&format=png&color=000000" />
                            <img src="https://img.icons8.com/?size=100&id=13610&format=png&color=000000" />
                            <img src="https://img.icons8.com/?size=100&id=Pb0c8A4rGpq1&format=png&color=000000" />
                          </div>

                          <p className="small mb-2">
                            <strong>Card type</strong>
                          </p>

                          <form className="mt-4">
                            <div className="form-outline form-white mb-4">
                              <input
                                type="text"
                                id="typeName"
                                className="form-control form-control-lg"
                                size="17"
                                placeholder="Cardholder's Name"
                                pattern="^[^0-9]*$"
                                required
                              />
                              <label className="form-label" htmlFor="typeName">
                                <strong>Cardholder's Name</strong>
                              </label>
                            </div>

                            <div className="form-outline form-white mb-4">
                              <input
                                type="text"
                                id="typeText"
                                className="form-control form-control-lg"
                                size="17"
                                placeholder="1234 5678 9012 3457"
                                minLength="19"
                                maxLength="19"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                pattern="^\d{4}(\s\d{4}){3}$"
                                required
                              />
                              <label className="form-label" htmlFor="typeText">
                                <strong>Card Number</strong>
                              </label>
                            </div>

                            <div className="row mb-4">
                              <div className="col-md-6">
                                <div className="form-outline form-white">
                                  <input
                                    type="text"
                                    id="typeExp"
                                    className="form-control form-control-lg"
                                    placeholder="MM/YYYY"
                                    value={expiry}
                                    onChange={handleExpiryChange}
                                    size="7"
                                    minLength="7"
                                    maxLength="7"
                                    pattern="^(0[1-9]|1[0-2])\/(20)\d{2}$"
                                    required
                                  />
                                  <label
                                    className="form-label"
                                    htmlFor="typeExp"
                                  >
                                    <strong>Expiration</strong>
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-outline form-white">
                                  <input
                                    type="text"
                                    id="typeCvv"
                                    className="form-control form-control-lg"
                                    placeholder="&#9679;&#9679;&#9679;"
                                    size="3"
                                    minLength="3"
                                    maxLength="3"
                                    pattern="^\d{3}$"
                                    required
                                  />
                                  <label
                                    className="form-label"
                                    htmlFor="typeCvv"
                                  >
                                    <strong>CVV</strong>
                                  </label>
                                </div>
                              </div>
                            </div>

                            <hr className="my-4" />

                            <div className="d-flex justify-content-between mb-4">
                              <p className="mb-2">Total (Incl. taxes)</p>
                              <p className="mb-2">${totalPrice}</p>
                            </div>

                            <button
                              type="submit"
                              className="btn bg-white btn-block btn-lg text-info col-12 hover1"
                            >
                              <strong>Checkout</strong>
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Componente ShoppingCart para exibir os itens no carrinho de compras
const ShoppingCart = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <div className="p-3 mb-3 shadow roundbg" key={index}>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-row align-items-center col-4">
                <div>
                  <img
                    src={item.image}
                    className="img-fluid roundbg"
                    alt="Shopping item"
                    style={{ width: "65px" }}
                  />
                </div>
                <div className="ms-3">
                  <h5>{item.name}</h5>
                  <p className="small mb-0">{item.description}</p>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center col-3 text-center">
                <div style={{ width: "50px" }}>
                  <h5 className="fw-normal mb-0">{item.quantity}</h5>
                </div>
                <div style={{ width: "80px" }}>
                  <h5 className="mb-0">${item.price * item.quantity}</h5>
                </div>
                <a href="#!" style={{ color: "#cecece" }}>
                  <i className="fas fa-trash-alt"></i>
                </a>
              </div>
              <div className="col-2 my-auto">
                <button
                  type="button"
                  className="btn btn-danger hover shadow col-12 roundbg"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BuyerPayment;

//npm i bootstrap-icons
