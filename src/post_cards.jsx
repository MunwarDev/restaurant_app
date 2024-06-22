import {useState } from "react";
import "./app.css";
import { ToastContainer,toast } from "react-toastify";

function Post_cards() {
    const [inputs, setInputs] = useState({});
    const [id,setId] = useState("");
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
      }

      const {img,details,price,onChange,stock,category} = inputs;
      const userData = {img,details,price,onChange,stock,id,category};

      const submit = (e) => {
        e.preventDefault();

        fetch("https://restaurant-server-q3k2.onrender.com/cards",{method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(userData)
          }).then(()=>{
            toast.success('Posted successfully', {
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
          }).catch((err) => {
            console.log(err);
          })
      }

    return(
        <div id="post">
            <form onSubmit={submit} id="form">
<input className="input" type="url" placeholder="Enter image URL" value={inputs.img || ""} name="img"
onChange={handleChange} required/>
<br />
<input className="input" type="text" placeholder="Enter Product Details" value={inputs.details || ""} name ="details"
onChange={handleChange} required/>
<br />
<input className="input" type="text" placeholder="Enter Price" value={inputs.price || ""} name="price" 
onChange={handleChange}required/>
<br />
<input className="input" type="text" placeholder="On Change" value={inputs.onChange || ""} name="onChange"
onChange={handleChange} />
<br />
<input className="input" type="text" placeholder="Quantity" value={inputs.quantity || ""} name="quantity" 
onChange={handleChange}/> <br />

<select name="category" value={inputs.category || ""} onChange={handleChange} id="category1">
  <option value="" selected>Select Category</option>
  <option value="chicken">Chicken</option>
  <option value="meat">Meat</option>
  <option value="sea food">Sea Food</option>
<option value="vegiees">Vegiees</option>
</select><br /><br />

<input className="input" type="text" placeholder="Available Stock" value={inputs.stock || ""} name="stock"
onChange={handleChange} />
<br /><br />

<button  id="button2" type="submit">Submit</button>
<a href="/admin" id="back_post">Back</a>
            </form>
           
<ToastContainer/>
        </div>
    )
}
export default Post_cards;