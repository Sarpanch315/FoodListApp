import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addMenu } from "../Store/restaurantMenuSlice";
import { addToCart } from "../Store/cartSlice";
import RestaurantMap from "./RestaurantMap";

const RestaurantDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown toggle state
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const dataRest = useSelector(
    (state) =>
      state.restaurantMenu.restaurantMenu.data.cards[4]?.groupedCard
        ?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards
  );

  const HotelInfo = useSelector(
    (state) => state.restaurantMenu.restaurantMenu.data.cards[2]?.card.card.info
  );
  const DishData = useSelector(
    (state) =>
      state.restaurantMenu.restaurantMenu.data.cards[4]?.groupedCard
        ?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.title
  );
  const imageGridCards = dataRest || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.2124&lng=78.1772&restaurantId=${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();

        if (result?.data?.cards) {
          dispatch(addMenu(result?.data?.cards));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const onAddToCart = (card) => {
    const data = {
      id: card.card.info.id,
      name: card.card.info.name,
      description: card.card.info.description || card.card.info.category,
      price: card.card.info.price / 100 || card.card.info.defaultPrice / 100,
      img: card.card.info.imageId,
    };

    if (!user) {
      const savedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
      savedCart.push(data);
      sessionStorage.setItem("cart", JSON.stringify(savedCart));
      navigate("/login");
    } else {
      dispatch(addToCart(data));
    }
  };
  // const [latitude, longitude] = HotelInfo.latLong.split(',');

  if (loading) {
    return (
      <div className="flex mt-2 items-center justify-center min-h-screen flex-col">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>

        {/* Loading message below the spinner */}
        <div className="mt-4 text-lg text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <div className="p-6 bg-gray-100 rounded-lg  shadow-lg flex flex-row">
        {/* Image Section */}
        <div className="bg-white  p-4 mb-6 basis-3/4 ">
          <div className="">
            <img
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${HotelInfo.cloudinaryImageId}`}
              alt={HotelInfo.name}
              className="w-full h-96 object-cover rounded-md mb-4"
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg justify-end">
            <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-4">
              {HotelInfo.name}
              {HotelInfo.isOpen ? (
                <span className="text-sm text-white bg-green-600 px-3 py-1 rounded-full">
                  Open
                </span>
              ) : (
                <span className="text-sm text-white bg-red-600 px-3 py-1 rounded-full">
                  Closed
                </span>
              )}
            </h1>
            <p className="text-gray-700 text-lg mt-2">
              <strong>Category:</strong>{" "}
              {HotelInfo.cuisines?.join(", ") || "N/A"}
            </p>
            <p className="text-green-800 text-lg font-semibold mt-1">
              <strong>Rating:</strong> {HotelInfo.avgRating || "No Rating"}
            </p>
            <p className="text-gray-700 text-lg mt-1">
              {HotelInfo.areaName}, {HotelInfo.locality}
            </p>
          </div>
        </div>
        {/* Map Section */}
        <div className="basis-1/4 bg-white p-4 mb-4 ">
            <div className="w-96 h-full  rounded-lg  shadow-lg">
              <RestaurantMap info={HotelInfo.latLong} />
            </div>
          </div>
      </div>

      {/* Dropdown Section */}
      <div className="p-8   shadow-lg bg-gray-100 ml-4 mr-4">
        <p className="bg-white-100 text-3xl text-gray  border border-gray-400  shadow  cursor-pointer  duration-300 ease-in-out px-4 py-2py-2 pl-32 rounded-lg mr-60 ml-60 pt-3 pb-3 font-bold hover:text-green-500 transition flex justify-between items-center">
          {DishData}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-white text-gray-600 hover:text-green-400 rounded  border-2 px-2 py-1"
          >
            {dropdownOpen ? "Hide" : "Show"}
          </button>
        </p>

        {dropdownOpen && ( // Show cards if dropdown is open
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-4 ml-60 mr-60 transition ease-out">
            {imageGridCards.length > 0 ? (
              imageGridCards.map((card) => (
                <div
                  key={card.card.info.id}
                  className="bg-white border border-gray-200 rounded-lg shadow overflow-hidden p-4 flex flex-col transition ease-in-out"
                >
                  {/* Dish Image */}
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${card.card.info.imageId}`}
                    alt={card.card.info.name}
                    className="w-full h-48 object-cover rounded-md"
                  />

                  {/* Dish Info */}
                  <div className="mt-2 flex-grow">
                    <h2 className="text-lg font-bold text-gray-900">
                      {card.card.info.name}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Category:</strong> {card.card.info.category}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Description:</strong> {card.card.info.description}
                    </p>
                    <p className="text-lg font-semibold text-green-900 mt-2">
                      ₹
                      {card.card.info.price / 100 ||
                        card.card.info.defaultPrice / 100}
                    </p>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => onAddToCart(card)}
                    className="mt-4 border border-gray-100 text-gray-500  font-bold py-2 px-4 rounded transition transform active:bg-green-900 active:scale-95 hover:bg-green-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center mt-4">No Dishes Found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetails;
