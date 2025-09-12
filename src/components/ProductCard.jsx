import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  // console.log(product);
  return (
    <div className="border relative border-gray-100 aspect-square rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-auto">
      <img
        src={product.images}
        alt={product.title}
        className="bg-gray-100 aspect-square"
        onClick={()=>navigate(`/products/${product.id}`)}
      />
      <h1 className="line-clamp-2 p-1 font-semibold ">{product.title}</h1>
      <p className="my-1 text-lg text-gray-800 font-bold">${product.price}</p>
      <button className="bg-red-500 px-3 py-2 text-lg rounded-md text-white w-full cursor-pointer flex gap-2 items-center justify-center font-semibold">
        <IoCartOutline className="h-6 w-6"/>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;