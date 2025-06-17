import { useContext,createContext,useState } from "react";

const TaskContext = createContext()
const TaskContexProvider  = ({children})=>{
    const [task,setTask] = useState([])
    return(
        <TaskContext.Provider value = {{task,setTask}}>
            {children}
        </TaskContext.Provider>
    )

}

const useTask = () => useContext(TaskContext)

export {useTask,TaskContexProvider}