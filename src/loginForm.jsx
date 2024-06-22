import { ToastContainer,toast } from "react-toastify";
import restaurant from "./restaurant.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
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

      const {email,mobileNumber,password} = inputs;

      useEffect(() => {
        fetch("https://restaurant-server-q3k2.onrender.com/userDetails",{method:"GET"})
        .then((resp) => resp.json())
        .then((res) => setData(res.data || res))
        .catch((err) => console.log(err))
      },[]);

     const submitForm = (e) => {
        e.preventDefault()
         setLoading(true);
        const result = data.filter(i => (i.email === email || i.mobileNumber === mobileNumber) && i.password === password);

        if(result.length > 0) {
          const user = result[0];
          if(user.email === "munwarmatters@gmail.com" || user.mobileNumber === "6305751649"){
            toast.success('LoggedIn successfully', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setInputs({});
      setTimeout(() => {
      navigate("/admin", { state: { username: user.username } });    
      },1000)  
      }

            else {
              toast.success('LoggedIn successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              setInputs({});
        setTimeout(() => {
        navigate("/main", { state: { username: user.username } });    
        },1000)  
        }
            }
        else {
            toast.warn('please check credentials', {
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
        setInputs({});
        setLoading(false);
     }

    return(
            <div id="body">

<div id="head">

</div>
<div id="register_form" className="d-flex justify-content-center">
  <div id="form_logo">
    <img src={restaurant} alt="Restaurant Logo" />
  </div>
  <div id="login_form_div">
    <p id="para">Login Account</p>
    <form id="login_form" onSubmit={submitForm}>
      <label className="label"><sup>*</sup>Email:</label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input className="input" type="email" name="email" value={inputs.email || ""} onChange={handleChange} placeholder="Enter your Email"  /><br />
        <h6>(OR)</h6>
      <label className="label"><sup>*</sup>Phone Number:</label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input className="input" type="text" name="mobileNumber" value={inputs.mobileNumber || ""} onChange={handleChange} placeholder="Enter Number"  /><br />

      <label className="label"><sup>*</sup>Enter Password:</label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input className="input" type="password" name="password" value={inputs.password || ""} onChange={handleChange} placeholder="Enter Your Password" required /><br />

      <button id="button" type="submit" disabled={loading} className="submit">
        {loading ? "Processing..." : "Login"}
      </button>

      <div className="float-end" id="submit1">
        <a href="/reset">ForgetPassword</a>
        <p>Click link to change password<sup>*</sup></p>
      </div>
    </form>

  </div>
</div>
<ToastContainer />
</div>
    )
}
export default Login;