import axios from "axios";
import React, { useEffect, useState } from "react";

function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  console.log("data", data);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  const addToCart = async (item) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/cart",
        item,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(JSON.stringify(response?.data));
    } catch (error) {
      console.log("error in fetching", error);
    }
    console.log("Clicked", item);
  };
  return (
    <div>
      {loading && (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
      <div className="flex flex-wrap border gap-2">
        {data.map((elem, i) => (
          <div
            key={i}
            className="border  w-[400px] h-[400px] p-1 m-auto text-center   "
          >
            <img className="w-40 h-40 m-auto" src={elem.image} alt="" />
            <h1>Title: {elem.title}</h1>
            <h1> $ {elem.price}</h1>
            <p className="overflow-y-auto border h-[20%]">
              Description: {elem.description}
            </p>
            <p>Rating: {elem.rating.rate}</p>
            <button className="bg-red-600 p-1" onClick={() => addToCart(elem)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
