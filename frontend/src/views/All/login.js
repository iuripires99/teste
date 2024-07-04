// Login.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo-navbar.svg";
import { Link } from "react-router-dom";
import { UserContext } from './UserContext';
import { Form, Button } from "react-bootstrap";

const Login = () => {
  const { setUserRole, setUserId } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("buyer");
  const [error, setError] = useState("");
  const [admins, setAdmins] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [managers, setManagers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdmins();
    fetchBuyers();
    fetchManagers();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin");
      setAdmins(response.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  const fetchBuyers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/buyer");
      setBuyers(response.data);
    } catch (error) {
      console.error("Error fetching buyers:", error);
    }
  };

  const fetchManagers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/manager");
      setManagers(response.data);
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Logging in with:", email, password, accountType);

    let foundUser = null;

    switch (accountType) {
      case "buyer":
        foundUser = buyers.find((buyer) => buyer.buyerEmail === email.trim() && buyer.buyerPassword === password.trim());
        break;
      case "manager":
        foundUser = managers.find((manager) => manager.managerEmail === email.trim() && manager.managerPassword === password.trim());
        break;
      case "admin":
        foundUser = admins.find((admin) => admin.adminEmail === email.trim() && admin.adminPassword === password.trim());
        break;
      default:
        break;
    }

    if (foundUser) {
      console.log("Successful login:", foundUser);
      setUserRole(accountType);  // Set the user role in context
      setUserId(foundUser.id);  // Set the user ID in context
      navigate("/dashboard"); // Redirect to dashboard on successful login
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <section className="gradient-form d-flex align-items-center" style={{ height: "100vh" }}>
      <div className="container py-5 h-100 my-auto">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10 shadow roundbg px-0">
            <div className="text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img src={logo} style={{ width: "185px" }} alt="logo" />
                      <h4 className="mt-1 mb-5 pb-1">We are The Divez Team</h4>
                    </div>

                    <form onSubmit={handleLogin}>
                      <p>Please login to your account</p>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          name="email"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="form2Example11">
                          Email
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          name="password"
                          type="password"
                          id="form2Example22"
                          className="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="form2Example22">
                          Password
                        </label>
                      </div>

                      <div className="col-12">
                        <p>Type of account</p>
                        <div>
                          <input
                            type="radio"
                            id="buyer"
                            name="type"
                            value="buyer"
                            checked={accountType === "buyer"}
                            onChange={(e) => setAccountType(e.target.value)}
                          />
                          <label htmlFor="buyer" className="form-label">
                            Buyer
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="manager"
                            name="type"
                            value="manager"
                            checked={accountType === "manager"}
                            onChange={(e) => setAccountType(e.target.value)}
                          />
                          <label htmlFor="manager" className="form-label">
                            Manager
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="admin"
                            name="type"
                            value="admin"
                            checked={accountType === "admin"}
                            onChange={(e) => setAccountType(e.target.value)}
                          />
                          <label htmlFor="admin" className="form-label">
                            Admin
                          </label>
                        </div>
                      </div>

                      {error && <p className="text-danger">{error}</p>}

                      <div className="text-center pt-1 mb-5 pb-1 col-12">
                        <button className="btn btn-info btn-block fa-lg text-white hover col-12" type="submit">
                          <strong>Log in</strong>
                        </button>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <Link to="/register">
                          <button type="button" className="btn btn-outline-info hover">
                            Create new
                          </button>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center Gradient roundbg shadow">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">
                      Divez is a leading provider of application development and management services. We specialize
                      in creating customized applications tailored to meet the unique needs of businesses and
                      individuals. Our comprehensive services ensure that clients not only receive high-quality
                      applications but also benefit from expert management and support to optimize their software use.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
