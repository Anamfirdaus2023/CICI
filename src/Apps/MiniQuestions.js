import React, { useState } from 'react'

const MiniQuestions = () => {
    // 1-
    const [inp , setInp]=useState('')
    // 1st question end 

    // 2- FormValidation
    const [Error,setError]=useState({}); 
    const [formData,setFormData]=useState({
        name:'', // only letter min-3 max-0 50  char
        email:'',
        phone:'',
        age:'',
        passowrd:'',
        confirmPassowrd:''

    });


    const validate = ()=>{
        let newError = {}
        const nameRegex = /^[a-zA-Z\s]{3,50}$/
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let phoneRegex = /^\d{10}$/;
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

        if (!nameRegex.test(formData.name)) {
            newError.name = 'write a propper name with only letter in between 3 to 10 charectors'
        }

        if (!emailRegex.test(formData.email)) {
            newError.email = 'enter a valid email abc@gmail.com '

        }

        if (!phoneRegex.test(formData.phone)) {
            newError.phone = 'mobile number should be 10 '
        }

        if (formData.age<18 || formData.age>60 || isNaN(formData.age)) {
            newError.age = 'age should be in between 18 to 60 '
        }
        if (!passwordRegex.test(formData.passowrd)  ) {
            newError.passowrd = 'use atleast should be one upper carse one lpweer case one special char. one number  8-15'

        }
        if (!passwordRegex.test(formData.confirmPassowrd)  ) {
            newError.confirmPassowrd = 'use atleast should be one upper carse one lpweer case one special char. one number  8-15'
        }
        if (formData.passowrd !== formData.confirmPassowrd) {
            newError.confirmPassowrd = 'passwrod is not mached'

        }
        
        console.log('newError',newError)
        setError(newError)

        return Object.keys(newError).length === 0
    }
    const handleChange = (e)=>{
        const {name,value}=e.target
        setFormData(pre=>({
            ...pre,
            [name]:value
        }))
        if (name === 'passowrd' || name === 'confirmPassowrd') {
            setError(prev => ({
                ...prev,
                confirmPassowrd: 
                    name === 'passowrd'
                        ? value !== formData.confirmPassowrd && formData.confirmPassowrd !== ''
                            ? 'Passwords do not match'
                            : ''
                        : formData.passowrd !== value
                            ? 'Passwords do not match'
                            : ''
            }))} else{

    setError(prev=>({
        ...prev,
        [name]: '',
        confirmPassowrd:''
    }))
}
    }
console.log(Error)
    const handleSubmit= (e)=>{
        e.preventDefault()
        if (validate() || !Error.length) {
            console.log(formData)
            
        }
    }
  return (
    <div className='container w-1/2  mx-auto'>
            <h2 className=' p-2 bg-primary text-white text-center  w-full text-2xl font-bold'>Mini App.</h2>
<div className='my-2'>
<div className='mb-2'>
    <p>1- When i add number then that much of boxes should rendered</p>

<input type="number" name="" id="" onChange={(e)=>setInp(parseInt(e.target.value))}  className=' border w-full p-2 pe-8' />

<div className="flex flex-wrap my-3 gap-3">
    
    { inp>0 && [...Array(inp).keys()].map((item , index)=>{
            return (

<div className="bg-primary w-[100px] h-[100px] p-2 text-center flex justify-center items-center" key={index}> {item+1} </div>
            )
        })}

</div>

</div>
<div className="mb-2">
<p className='mb-2'>2- Form Validation</p>
{/* 
<form action="" className='flex flex-wrap justify-between items-center gap-y-5' onSubmit={handleSubmit}>
    <div className=' w-[45%]'>
<input type="text" name="name" id="" onChange={handleChange} value={formData.name} placeholder='name' className=' w-full border w-full p-2 pe-4' />
<p className=' text-[10px] text-red-600'>{Error.name}</p>
    </div>
    <div className=' w-[45%]'>
    <input type="text" name="email" id="" onChange={handleChange} value={formData.email} placeholder='email' className=' w-full border w-full p-2 pe-4' />
    <p className=' text-[10px] text-red-600'>{Error.email}</p>
    </div>
    <div className=' w-[45%]'>
    <input type="number" name="phone" id="" onChange={handleChange} value={formData.phone} placeholder='phone' className=' w-full border w-full p-2 pe-4' />
    <p className=' text-[10px] text-red-600'>{Error.phone}</p>
    </div> 
    <div className=' w-[45%]'>
    <input type="number" name="age" id="" onChange={handleChange} value={formData.age} placeholder='age' className=' w-full border w-full p-2 pe-4' />
    <p className=' text-[10px] text-red-600'>{Error.age}</p>
    </div> 
    <div className=' w-[45%]'>
    <input type="text" name="passowrd" id="" onChange={handleChange} value={formData.passowrd} placeholder='passowrd' className=' w-full  border w-full p-2 pe-4' />
    <p className=' text-[10px] text-red-600'>{Error.passowrd}</p>
    </div> 
    <div className=' w-[45%]'>
    <input type="text" name="confirmPassowrd" id="" onChange={handleChange} value={formData.confirmPassowrd} placeholder='confirmPassowrd' className=' w-full border w-full p-2 pe-4' />
    <p className=' text-[10px] text-red-600'>{Error.confirmPassowrd}</p>
    </div> 
<button className='px-2 py-1 w-1/4 bg-secondary text-primary uppercase mx-auto' type='submit'>submit</button>
</form> */}

<form action="" className='flex flex-wrap justify-between items-center gap-y-5' onSubmit={handleSubmit}>
    {['name','email','phone','age','passowrd','confirmPassowrd'].map((item,index)=>{
        return ( 

            <div className=' w-[45%]' key={item}>
            <input type="text" name={item} id="" onChange={handleChange} value={formData.item} placeholder={item} className=' w-full border w-full p-2 pe-4' />
            <p className=' text-[10px] text-red-600'>{Error[item]}</p>
                </div>
    )
    })
}
<button className='px-2 py-1 w-1/4 bg-secondary text-primary uppercase mx-auto' type='submit'>submit</button>

</form>
</div>
</div>
    </div>
  )
}

export default MiniQuestions
