import './App.css'
import {useState, useEffect} from 'react'

function App() {
  const [enabled,setEnabled] = useState(false)//Estado y actualizacion para el boton "Activar efecto"
  const [position,setPosition]= useState({x: 0 ,y: 0})//Inicializar la posicion del div que emula el efecto.
 
  useEffect(()=>{ 
    
    const handleMove = (event) =>{
      const {clientX, clientY} = event
      setPosition({x:clientX,y:clientY})
    }
    //Logica dentro de un efecto y NO un efecto dentro de una logica...
    if(enabled){
      window.addEventListener('pointermove',handleMove)
    }
    return () =>{
      window.removeEventListener('pointermove',handleMove)
    } //Clean previous effect before execute next to avoid issues like events overlap .
  },[enabled])

  return (
    <main>
      <div style={
        {
          position: 'absolute',
          backgroundColor:'grey',
          borderRadius:'50%',
          opacity:0.8,
          pointerEvents:'none',
          left:-20,
          top:-20,
          width: 40,
          height: 40,
          transform: `translate(${position.x}px,${position.y}px)`
        }
      }></div>
      <h2> Mouse-Follower</h2>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Desactivar" : "Activar"} seguir puntero
      </button>
    </main>
  )
}

export default App
