import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Reset_password() {
  const [inputs, setInputs] = useState({});
  const [setpass, setSetpass] = useState(false);
  const [id, setId] = useState("");
  const nav = useNavigate();

  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const { password, reconfirm } = inputs;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://restaurant-server-q3k2.onrender.com/userDetails?email=${inputs.email}`);
      const data = await response.json();

      if (Object.keys(data).length !== 0) {
        const user = data[0];
        setId(user.id);
        setSetpass(true);
      } else {
        toast.warn('please enter valid email', {
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
    } catch (error) {
      console.error('Error checking data:', error);
    }
  };

  const handlePassSubmit = async (event) => {
    event.preventDefault();

    if (password !== reconfirm) {
      toast.warn('please reconform password correctly', {
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
      return;
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
      setInputs({});
      return;
    }

    try {
      const response = await fetch(`https://restaurant-server-q3k2.onrender.com/userDetails/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: password }),
      });

      if (response.ok) {
        toast.success('password changed successfully', {
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
          nav("/login");
        }, 1000);
      }
      else {
        toast.warn('Password not updated successfully', {
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
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const click = () => {
    nav("/Login");
  }

  return (
    <div id="reset_div">
      {!setpass ? (<form id="reset_form" onSubmit={handleSubmit}>
        <label className="label">Email</label>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input className="input" type="email" placeholder="Enter your e-mail" name="email" value={inputs.email || ""} onChange={onChange} required /><br />

        <button id="button" type="submit">Submit</button>
      </form>
      ) : (
        <form id="reset_form" onSubmit={handlePassSubmit}>
          <label className="label">Enter new-password</label>&nbsp;&nbsp;
          <input className="input" type="password" placeholder="enter new-password" name="password" value={inputs.password || ""} onChange={onChange} required /><br />

          <label className="label">Re-conform password</label>&nbsp;&nbsp;
          <input className="input" type="password" placeholder="re-conform password" name="reconfirm" value={inputs.reconfirm || ""} onChange={onChange} required /><br />

          <button id="button" type="submit">Submit</button>
          <a id="submit2" onClick={click}>back to login</a>
        </form>
      )}
     
      <ToastContainer />
    </div>
  )
}
export default Reset_password;