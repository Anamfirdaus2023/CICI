import React, { useEffect, useRef, useState } from 'react'

export default function SearchbarApp() {
  const url = `https://dummyjson.com/recipes/search?q=` 

  const [input , setInput] = useState('')
  const [Data , setData] = useState([])
  const [Show , setShow] = useState(false)
  const [Chache , setChache] = useState(false)

  const getData = async ()=>{
  try {
    if (Chache[input]) {
      setData(Chache[input])
      console.log('data is coming from chache',Chache)

      return 
    }
      const response = await fetch(url+input)
      if (!response.ok) {
        throw new Error("http error with code ", response.status);
      };
      const result = await response.json()
      console.log(result.recipes)
      setData(result.recipes)
      setChache(prev=>({
        ...prev,
        [input]:result.recipes
      }))
    } catch (error) {
      console.log('error',error.message)

    }
  }
  

  useEffect(()=>{
  let timer = setTimeout(getData ,300)
  return()=>{
    clearTimeout(timer)
  }
  },[input])

  //when click on outise of table then it show off
  const inpRef = useRef()

  useEffect(()=>{
    const handleClickOutSide = (e)=>{
      if (inpRef.current && !inpRef.current.contains(e.target)) {
        setShow(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutSide)

    return()=>{
      document.removeEventListener('mousedown', handleClickOutSide)

    }
  },[])

  const [selectedIndex, setSelectedIndex]=useState(-1)
const handleKeyDown = (e)=>{
if (e.key === 'ArrowDown') {
  setSelectedIndex(prev=> Data.length -1 ? prev+1 : prev )
}else if (e.key === 'ArrowUp') {
  setSelectedIndex(prev=> prev>0 ? prev-1 : 0 )
}else if (e.key === 'Enter' && selectedIndex !==-1) {
  setInput(Data[selectedIndex].name)
}

// console.log('selectedIndex',Data[selectedIndex])
  }
  return (
    <div className='container'>
      <h2 className=' p-2 bg-primary text-white text-center w-1/2 mx-auto text-2xl font-bold'>Searchbar App.</h2>
      <div className="my-2 w-1/2 mx-auto">
      <div className=" relative">
        <input type="text" name="" value={input}
         onChange={(e)=>setInput(e.target.value)} 
         id=""  onFocus={()=> setShow(true)}
         onKeyDown={handleKeyDown}
        //  onBlur={()=> setShow(false)}
         className=' border w-full p-2 pe-8' />
        <i className="fa-solid fa-circle-xmark text-red-400 text-2xl absolute right-2 top-1 cursor-pointer" onClick={()=>{setInput('') ; setShow(true)}}></i>
      </div>
      {
        Show && 
      <ul ref={inpRef} className="border w-full max-h-[500px] overflow-y-scroll">
        {
          !Data.length ? <li className='px-2 py-1 border bg-green-300 cursor-pointer'>No Result Found</li> 
          :
         Data?.map((item,index)=><DataTable key={index} index={index} name={item.name} setInput={setInput} selectedIndex={selectedIndex}/>)
        }
      </ul>
        }
      </div>
    </div>
  )
}

const DataTable = ({setInput, name, selectedIndex , index})=>{
  return <li className={`px-2 py-1 border hover:bg-green-300 cursor-pointer ${selectedIndex=== index && 'bg-green-300'}`} onClick={()=>setInput(name)}>{name}</li>
} 


