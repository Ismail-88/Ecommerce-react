import { useNavigate } from "react-router-dom";
import { getData } from "../context/DataContext";

const Category = () => {
   const { data } = getData();
  const navigate = useNavigate();

  const categoryNames = [
    ...new Set(data?.map((item) => item.category.name)),
  ];
  return (
    <>
    <div className="bg-[#101829]">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-around py-7 px-4">
        {categoryNames?.map((item, index) => {
          return (
            <div key={index}>
              <button
                onClick={() => navigate(`category/${item}`)}
                className="uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white rounded-md px-3 py-2 cursor-pointer"
              >
                {item}
              </button>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default Category;
