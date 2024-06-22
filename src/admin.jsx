import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Admin() {

    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [cardData, setCardData] = useState([]);
    const [cardCount, setCardCount] = useState(0);

    const nav = useNavigate();

    useEffect(() => {
        fetch("https://restaurant-server-q3k2.onrender.com/userDetails", { method: "GET" })
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setCount(data.length);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });

        fetch("https://restaurant-server-q3k2.onrender.com/cards", { method: "GET" })
            .then((response) => response.json())
            .then((data) => {
                setCardData(data);
                setCardCount(data.length);
            })
            .catch((error) => {
                console.error("Error fetching card data:", error);
            });
    }, []);

    const post = () => {
        nav("/post");
    }

    const update = (eid) => {

        nav("/update/" + eid);
    }

    const delete_card = (eid) => {
        fetch("https://restaurant-server-q3k2.onrender.com/cards/" + eid, { method: "DELETE" })
            .then(() => {
                toast.warn('Deleted Successfullys', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const delete_user = (eid) => {
        fetch("https://restaurant-server-q3k2.onrender.com/userDetails/" + eid, { method: "DELETE" })
            .then(() => {
                toast.warn('Deleted User Successfullys', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div id="admin_block">
            <div id="admin">
                <a href="#user_details" id="href">
                    <div id="userCount">
                        <h2>Users Present</h2>
                        <p>{count}</p>
                    </div>
                </a>
                <a href="#card_details" id="href">
                    <div id="cardCount">
                        <h2>Products Selling</h2>
                        <p>{cardCount}</p>
                    </div>
                </a>
            </div>
            <div id="products">
                <button onClick={post} id="post_button">Post New Product</button>
                <h1>Products</h1>
                <table>
                    <thead>
                        <tr>
                            <th>product</th>
                            <th>price</th>
                            <th>Category</th>
                            <th>stock</th>
                            <th>curd</th>
                        </tr>
                    </thead>
                    <tbody id="card_details">
                        {cardData.map((i, index) => (
                            <tr key={index}>
                                <td>{i.details}</td>
                                <td>{i.price}</td>
                                <td>{i.category}</td>
                                <td>{i.stock}</td>
                                <button id="button_card" onClick={() => update(i.id)}>Update</button>&nbsp;&nbsp;
                                <button id="button_delete" onClick={() => delete_card(i.id)}>Delete</button>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div id="user_details">
                <h1>USER DETAILS</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>email</th>
                            <th>password</th>
                            <th>mobile Number</th>
                            <th>Deletion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((i, index) => (
                            <tr key={index}>
                                <td>{i.username}</td>
                                <td>{i.email}</td>
                                <td>{i.password}</td>
                                <td>{i.mobileNumber}</td>
                                <button id="button_delete" onClick={() => delete_user(i.id)}>Delete</button>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    )
}
export default Admin;