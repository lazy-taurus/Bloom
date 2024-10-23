import React from 'react'
import { useState } from 'react'
import Navbar from './Navbar'
import Slidebar from './Slidebar'


import Page from './Page'
export default function Main() {
  const [elementsCount, setElementsCount] = useState(0);

  
  const handlePlusClick = () => {
    setElementsCount(elementsCount + 1);
  };
  return (
    <div style={{height:"100%"}} >
      <div className="h-100 d-flex"  >
        <div className='slide3'  >
          <Slidebar handlePlusClick={handlePlusClick} elementsCount={elementsCount} />
        </div>
        <div className="h-100 flex-fill"style={{left:"5%"}} >
          
            <div className="h-100 flex-fill ">
              <Navbar></Navbar>
             <Page elementsCount={elementsCount}></Page>


            </div>
          
        </div>
      </div>
    </div>
  )
}
