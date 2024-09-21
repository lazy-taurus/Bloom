import React from 'react';

import './components/MAIN.css';
import './App.module.css';
import Navbar from './components/Navbar';
import Slidebar from './components/Slidebar';

export default function Homs() {
  return (
    <div>
      <Slidebar></Slidebar>
      <Navbar></Navbar>
      <div className='rectangle1'>
        <div className='rectangle8 form-floating'>
          <textarea
            class='form-control text'
            placeholder='Leave a comment here'
            id='floatingTextarea'
          ></textarea>
          <label for='floatingTextarea'></label>
        </div>
      </div>
      <div className='frame2'>
        <div className='rectangle7'>hi</div>
        <div className='IconPeople'>
          <div className='helpSupport'>Help &amp; Support</div>
        </div>
      </div>
    </div>
  );
}
