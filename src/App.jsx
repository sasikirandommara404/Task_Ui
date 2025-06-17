import './index.css'
import {Routes,Route} from 'react-router-dom'
import {Home} from'./components/index'
import { Update } from './components/update'
function App() {
 

  return (
    <>
      <div className="h-full w-full mt-[10px] flex flex-col gap-2 items-center justify-center" >
        <Routes>
          <Route path='/' element={<Home></Home>}/>
          <Route path='/update/:id' element={<Update></Update>}/>
        </Routes>
        
    
        

      </div>
    </>
  )
}

export default App
