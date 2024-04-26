'use client'
import './styles.css'
import NavBar from "./components/NavBar.js"

export default function Home() {
  
 

  return (
    <main className= 'main'>
      
      
      <NavBar></NavBar>
      <div className = 'content'>Welcome to MEDMAP</div>
      <div className="subcontent">MedMap is an interactive site where we have mapped user inputted data of medication based on effectiveness onto a real-time updating network map. You can see what medication
        people have used and how effective it was. We would love your input on your medical condition, which medication you took, and the effectiveness of the medication. You may also use our medication search tool to determine 
        other names for medication you may not be familiar with.
      </div>
      <div className="disclaimer">*Disclaimer: The information provided on this website is for general informational purposes 
      only and is not intended as medical advice.*</div>

      
    </main>
  );
}