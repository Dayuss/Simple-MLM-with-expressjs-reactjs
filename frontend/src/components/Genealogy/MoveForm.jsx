import React, {useState,useEffect} from 'react'
import { toast } from 'react-toastify';
import { useGetMemberQuery, useMoveMutation } from '../../redux/api/memberApi'

const Parent = () => {
    const [parent, setParent] = useState(null)
    const [member, setMember] = useState(null)
    const { data, error, isLoading } = useGetMemberQuery()
    const [insertMove, response] = useMoveMutation();
    
    useEffect(()=>{
        if(response.isError) toast(response.error.msg)
        else if(response.isSuccess){
            toast(`${response.data.msg}`)
        }
    },[response])

    const handleMove = (e) =>{
        if(member===null) toast("Please choose member first.")
        else{
            insertMove({
                 newUplineId: parent==='Without Parent'?null:parent, 
                 memberId: member
             })
            setTimeout(()=>{window.location.reload();},500);
        }
    }
 
  return (
        <>
            <h4 className="mt-10 text-left">Move Parent</h4>
            <div className="flex mb-10">
                  <select
                    onChange={(e)=>setMember(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm  mr-3"
                >
                    <option value={null}>Choose Member</option>
                    {
                        data?.data?.map(item=>(
                            <option value={item.memberId}>{item.fullname}</option>
                        ))
                    }
                </select>
                <select
                    onChange={(e)=>setParent(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                    <option value={null}>Without Parent</option>
                    {
                        data?.data?.map(item=>(
                            <option value={item.memberId}>{item.fullname}</option>
                        ))
                    }
                </select>
                <button
                    type="submit"
                    onClick={handleMove}
                    className="ml-3 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    move
                </button>
            </div>
        </>
  )
}

export default Parent;