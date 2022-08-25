import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css'
import "./DropDown.css"



export const DropDown = () => {
  return (
    <div className='dropDownContainer'>
      <div className='dropDownWrapper'>
        <div className='dropDownTitle'>
          <p> Tx Type</p>
        </div>
        <div className='dropDown'>
          <DropdownButton id="dropdown-basic-button" title="All Types"  size="sm"   variant=''>
            <Dropdown.Item href="#/action-1">Transfer</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Unfreeze</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div >

  );
}