
import { getData } from '../context/DataContext'

const Category = () => {
    // const {data} = useContext(DataContext); instead of using this we can use the below one
    const {categoryNames} = getData();

    // const getUniqueCategories = (data, property)=>{
    //   let newVal = data?.map((curElem)=>{
    //     return curElem[property]
    //   })
    //    newVal = [...new Set(newVal)]
    //    return newVal
    // }

    // const categoryOnlyData = getUniqueCategories(data, "category")
    // console.log(categoryOnlyData);
  

    // useEffect(()=>{fetchAllProducts()},[])
  return (
    <div className='bg-[#101829]'>
      <div className="max-w-7xl mx-auto flex gap-4 items-center justify-around py-7 px-4">
        {
            categoryNames?.map((item, index)=>{
              return <div key={index}>
                <button className='uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white rounded-md px-3 py-2 cursor-pointer'>{item}</button>
              </div>
            })
        }
      </div>
    </div>
  )
}

export default Category
