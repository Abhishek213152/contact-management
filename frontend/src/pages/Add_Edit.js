import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Add_Edit.css";

const initialstate = {
  name: "",
  email: "",
  contact: "",
};

const Add_Edit = () => {
  const [state, setState] = useState(initialstate);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, contact } = state;
    if (!name || !email || !contact) {
      toast.error("Please fill all details");
    } else {
      if(!id){
        axios
          .post("https://contact-management-fgqck.vercel.app//post", {
            name,
            email,
            contact,
          })
          .then(() => {
            setState({ name: "", email: "", contact: "" });
            toast.success("Data saved successfully");
          })
          .catch((err) => toast.error(err.response.data));
        setTimeout(() => navigate("/"), 500); 
      }
      else{
        axios
          .put(`https://contact-management-fgqck.vercel.app//update/${id}`, {
            name,
            email,
            contact,
          })
          .then(() => {
            setState({ name: "", email: "", contact: "" });
            toast.success("Data updated successfully");
          })
          .catch((err) => toast.error(err.response.data));
        setTimeout(() => navigate("/"), 500); 
      }
    }
  };

  const { name, email, contact } = state;

  const {id}=useParams();

  useEffect(()=>{
    axios
      .get(`https://contact-management-fgqck.vercel.app//get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name...."
          value={name || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email...."
          value={email || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Your contact...."
          value={contact || ""}
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? "Update": "Save"} />
        <Link to="/">
          <input type="button" value="Go Back" style={{cursor: "pointer"}}/>
        </Link>
      </form>
    </div>
  );
};

export default Add_Edit;
