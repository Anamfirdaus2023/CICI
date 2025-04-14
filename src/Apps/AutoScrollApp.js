import React, { useEffect, useRef, useState } from 'react'
import { useMemo } from 'react'

const AutoScrollApp = () => {
    
      const [input , setInput] = useState(0)
      const [Data , setData] = useState([])
    //   const [Chache , setChache] = useState(false)
    const getData = async ()=>{
        try {
        console.log('input',input);
        const nextSkip = input; 

          const url = `https://dummyjson.com/products?limit=10&skip=${nextSkip}`
          const response = await fetch(url)
          if (!response.ok) {
            throw new Error("http error with code ", response.status);
          };
          const result = await response.json()
        //   console.log(result)
          setData(prev=> [...prev, ...result.products])
            setInput(prev => {
            console.log("Previous input:", prev);
            return prev + 10;
          });
                  } catch (error) {
          console.log('error',error.message)
    
        }
      }

      
const [search , setSearch]=useState('')

const memoizeFunction = useMemo(()=>{
   return   Data.filter(item=>item.title?.toLowerCase().includes(search.toLowerCase())
)
//    console.log('fil',fil)
},[search, Data])

console.log(memoizeFunction)


      const inputRef = useRef();
      const isFirstRender = useRef(true); //  Prevents double fetch

      useEffect(()=>{

        if (isFirstRender.current) {
            isFirstRender.current = false; //  Prevents first double fetch
            return;
          }
      
          
          let observser = new IntersectionObserver(
              (entries)=>{
                  if (entries[0].isIntersecting) {
                    getData()
                }
            },
            {threshold:1}
        )
        if (inputRef.current) {
            observser.observe(inputRef.current)
            
            
        }

        return()=>{
            if (inputRef.current) {
                observser.disconnect();
            }
        }
      },[inputRef.current, search])



  return (
    <div className='container w-1/2 mx-auto'>
      <div className="bg-primary px-2 py-3 flex items-center justify-between">
        <h6></h6>
        <h6></h6>

  <h2 className="text-white text-2xl font-bold text-center">AutoScroll App.</h2>
  <input type="text" className="border p-2" placeholder="Search..."  onChange={(e)=>setSearch(e.target.value)}/>
</div>


<div className="mb-3">
    {
        memoizeFunction?.map((item,index)=><ProductCard key={index}
         imageUrl={item.thumbnail} title={item.title}
          desc={item.description} 
          isStock={item.availabilityStatus}
          price={item.price}
          brand={item.brand || item.category} />)
    }
</div>
 {
    !search.length && 

<div className="my-2 bg-green-400 p-2 rounded-md text-center" ref={inputRef}>
    <h6 className=' text-white font-black'>Loader</h6>
</div>
} 

    </div>
  )
}

export default AutoScrollApp


const ProductCard = ({imageUrl,title,desc,brand,isStock,price})=>{
    return(
        <div className='border px-3 py-2 rounded-md flex mb-3'>
            <div className="flex flex-col basis-1/4 items-center">
<img src={imageUrl} alt="" className='w-[180px]' />
<h6 className='text-[12px] font-semibold text-center'>{title} </h6>
            </div>
            <div className='relative flex-1'>
                <div className="flex justify-between items-center mb-3">
                    <h6></h6>
                <h6 className='text-black text-sm font-semibold'> {brand} </h6>
                <h6 className='text-black text-sm font-semibold'>$ {price} </h6>

                </div>
            <p className=' font-light text-gray-500'>{desc} </p>
            <div className=" absolute right-0 bottom-1 rounded-lg p-2 bg-primary w-[100px] text-center text-sm text-white font-semibold"> {isStock} </div>
            </div>
        </div>
    )
}
