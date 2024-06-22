import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./registration.jsx";
import Login from "./loginForm.jsx";
import Reset_password from "./reset.jsx";
import Main from "./main_page.jsx";
import Post_cards from "./post_cards.jsx";
import Admin from "./admin.jsx";
import Update from "./update.jsx";
import EmailLink from "./emailLink.jsx";
import Cart from "./cartPage.jsx";
import Payment from "./payment.jsx";


function Pages() {
    return(
        <div>
    <Router>
        <Routes>
            <Route path = "/" element = {<Registration/>}/>
            <Route path= "/login" element = {<Login/>}/>
            <Route path="/reset" element = {<Reset_password/>}/>
            <Route path="/main" element = {<Main/>}/>
            <Route path="/post" element = {<Post_cards/>}/>
            <Route path="/admin" element = {<Admin/>} />
            <Route path="/update/:eid" element = {<Update/>} />
            <Route path="/email" element = {<EmailLink/>} />
            <Route path="/cart" element = {<Cart/>} />
            <Route path="/pay" element = {<Payment/>} />
        </Routes>
    </Router>
        </div>
    )
}

export default Pages;