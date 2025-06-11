// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteToCart } from "../Store/cartSlice";
import CheckOut from "./CheckOut";


export default function Cart() {
    const cartItem = useSelector((state) => state.cart.cartItems); 
    const dispatch = useDispatch();
    
    let sum = 0 ;
    
    for (let item of cartItem) {
      if(item.price) {
        sum += item.price

      }
      else{
        continue;
      }
    }

    const handleDelete = (id) => {
       dispatch(deleteToCart(id))
    }
    
    return (
      <div className="cart-container pt-28 min-h-screen ">
      <h2 className="text-7xl font-bold  flex items-center justify-center shadow-inner  mb-12">Your <span className="text-green-500">Cart</span></h2>

      {/* If cart is empty */}
      {cartItem.length === 0 ? (
        <p className="text-gray-500 mt-4 flex justify-center text-4xl mb-12  font-semibold">Your Cart is <span className="text-red-500 font-bold"> &nbsp;Empty</span> .</p>
      ) : (
        <div className="cart-items ml-24 mr-24">

          {cartItem.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between  border-b border-gray-200 py-4 shadow rounded pl-12 mb-4"
            >
              <div>
                <img className="w-12 h-12 object-cover rounded-md mr-4" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${item.img}`} alt={item.name} />
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-lg font-bold">₹{item.price}</p>
              </div>
              
              <button
                 onClick={() => handleDelete(item.id)}
                 className="ml-4 rounded border-2 border-gray-500  font-bold bg-red-500 shadow text-white hover:text-white hover:bg-red-500 mr-32 pl-12 pr-12 pt-3 pb-3"
              >
                 Delete
              </button>

            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center">
        <CheckOut sum={sum} />
      </div>
    </div>    
  );
}