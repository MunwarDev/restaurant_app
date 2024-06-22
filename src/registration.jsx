import restaurant from "./restaurant.jpg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import "./app.css";

function Registration() {
  const [inputs, setInputs] = useState({});
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const { username, email, mobileNumber, password, reconfirm_password } = inputs;

  useEffect(() => {
    fetch('https://restaurant-server-q3k2.onrender.com/userDetails', { method: "GET" })
      .then(response => response.json())
      .then(resp => setData(resp))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const regx = /^\d{10,}$/;

    if (!regx.test(mobileNumber)) {
      toast.warn('Mobile number is invalid enter another number', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    else if (password !== reconfirm_password) {
      toast.warn('please re-conform password', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    else if (!regex.test(password)) {
      toast.warn('please Enter atleast 8 characters, special characters, aphlabetic, numeric', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    else {
      const result = data.filter((user) => user.email === email || user.mobileNumber === mobileNumber);
      if (result.length > 0) {
        toast.warn('Entered email and mobilenumber is already exists', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setInputs({});
      }

      else {
        const userData = { username, email, mobileNumber, password, id };

        setLoading(true);
        fetch("https://restaurant-server-q3k2.onrender.com/userDetails", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        }).then(() => {
          toast.success('Registered successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setTimeout(() => {
            navigate("/main", { state: { username: userData.username } });
          }, 1000);
        }).catch((err) => {
          console.log(err);
        })
        setInputs({});

      }
    }
  }
const login =() => {
  navigate("/Login");
}

  return (
    <div id="body">

      <div id="head">

      </div>
      <div id="register_form" className="d-flex justify-content-center">
        <div id="form_logo">
          <img src={restaurant} alt="Restaurant Logo" />
        </div>
        <div id="register_form_div">
          <p id="para">Create Account</p>
          <form onSubmit={submitForm} id="form">
            <label className="label">Name:</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input className="input" type="text" value={inputs.username || ""} onChange={handleChange} name="username" placeholder="Enter Your Name" required /><br />

            <label className="label"><sup>*</sup>Email:</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input className="input" type="email" name="email" value={inputs.email || ""} onChange={handleChange} placeholder="Enter your Email" required /><br />

            <label className="label"><sup>*</sup>Phone Number:</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input className="input" type="text" name="mobileNumber" value={inputs.mobileNumber || ""} onChange={handleChange} placeholder="Enter Number" required /><br />

            <label className="label"><sup>*</sup>Enter Password:</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input className="input" type="password" name="password" value={inputs.password || ""} onChange={handleChange} placeholder="Enter Your Password" required /><br />

            <label className="label"><sup>*</sup>Re-conform Password:</label>
            <input className="input" type="password" name="reconfirm_password" onChange={handleChange} value={inputs.reconfirm_password || ""} placeholder="Re-conform your password" required /><br /><br />
            <button id="button" type="submit" disabled={loading}>
              {loading ? "Processing..." : "Register"}
            </button>

            <div className="float-end">
              <a onClick={login}>Login</a>
              <p>Already have account<sup>*</sup></p>
            </div>
          </form>

        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
export default Registration;