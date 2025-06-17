import {useTask} from '../context/index'
import {useEffect} from 'react'
import axios from 'axios'
import {v4 as uuid} from 'uuid'
import {useState} from 'react'
import {NavLink} from 'react-router-dom'
export const Home =()=>{
    const {task,setTask}  =useTask()
    const [addtask,setaddTask] = useState('')
    const [status,setStatus] = useState('')
    useEffect(()=>{
        const fun = async()=>{
            try{
                const data = await axios.get('https://task-management-two-phi.vercel.app/user')
                setTask(data.data)
                console.log('FUll Response')

            }catch{
                console.log('failed to fetch data')

            }
        }
        fun()

    },[task])
    console.log(task)
    const Add_Task = async ()=>{
        try{
            const user = await axios.post('https://task-management-two-phi.vercel.app/user/newtask',{
                id:uuid(),
                title:addtask,
                status:status
            })
            console.log(user)
            alert('Sucessfully inserted')

        }catch(err){
            console.log(err)
            alert('No Task was Added')

        }
    }
    const Delete_Task = async (id)=>{
        try{
            const Deleted = await axios.delete(`https://task-management-two-phi.vercel.app/user/deletebyid/${id}`)
            console.log(Deleted)
            alert("Deleted Sucessfully")

        }catch(err){
            console.log(err)

        }

    }
    return(
        <>
            <h1 className="font-bold">Add Task</h1>
            <div className="flex flex-row gap-4 items-center">
                
                <input  onChange={(e)=>{
                    setaddTask(e.target.value)
                    console.log(addtask)
                }} className="border-2 rounded border-gray-500  h-8 w-[200px]" type='text' placeholder="Add Task"/>
                <select onChange={(e)=>{
                    setStatus(e.target.value)
                    console.log(e.target.value)
                }} className='border-2 rounded border-gray-500 p-1'>
                    <option value={true}>Completed</option>
                    <option value={false}>Pending</option>
                </select>
                <button onClick={Add_Task} className='border p-1 pl-[15px] pr-[15px] rounded hover:bg-gray-900 hover:text-white'>Submit</button>
            </div>
            <div className="flex flex-col gap-2 ">
                {
                    task&&task.length>0?(task.map((pro)=>{
                        return(
                            <div className="flex flex-row gap-4 items-center  p-2 shadow-xl/30 overflow border" key={pro.id}>
                                <p>{pro._id}</p>
                                <p>{pro.title}</p>
                                <button className='border pl-2 pr-2 rounded'>{pro.status?'Completed':'Pending'}</button>
                                <p>Created At &nbsp;<br></br>{pro.createdAt}</p>
                                <button className='border pl-2 pr-2 rounded' ><NavLink to={`/update/${pro.id}`}>Update</NavLink></button>
                                <button onClick={()=>Delete_Task(pro.id)}className='border pl-2 pr-2 rounded'>Delete</button>

                            </div>
                        )
                    })):<p>No tasks Found</p>


                }
            </div>
        </>
    )

}