import React, { useEffect, useState } from 'react'

const Application = () => {

    const [Amount, setAmount] = useState(20)
    const content = [
        {
            id: 1,
            name: 'row House',
            imgUrl: 'https://react2eb4af6.onrender.com/imgs/00.png',
            metaData: {
                price: 5,
                rent: 2,
                level: 0,
                time: 3,
            }
        },
        {
            id: 2,
            name: '1 BHK',
            imgUrl: 'https://react2eb4af6.onrender.com/imgs/00.png',
            metaData: {
                price: 10,
                rent: 5,
                level: 0,
                time: 6,
            }
        },
        {
            id: 3,
            name: '2 BHK',
            imgUrl: 'https://react2eb4af6.onrender.com/imgs/00.png',
            metaData: {
                price: 10,
                rent: 5,
                level: 0,
                time: 60,
            }
        }
    ]

    const [Data, setData] = useState(content)
    const [TrackRecord, setTrackRecord] = useState([])
const [count , setCount]=useState(10)
    const [countDown , setCountDown]=useState(false)
    useEffect(()=>{
if (countDown && count > 0) {

    

    let timer =  setInterval(() => {
        // console.log('timeris on')
        setCount(prev=> {
            if (prev === 1) {
                // clearInterval(timer)
                setAmount(prev=> prev + prev* 0.02)
                // resetTimer()
                // setCount(true)
                return 10   
            }
            
            return prev - 1
        })
        
    }, 1000);

   return()=>{clearInterval(timer)}
    
}
    },[countDown])

    return (
        <div className='container w-1/2 mx-auto'>
            <div className="flex items-center justify-between p-2 bg-primary">
                <h2 className='w-[40px] flex justify-center items-center p-2 bg-black text-white rounded-full'>{count}</h2>
            <h2 className=' bg-primary text-white  text-2xl font-bold  text-center'>Managing App.</h2>
            <button className=' bg-red-500 px-2 py-1 shadow-md text-white text-[12px] min-w-[75px]' onClick={()=>setCountDown(true)} >Start</button>

            </div>
            <div className="my-2">
                <div className="border  border-sky-400 rounded-lg p-4 flex mb-5">
                    <h6 className='p-1 border border-pink-600 flex-1 text-center font-bold text-xl'>$ {Amount.toFixed(2)}</h6>
                    <button className=' uppercase px-2 py-1 bg-black text-white rounded-sm '>save</button>
                </div>
                <div className=" border border-sky-400 p-4 rounded-lg">
                    {
                        Data.map((item, index) => <CardData key={item.id} name={item.name}
                            imgUrl={item.imgUrl} metaData={item.metaData}
                            id={item.id} setAmount={setAmount} Amount={Amount}
                            setData={setData}  setTrackRecord={setTrackRecord} TrackRecord={TrackRecord} setCount={setCount} />)
                    }

                </div>
            </div>
            <div className="my-2">
                <div className=" text-end mb-1 mt-2">
            <button className=' bg-primary px-2 py-1 rounded-md text-white text-[12px] min-w-[75px]' onClick={() => setTrackRecord([])}>Clear History</button>
                </div>
            <TransectionHistory setTrackRecord={setTrackRecord} TrackRecord={TrackRecord} />
            </div>

        </div>
    )
}

export default Application


const CardData = ({ name, imgUrl, metaData, id, setAmount, Amount, setData , setTrackRecord ,setCount }) => {

    const date = new Date()
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        // console.log('date',time)

        

                    
let formData = {
    id: null,
    name:'',
    spend:null,
    action:'',
    amount:null,
    time:time
}

    const handleBuy = (item, id , name) => {
        if (Amount >= metaData.price) {
            setCount(10)
               setAmount(prev => prev - item.price);
                setData(prev =>
                prev.map(key => key.id === id ?
                    {
                        ...key,
                        metaData: {
                            ...key.metaData,
                            level: key.metaData.level + 1,
                        }

                    } : key)
            ) 
            //updating formData    
            formData.id = Date.now()               
            formData.spend = item.price
            formData.amount = Amount - item.price
            formData.action = 'Buy'
            formData.name = name

                setTrackRecord(prev=>[ 
                    formData,
                    ...prev
                ])
            
// console.log('item',item)
        } else {
            alert('You dont have enough money to buy this house.')
        }
    }

    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)

    const handleRent = (id) => {
        if (!loading) {
            setCount(10)
            setLoading(true)
            // console.log('id',id)
        }
    }

    // console.log('TrackRecord in rent', TrackRecord)

    useEffect(() => {
        if (loading) {
            let timer = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        // console.log('if bloack ',prev)
                        setLoading(false)
                       setAmount(Amount + (metaData.rent * metaData.level))
                        setTrackRecord(prev=>{
                            const newFormData = { 
                                ...formData,  // Copy previous values
                                id: Date.now(),
                                spend: (metaData.rent * metaData.level), 
                                amount: Amount + (metaData.rent * metaData.level), 
                                action: 'Rent', 
                                name: name 
                            }
                            setCount(10)

                return    [newFormData, ...prev]
                })

                        return 0
                    }
                    // console.log( 'else block ',prev + 10 )
                    return prev + 1
                })
            }, Math.ceil(metaData.time * 10));

            return () => {
                clearInterval(timer)
            }
        }
    }, [loading]);


    const handleSell = (item, id)=>{

        if (item.level>0 ) {
            setCount(10)
            setAmount(Amount + item.price)
        }
        setData(pre=>
             pre.map((item)=> {
               if (item.id === id) {
                // console.log('previous data',item)
                   const updatedData = {
                    ...item,
                    metaData:{
                        ...item.metaData,
                        level: Math.max(item.metaData.level - 1 , 0 )
                    }
                   }
                //    console.log('updatedData',updatedData)
                   return updatedData
            } 
            return item
           }

           
                
            )
        
        )

   //updating formData    
   formData.id = Date.now()               
   formData.spend = (item.price * item.level)
   formData.amount = Amount + item.price
   formData.action = 'Sell'
   formData.name = name
                setTrackRecord(prev=>[ 
                    formData,
                    ...prev
                ])
    }
    return (
        <div className='border border-green-400 py-3 px-2 rounded-lg mb-3'>
            <div className="flex justify-between  items-center">
                <div className=" flex flex-col justify-center items-center">
                    <img src={imgUrl} alt="" className='w-[75px]' />
                    <h6 className='text-[11px] text-black font-bold'>{name} </h6>
                </div>
                <div className=" flex flex-col justify-center items-center gap-y-3 w-1/2">
                    <h6 className='  text-sm'> {JSON.stringify(metaData)} </h6>
                    {loading &&
                        <div className='h-[8px] w-full border  border-green-700 bg-slate-100 rounded-lg'> <p className={`h-full bg-green-600 animate-pulse`} style={{ width: `${progress}%` }}></p></div>
                    }
                </div>

                <div className=' flex flex-col gap-y-1'>
                    <button className=' bg-black px-2 py-1 rounded-md text-white text-[12px] w-[75px]' disabled={loading} onClick={() => handleBuy(metaData, id , name )}>Buy</button>
                    {
                        metaData.level > 0 &&
                        <>
                            <button className=' bg-primary px-2 py-1 rounded-md text-white text-[12px] w-[75px]' onClick={() => handleRent(id)}>Rent</button>
                            <button className=' bg-red-500 px-2 py-1 rounded-md text-white text-[12px] w-[75px]' onClick={()=>handleSell(metaData, id)}>Manage</button>
                        </>
                    }

                </div>
            </div>
        </div>
    )
}


const TransectionHistory = ({TrackRecord})=>{
    return(
        <table className='table w-full'>
                <thead className=''>
            <tr className=' bg-gray-200'>
                    <th className='w-1/5 border p-2  text-center '>Sr.No </th>
                    <th className='w-1/5 border p-2  text-center '>Home Name </th>

                    <th className='w-1/5 border p-2  text-center '>Spend</th>
                    <th className='w-1/5 border p-2  text-center '>Action </th>
                    <th className='w-1/5 border p-2  text-center '>Amount</th>
                    <th className='w-1/5 border p-2  text-center '>Time</th>
            </tr>
                </thead>
            <tbody>
                {
                    TrackRecord?.map((item,index)=>{
                        return(
<tr key={item.id}>
                <th className='w-1/5 border p-2 text-center'>{index+1} </th>
                <td className='w-1/5 border p-2 text-center'> {item.name} </td>
                <td className='w-1/5 border p-2 text-center'> {item.spend} </td>
                <td className='w-1/5 border p-2 text-center'> {item.action} </td>
                <td className='w-1/5 border p-2 text-center'>{item.amount.toFixed(2)} </td>
                <td className='w-1/5 border p-2 text-center'>{item.time} </td>
                </tr>
                        )
                    })
                }
                

            </tbody>
        </table>
    )
}