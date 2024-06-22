import { useLocation, useNavigate } from "react-router-dom";
import restaurant from "./restaurant.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./pagination";
import { Link } from "react-router-dom";
import { useBill } from './BillContext';

function Main() {
  const [data, setData] = useState([]);

  const [selectedOption, setSelectedOption] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);

  const [uniquePrices, setUniquePrices] = useState([]);
  const [priceOption, setPriceOption] = useState("");

  const [search, setSearch] = useState("");

  const nav = useNavigate();
  const { addToBill, getBillItemsCount } = useBill();


  const location = useLocation();
  const username = location.state?.username;

  const email = () => {
    nav("/email", { state: { username: username } });
  }

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    fetch("https://restaurant-server-q3k2.onrender.com/cards", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        const fetchedData = res.data || res;
        const shuffledData = shuffleArray(fetchedData);
        setData(shuffledData);
        setFilteredCards(shuffledData);

        const prices = [...new Set(fetchedData.map(card => card.price))];
        setUniquePrices(prices);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const filterCards = (category, price) => {
    let filtered = data;
    if (category) {
      filtered = filtered.filter(card => card.category === category);
    }
    if (price) {
      filtered = filtered.filter(card => card.price === price);
    }
    setFilteredCards(filtered);
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

    filterCards(value, priceOption);

    const filteredByCategory = value ? data.filter(card => card.category === value) : data;
    const prices = [...new Set(filteredByCategory.map(card => card.price))];
    setUniquePrices(prices);
  };

  const priceChange = (e) => {
    const value = e.target.value;
    setPriceOption(value);
    filterCards(selectedOption, value);
  }

  const changeSearch = (e) => {
    setSearch(e.target.value);
  }

  const submitSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`https://restaurant-server-q3k2.onrender.com/cards/?q=${search}`);
      setFilteredCards(res.data);
      setSearch('');
    } catch (err) {
      console.error(err);
    }
  };

  //pagination

  const [pages,setPages] = useState(1);
  const [record,setRecord] = useState(12);

const lastPage = record * pages;
const firstPage = lastPage - record;
const slicedData = filteredCards.slice(firstPage, lastPage);
const pageRecord = Math.ceil(filteredCards.length / record);

  const page = (e) => {
    setPages(e);
  }

  const previousPage = (e) => {
    if(pages > 1){
      setPages(pages - 1);
    }

    else {
      alert("Reached first page");
    }
  }

  const nextPage = (e) => {
    if(pages < pageRecord) {
      setPages(pages + 1);
    }
    else {
      alert("Reached last page");
    }
  }

  //add to bill
  const handleAddToBill = (card) => {
    addToBill(card);
  }

  


  return (
    <div>
      <div id="header">
        <div>
          <img src={restaurant} alt="restaurant" id="img" />
        </div>
        <div id="search">
          <form onSubmit={submitSearch}>
            <input className="input" type="text" placeholder=" &#10061; Search the recipe"
              value={search} onChange={changeSearch} />
            <button id="button1" type="submit">Search</button>
          </form>
        </div>
        <div id="main">
          <p>Hello,<strong>{username}</strong> </p>
          <div>
            <strong>Orders &</strong>
            <p>details</p>
          </div>
          <Link to="/cart"> <i className="fa-solid fa-cart-shopping"><sup id="sup">{getBillItemsCount()}</sup></i></Link>
          <a onClick={email} id="chat">Any Queries</a>
        </div>
      </div>

      <div id="card">
        <div id="category">
          <label>Select category</label>
          <select value={selectedOption} onChange={handleSelectChange} id="select">
            <option value="" selected>Select category</option>
            <option value="chicken">Chicken</option>
            <option value="meat">Meat</option>
            <option value="sea food">Sea Food</option>
            <option value="vegiees">Vegiees</option>
          </select><br /><br /><br />

          <label>Select price</label><br />
          <select name="" id="price" value={priceOption} onChange={priceChange}>
            <option value="">Price</option>
            {uniquePrices.map((price, index) => (
              <option key={index} value={price}>{price}</option>
            ))}
          </select>
        </div>

        <div id="cards">
          {slicedData.map((i, index) => (
            <div key={index} id="cards_index">
              <img src={i.img} alt="" />
              <h6>{i.details}</h6>
              <strong>Rs. {i.price}</strong><br /><br />
              <strike>{i.onChange}</strike><br />
              <i> Stock :{i.stock}</i><br />
              <button id="button" onClick={() => handleAddToBill(i)}>Add To Bill</button>
            </div>
          ))}
        </div>

      </div><br />
      <Pagination page = {pages} records = {record} length = {filteredCards.length} 
      pages = {page} previousPage = {previousPage} nextPage = {nextPage}
      />
    </div>
  )
}
export default Main;