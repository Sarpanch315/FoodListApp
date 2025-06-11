import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { addData } from "../Store/restaurantSlice";



export default function Home () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(true);
    const dataRest = useSelector((state) => state.restaurants.restaurants.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    // ?.card?.card?.gridElements?.infoWithStyle?.info
    
    const imageGridCards = dataRest|| [];
    
    
    useEffect(() => {
        // Define the fetch function inside useEffect
        const fetchData = async () => {
          try {
            // Fetching data from the API
            const response = await fetch(
              'https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.2124&lng=78.1772&page_type=DESKTOP_WEB_LISTING'
            );
    
            // Check if the response is OK
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
    
            const result = await response.json();
    
            // Dispatch only the 'cards' array to Redux
            if (result?.data?.cards) {
              dispatch(addData(result?.data?.cards)); // Only store the cards
            }
    
            // Log the result for debugging
          } catch (err) {
            console.error('Error fetching data:', err);
          } finally {
            setLoading(false); // Set loading to false when done
          }
        };
    
        fetchData(); // Call the fetch function inside useEffect
      }, [dispatch]); // Empty dependency array means this will run only once when the component mounts
    
      if (loading) {
        return <div className="flex mt-2 items-center justify-center min-h-screen flex-col">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
        
        {/* Loading message below the spinner */}
        <div className="mt-4 text-lg text-gray-700">Loading...</div>
      </div>
      }

    const handleCardClick = (restaurantId) => {
      navigate(`/restaurant/${restaurantId}`);
    }
   
    return (
        <>
        
        <div className="body mx-28 pt-1 mt-24">

      <div>
        <hr className="mt-5" />
        <div className="text-3xl font-bold mt-8 ml-5">
          Restaurants with online food delivery 
        </div>
        <div className="container mx-auto px-4 py-6">
            {imageGridCards.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5" >
                    {imageGridCards.map((card) => (
                     <div key={card.info.id} onClick={() => handleCardClick(card.info.id)} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                     {/* Promoted Badge */}
                     <div className="px-4 py-1 bg-black text-white text-xs font-semibold uppercase">Promoted</div>
                     
                     {/* Image */}
                     <img
                       src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_366/${card.info.cloudinaryImageId}`}
                       alt="Restaurant"
                       className="w-full h-48 object-cover"
                     />
                     
                     {/* Content */}
                     <div className="p-4">
                       {/* Restaurant Name */}
                       <h2 className="text-lg font-bold text-gray-900">{card.info.name}</h2>
                       
                       {/* Description */}
                       <p className="text-sm text-gray-600 mt-1">{card.info.cuisines.join(", ")} </p>
                       <p className="text-sm text-gray-600 mt-1"> {card.info.areaName}</p>
                       {/* Details (Rating, Time, Price) */}
                       <div className="flex items-center justify-between mt-3">
                         <span className="flex items-center text-green-600 text-sm font-semibold">
                           <svg
                             xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor"
                             viewBox="0 0 24 24"
                             width="16"
                             height="16"
                             className="mr-1"
                           >
                             <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                           </svg>
                           {card.info.avgRating}
                         </span>
                         <span className="text-gray-500 text-sm">{card.info.sla.slaString}</span>
                         <span className="text-gray-500 text-sm">{card.info.costForTwo}</span>
                       </div>
                     </div>
                   </div>       
                    ))}
                </div>
            ):(
                <p className="text-gray-500 text-center mt-4">No ImageGrid Cards Found</p>
            )}
        </div>

        {/* <div><button className="rounded border-2 border-black bg-slate-100 text-black" onClick={handleLogout}>LogOut</button></div> */}
       
        

        </div>
      </div>

        
        </>
    )
}