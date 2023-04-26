import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../Layout/NavBar/NavBar";
import { useNavigate, useParams } from "react-router-dom";

const UserDashboard = () => {
  const navigateObject = new useNavigate();

  const userDetails = {
    username: useParams().username,
    role: useParams().role,
    token: useParams().token,
    userId: useParams().userId,
  };

  console.log(userDetails);
  const [accounts, setAccounts] = useState([]);

  const getAllAccounts = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8080/api/v1/user/getaccounts/${userDetails.userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
            Authorization: `Bearer ${userDetails.token}`,
          },
        }
      );
      console.log(response.data);
      setAccounts(response.data);
    } catch (error) {
      alert("Error");
      return;
    }
  };

  const handleClick = (accountNo) => {
    navigateObject(
      `/passbook/${userDetails.username}/${userDetails.role}/${userDetails.token}/${userDetails.userId}/${accountNo}`
    );
  }

  useEffect(() => {
    getAllAccounts();
  }, []);

  return (
    <>
      <NavBar user={userDetails} />
      <section className="overflow-hidden main">
        <div className="container ">
          <div className="row">
            <div className="col">
              <table className="table table-bordered border-primary">
                <thead>
                  <tr class="table-success">
                    <th scope="col">Serial No.</th>
                    <th scope="col">Account Number</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Is Active</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Show Passbook</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account, index) => {
                    return (
                      <tr class="table-success">
                        <td>{index + 1}</td>
                        <td>{account.accountNo}</td>
                        <td>{account.amount}</td>
                        <td>{account.isActive === true ? "Yes" : "No"}</td>
                        <td>{account.createdOn}</td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-outline-secondary"
                            onClick={() => handleClick(account.accountNo)}
                          >
                            Passbook
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserDashboard;
