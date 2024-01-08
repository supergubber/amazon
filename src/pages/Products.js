import {
  Api,
  ArrowCircleRight,
  Favorite,
  ShoppingCart,
  Star,
} from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { useLoaderData } from 'react-router-dom'
import { addToCart } from '../Redux/splice/amazonSlice'

const Products = () => {
  const dispatch = useDispatch()
  const { data } = useLoaderData()
  console.log(data)
  return (
    <div className='grid gap-6 px-4 mx-auto xl:gap-10 lg:grid-cols-4 grid-col-1 max-w-screen-2xl md:grid-col-2'>
      {data.map((item, index) => (
        <div
          key={index}
          className='bg-white h-auto border-[1px] border-gray-200 py-6 z-30 hover:border-transparent shadow-none hover:shadow-testShadow duration-200 relative flex flex-col gap-y-'
        >
          <span className='absolute text-xs italic text-gray-400 capitalize right-2 top-2'>
            {item.category}
          </span>
          <div className='relative flex flex-row items-center justify-center object-contain w-full h-64 group'>
            <img
              src={item.image}
              alt='item'
              className='object-contain h-64 w-52'
            />
            <ul className='absolute w-full bg-gray-100 h-36 bottom-[-170px] flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-1 border-r group-hover:bottom-0 group-hover:duration-700'>
              <li className='productLi'>
                Compare{' '}
                <span>
                  <Api />
                </span>
              </li>
              <li className='productLi'>
                Add to Cart{' '}
                <span>
                  <ShoppingCart />
                </span>
              </li>
              <li className='productLi'>
                View Details{' '}
                <span>
                  <ArrowCircleRight />
                </span>
              </li>
              <li className='productLi'>
                Add to Wish List{' '}
                <span>
                  <Favorite />
                </span>
              </li>
            </ul>
          </div>
          <div className='z-10 h-full px-4 bg-white'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg tracking-wide font-titleFont text-amazon_blue'>
                {item.title.substring(0, 20)}
              </h2>
              <p className='text-sm font-semibold text-gray-600'>
                ₹ {item.price}
              </p>
            </div>
            <div>
              <p className='mb-1 text-sm'>
                {item.description.substring(0, 100)}...
              </p>
              <div className='text-yellow-500'>
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
            </div>
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    price: item.price,
                    category: item.category,
                    image: item.image,
                    quantity: 1,
                  })
                )
              }
              className='w-full text-base font-medium duration-200 border-yellow-800 hover:border-yellow-900 font-titleFont bg-gradient-to-tr from-yellow-400 to-yellow-200 hover:from-yellow-300 hover:to-yellow-400 active:bg-gradient-to-bl active:form-yellow-400 active:to-yellow-500 py-1.5 rounded-md mt-3 '
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Products
