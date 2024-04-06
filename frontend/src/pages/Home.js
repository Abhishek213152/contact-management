import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get(
      "https://contact-management-fgqck.vercel.app//data"
    );
    setData(response.data);
    console.log(response);
  };

  const deleteContact = (id) => {
    if (window.confirm("Are you sure you wanna delete this contact")) {
      axios.delete(`https://contact-management-fgqck.vercel.app//remove/${id}`);
      toast.success("Deleted Successfully");
      setTimeout(() => loadData(), 500);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div style={{ marginTop: "140px" }}>
      <div className="btn-container">
        <Link to="/addContact">
          <button className="button">Add Contact</button>
        </Link>
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Id</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteContact(item.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/view/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
