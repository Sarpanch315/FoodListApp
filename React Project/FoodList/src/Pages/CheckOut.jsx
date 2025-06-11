import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51QV4au007fMwq9nfawMYSbCzYRakBdvZ4BtS7AsRIrFr3VDDHEeGwuMmxXn7tcbnvLAf7BattJxAKbBXy8A2w4Hd00nt1YADVF')

// eslint-disable-next-line react/prop-types
export default function CheckOut({sum}){

    const handleCheckOut = async() => {
        const stripe = await stripePromise;

        // redirect to checkout page
        stripe.redirectToCheckout({
            lineItems: [
                {
                   price: "price_1QV70T007fMwq9nfkIVSPtNp",
                   quantity:1,
                },
            ],
            mode:"payment",
            successUrl : "http://localhost:5173/successful",
            cancelUrl : "http://localhost:5173/cancelled",
        });
    };

    return (
        <button onClick={handleCheckOut} className="text-lg ml-96 mr-96 font-semibold text-white bg-green-600 border-2 border-green-800 rounded-lg px-6 py-3 flex justify-center items-center cursor-pointer hover:bg-green-700 transition-all duration-200 shadow-md transform hover:scale-105"  >
          Total Price: 
          <span className="ml-1 font-bold">
             ₹&nbsp;{sum}
          </span>
        </button>
    )
}