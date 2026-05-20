import { useState } from "react";
import "./main.css";

export default function Main() {
  const [val, setVal] = useState('')

  const clearField = () => {
    setVal("")
  }

  const handleDownload = () => {
    const blob = new Blob([val],{type:'text/plain'})
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = "test.txt"
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
  return (
    <div id="input-container">
      <div id="buttons">
        <button onClick={clearField}>New</button>
        <button onClick={handleDownload}>Save</button>
        <button>Preview</button>
        <button>Settings</button>
      </div>
      <textarea id="input-field" value={val} onChange={(e)=>setVal(e.target.value)}/>
    </div>
  );
}
