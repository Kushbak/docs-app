import { Routes, Route } from 'react-router-dom'
import Docs from './components/Docs'
import { database } from './firebaseConfig'
import './App.css'
import EditDoc from './components/EditDoc'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Docs database={database} />} />
      <Route path='/editDoc/:id' element={<EditDoc database={database} />} />
    </Routes>
  )
}

export default App
