import "./App.css";

import { AiOutlineUsergroupDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import manImage from "../src/asset/man.jpg";
import DialogBox from "./models/DialogBox/DialogBox";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "./store/Slices/customersSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers);

  useEffect(() => {
    fetch("https://reqres.in/api/users?page=1")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); 
        dispatch(fetchCustomer(data));
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  useEffect(() => {
    console.log(customers);
  }, [customers]);

  const handleAddCustomer = (data) => {
    dispatch(addCustomer(data));
    
  };
  const handleUpdateCustomer = (data) => {
    console.log(data);
    dispatch(updateCustomer(data));
  };
  const handleDeleteCustomer = (data) => {
    dispatch(deleteCustomer(data));
  };

  return (
    <div className="App">
      <section className="main-body">
        <div className="body-row">
          <div className="body-left">
            <div className="heading">
              <h1 style={{ color: "#ffffffff" }}>SAVIYNT</h1>
            </div>

            <div className="button-section">
              <button className="button-37" role="button">
                <span>
                  <AiOutlineUsergroupDelete />
                </span>
                Customers
              </button>
            </div>
          </div>
          <div className="body-right">
            <nav className="nav-header">
              <h2 className="top-heading-nav">CUSTOMERS</h2>
            </nav>
            <div className="content-body">
              <div className="inner-content">
                <div className="add-buttons">
                  <DialogBox
                    method={"Add"}
                    Title={"+ Add New Customers"}
                    buttoncss={{
                      background: "linear-gradient(to right, #419F7C, #015249)",
                    }}
                    submitHandler={handleAddCustomer}
                  />
                </div>

                <div className="table-row-data">
                  <div className="row-heading">
                    <h5 className="syle-h5">Customer ID#</h5>
                    <h5 className="syle-h5"> Customer Name</h5>
                    <h5 className="syle-h5">Email</h5>
                  </div>
                </div>

                <div>
                  {customers.data.map((customer) => (
                    <div className="table-content-data">
                      <div className="row" key={customer.id}>
                        <div className="image-section">
                          <img className="" src={manImage} alt="Man" />
                        </div>
                        <div className="customer-id">
                          <p>{customer.id}</p>
                        </div>
                        <div className="customer-name">
                          <p>
                            {customer.first_name} {customer.last_name}
                          </p>
                        </div>
                        <div className="email">
                          <p>{customer.email}</p>
                        </div>
                        <div className="button-row">
                          <DialogBox
                            method={"Edit"}
                            Title={"Edit"}
                            buttoncss={{
                              backgroundColor: "#b0E1b7",
                              color: "#008212",
                            }}
                            data={customer}
                            submitHandler={handleUpdateCustomer}
                          />
                          <DialogBox
                            method={"Delete"}
                            Title={"Delete"}
                            buttoncss={{
                              backgroundColor: "#ef9999",
                              color: "#D80000",
                            }}
                            data={customer}
                            submitHandler={handleDeleteCustomer}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
