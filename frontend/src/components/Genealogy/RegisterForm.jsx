import React, {useState,useEffect} from 'react'
import { faker } from '@faker-js/faker';
import { useGetMemberQuery, useRegisterMutation } from '../../redux/api/memberApi'
import { toast } from 'react-toastify';


const Register = () => {
    
    const [fullname,setFullname]= useState(faker.name.fullName())
    const [parent, setParent] = useState(null)
    const { data, error, isLoading } = useGetMemberQuery()
    const [insertRegister, response] = useRegisterMutation();

    useEffect(()=>{
        if(response.isError) toast(response.error.msg)
        else if(response.isSuccess){
            toast(`${response.data.msg}`)
        }
    },[response])
    const handleRegist = (e) =>{
        insertRegister({
            upline: parent==='Without Parent'?null:parent, 
            fullname
        })

        setFullname(faker.name.fullName());
        
        setTimeout(()=>{window.location.reload();},500);
    }

    return (  
        <>
            <h4 className="mt-10 text-left">Register Member</h4>
            <div className="flex">
                <input
                    type="text"
                    value={fullname}
                    readOnly
                    className="block flex-1 pl-2 mr-3 rounded-none rounded-r-md bg-gray-100 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                <select
                    name="country"
                    placeholder='Choose Parent'
                    onChange={(e)=>setParent(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                    <option value={null}>Without Parent</option>
                    {
                        data?.data?.map(item=>(
                            <option value={item.reffCode}>{item.fullname}</option>
                        ))
                    }
                    
                </select>
                <button
                    type="submit"
                    onClick={handleRegist}
                    className="ml-3 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Register
                </button>
            </div>
        </>
  )
}

export default Register;