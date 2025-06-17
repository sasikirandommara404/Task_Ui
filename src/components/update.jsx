import { useParams } from "react-router-dom"
import {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import { Navigate } from "react-router-dom"
import axios from "axios"
export const Update = ()=>{
    const {id} = useParams()
    const [updatetask,setUpdatedtask] = useState([])
    const [status,setStaus] = useState('false')
    const [inp,setInp] = useState('')
    const navigate = useNavigate()
    useEffect(()=>{
        const func = async ()=>{
            try{
                const feteddata = await axios.get(`https://task-management-two-phi.vercel.app/user/getbyid/${id}`)
                setUpdatedtask(feteddata.data.data)
                console.log('Feteched data from url ',feteddata.data.data)
        
            }catch(err){
                console.log('encountered with error ')

        }
        
        
        }
        func()
        

        

    },[])
    useEffect(()=>{
        if(updatetask){
            setInp(updatetask.title)
        }else{
            setInp(' ')
        }

    },[updatetask])
    const Take_To_Home = ()=>{
        navigate('/')
    }
    const Updated =async()=>{
        try{
            const updated = await axios.put(`https://task-management-two-phi.vercel.app/user/getbyidupdate/${id}`,{
                id:updatetask.id,
                title:inp,
                status:status

            })
            console.log(updated)
            alert('Updated Sucessfully')
            navigate('/')

        }catch(err){
            console.log(err)

        }
    }
    return(
        <>
            <h1 className="font-bold">Update Task</h1>
            <div className="flex flex-row gap-4 items-center">
                
                <input onChange={(e)=>setInp(e.target.value)} className="border-2 rounded border-gray-500  h-8 w-[200px]" type='text' value={inp} placeholder="Update Task"/>
                <select onChange={(e)=>setStaus(e.target.value)} value={String(status)}  className='border-2 rounded border-gray-500 p-1'>
                    <option value="true">Completed</option>
                    <option value="false">Pending</option>
                </select>
                <button  onClick={Updated}className='border p-1 pl-[15px] pr-[15px] rounded hover:bg-gray-900 hover:text-white'>Update</button>
            </div>
            <button onClick={Take_To_Home} className='border p-1 pl-[15px] pr-[15px] rounded '>Home</button>

          
        </>
    )
}