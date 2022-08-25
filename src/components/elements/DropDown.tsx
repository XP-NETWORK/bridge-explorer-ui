import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css'
import "./DropDown.css"

export const DropDown = () => {

  const [value, setValue] = useState('All Types');

  const handleSelect = (e: any) => {
    console.log(e);
    setValue(e)
  }

  return (
    <div className='dropDownContainer'>
      <div className='dropDownWrapper'>
        <div className='dropDownTitle'>
          <p> Tx Type</p>
        </div>
        <div className='dropDown'>
          <DropdownButton onSelect={handleSelect} id="dropdown-basic-button" title={value} size="sm" variant=''>
            <Dropdown.Item eventKey="Transfer" >Transfer</Dropdown.Item>
            <Dropdown.Item eventKey="Unfreeze" >Unfreeze</Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
    </div >

  );
}