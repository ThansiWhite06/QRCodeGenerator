import { useState } from "react";

function App() {
  const [img,setImg]=useState("");
  const [loading,setLoading]=useState(false);
  const [qrData,setQrData]=useState("thansi");
  const [qrSize,setQrSize]=useState("200");
  async function generateQR(){
    setLoading(true);
    try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    }
    catch(err){
      console.error("Error in generating QR code ",err);
    }
    finally{
      setLoading(false);
    }
  } 
  function downloadQR(){
    fetch(img).then((response)=>response.blob()).then((blob)=>{
      const link=document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch((err)=>{
      console.error("Error in downloading QR Code ",err);
    });
  }
  return (
      <div className="app-container">
        <h1>QR Code Generator</h1>
        {loading && <p>Please wait...</p>}
        {img && <img src={img} className="QRImage"/>}
        <div>
          <label htmlFor="dataInput" className="input-label">Data for QR Code:</label>
          <input type="text" id="dataInput" placeholder="Enter the data for QR Code" onChange={(e)=>setQrData(e.target.value)}/>      
          <label htmlFor="sizeInput" className="input-label">Image size(e.g,200):</label>
          <input type="text" id="sizeInput" placeholder="Enter the data for size" onChange={(e)=>setQrSize(e.target.value)}/>
          <button className="Generate" disabled={loading} onClick={generateQR}>Generate QR Code</button>
          <button className="Download" onClick={downloadQR}>Download QR Code</button>
        </div>
        <p className="footer">Designed by <span>Thansi White</span></p>
      </div>
  )
}

export default App
