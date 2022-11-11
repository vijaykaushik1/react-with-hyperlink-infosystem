import React, { useEffect, useState } from 'react'

const MouseHook = () => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const logMousePosition = e => {
        console.log("Mouse event");
        setX(e.clientX)
        setY(e.clientY)
    }
    useEffect(()=>{
        console.log("useEffect called on Mount")
        window.addEventListener('mouseover', logMousePosition);
    },[])

    useEffect(()=>{
        console.log("useEffect called on udpate")
        window.addEventListener('mouseover', logMousePosition);
    })
  return (
    <>
        Hooks X - {x} || Y - {y}
    </>
  )
}

export default MouseHook