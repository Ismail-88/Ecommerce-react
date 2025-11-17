import { useNavigate, useParams } from "react-router-dom";
import { getData } from "../context/DataContext";
import { useEffect } from "react";

const Category = () => {
   const { data,fetchProductsByCategoryName } = getData();
  const navigate = useNavigate();

 const { slug } = useParams();

   useEffect(() => {
    if (slug) {
      fetchProductsByCategoryName(slug);
    } else {
      console.warn('Category slug is undefined or missing');
    }
  }, [slug]);

  const categoryNames = [...new Set(data?.map(item => item.category?.slug).filter(Boolean))];
  return (
    <>
    <div className="bg-[#101829]">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-around py-7 px-4">
        {categoryNames?.map((item, index) => {
          const slug = item.toLowerCase().replace(/\s+/g, "-"); // convert name → slug
          return (
            <div key={index}>
              <button
                onClick={() => navigate(`category/${slug}`)}
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
