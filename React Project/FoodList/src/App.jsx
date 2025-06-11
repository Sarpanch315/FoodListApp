import {Routes,Route} from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Authentication/Login"
import SignUp from "./Authentication/Signup"
import Header from "./MainComponents/Header"
import About from "./Pages/About"
import Cart from "./Pages/Cart"
import RestaurantDetails from "./Pages/RestaurantDetails"
import Footer from "./MainComponents/Footer"
import PaymentSuccess from "./Pages/PaymentSuccess"
import PaymentCancelled from "./Pages/PaymentCancelled"
import ForgetPassword from "./Authentication/ForgetPassword"

function App() {
 

  return (
    <div className="wrapper">
      <Header/>
        <Routes>
          <Route exact path="/" element = {<Home />} />
          <Route path="/home" element = {<Home/>} />
          <Route  path="/login" element= {<Login/>}/>
          <Route path="/signup" element = {<SignUp/>} />
          <Route path="/forgetPassword" element = {<ForgetPassword/>} />
          <Route path="/about" element = {<About/>} />
          <Route path="/cart" element = {<Cart/>} />
          <Route path="/successful"  element = {<PaymentSuccess/>}/>
          <Route path="/cancelled"   element = {<PaymentCancelled/>} />
          <Route path="/restaurant/:id" element = {<RestaurantDetails/>} />
          <Route />
        </Routes>
      <Footer/>
    </div>
  )
}

export default App
