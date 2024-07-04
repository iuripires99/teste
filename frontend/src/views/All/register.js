// npms import
import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "../../App.css";
import logo from "../../images/logo-navbar.svg";

const Register = () => {
  return (
    <section class="vh-100 Gradient">
      <div class="container py-5 h-100">
        <div class="row justify-content-center align-items-center h-100">
          <div class="col-12 col-lg-9 col-xl-7">
            <div
              class="bg-light shadow card-registration"
              style={{ borderRadius: 15 + "px" }}
            >
              <div class="card-body p-4 p-md-5">
                <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                <form>
                  <div class="row">
                    <div class="col-md-12 mb-4">
                      <div data-mdb-input-init class="form-outline">
                        <input
                          type="text"
                          id="firstName"
                          class="form-control form-control-lg"
                          pattern="^[^0-9]*$"
                        />
                        <label class="form-label" for="firstName">
                          Name
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-4 d-flex align-items-center">
                      <div
                        data-mdb-input-init
                        class="form-outline datepicker w-100"
                      >
                        <input
                          type="text"
                          class="form-control form-control-lg"
                          id="Nif"
                          maxLength="9"
                          minLength="9"
                          pattern="^\d{9}$"
                        />
                        <label for="Nif" class="form-label">
                          Nif
                        </label>
                      </div>
                    </div>
                    <div class="col-6">
                      <select class="select form-control-lg col-7">
                        <option value="1" disabled>
                          Type of account
                        </option>
                        <option value="2">Client</option>
                        <option value="3">Manager</option>
                      </select>
                      <label class="form-label select-label ms-3">
                        Type of account
                      </label>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12 mb-4 pb-2">
                      <div data-mdb-input-init class="form-outline">
                        <input
                          type="email"
                          id="emailAddress"
                          class="form-control form-control-lg"
                          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                        />
                        <label class="form-label" for="emailAddress">
                          Email
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 mb-4 pb-2">
                      <div data-mdb-input-init class="form-outline">
                        <input
                          type="password"
                          id="password"
                          class="form-control form-control-lg"
                        />
                        <label class="form-label" for="password">
                          Password
                        </label>
                      </div>
                    </div>
                    <div class="col-md-6 mb-4 pb-2">
                      <div data-mdb-input-init class="form-outline">
                        <input
                          type="password"
                          id="password"
                          class="form-control form-control-lg"
                        />
                        <label class="form-label" for="password">
                          Confirm Password
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="mt-4 pt-2 col-12">
                    <input
                      data-mdb-ripple-init
                      class="btn btn-info text-white btn-lg col-12 hover"
                      type="submit"
                      value="Submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
