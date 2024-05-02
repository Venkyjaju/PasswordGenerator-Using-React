import { useCallback, useEffect, useRef, useState } from "react"




function App() {
 const[length,setLength]= useState(8);
const[numberAllowed, setNumbersAllowed]= useState(false);
const[symbolAllowed, setSymbolAllowed]= useState(false);
const[ password,setPassword]=useState("");
//useref hook 
const passwordRef= useRef(null)

const passwordGenerator = useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numberAllowed) str += "0123456789"
  if(symbolAllowed) str += "!@#$%^&*()"

  for(let i=1;i<=length;i++){
   let char= Math.floor(Math.random() * str.length + 1)
   pass += str.charAt(char)
  }
  setPassword(pass)
},[length, numberAllowed,symbolAllowed, setPassword])
 

const copyToClipboard = useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0, password.length);
window.navigator.clipboard.writeText(password)
},[password])

useEffect(()=>{
  passwordGenerator()
},[length, numberAllowed,symbolAllowed, passwordGenerator])
  return (
  <>
 <div className="w-full max-w-lg flex flex-col justify-center mx-auto shadow-md rounded-lg px-4 my-8 py-7 text-orange-500 bg-gray-700 ">
    <div className="text-3xl text-white m-auto text-center bg-red-600">Password Generator</div>
  <div className="flex shadow-md rounded-lg overflow-hidden mb-4">
    <input type="text"
    value={password}
    className="outline-none text-2xl bg-slate-200 text-black font-semibold w-full py-2 px-3 "
    placeholder="password"
    readOnly
    ref={passwordRef}
    />
    <button onClick={copyToClipboard} className="outline-none bg-blue-700 text-white px-3 py-.5 shrink-0 ">Copy</button>
  </div>
  <div className="flex text-sm gap-x-2">
    <div className="flex items-center gap-x-1">
      <input 
      type="range"
      min={8} 
      max={40}
      value={length} 
      className="cursor-pointer" 
      onChange={(e)=>{setLength(e.target.value)}}/>
      <label > Length:{" "+length}</label>
    </div>
    <div className="flex items-center gap-x-1">
    <input type="checkbox"
    defaultChecked={numberAllowed}
    id="numberInput"
    onChange={()=>{setNumbersAllowed((prev)=> !prev)}}    
    />
    <label htmlFor="numberInput">Numbers</label>
    </div>
    <div className="flex items-center gap-x-1">
    <input type="checkbox" defaultChecked={symbolAllowed}
     id="symbolInput" 
     onChange={()=>{
      setSymbolAllowed((prev)=>!prev);
     }}/>
     <label htmlFor="symbolInput">Symbols</label>
    </div>
  </div>
 </div>
  
  
  </>
  )
}

export default App
