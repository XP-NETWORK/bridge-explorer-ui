import withModal from "../../context/withModal";
import DatePicker from "react-datepicker";
import moment from "moment";
import { compose } from "../Details/helpers";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import close from "../../assets/img/close.svg";
import calendar from "../../assets/img/calendar.svg";
import { url } from "../../constants";
import { useSelector } from 'react-redux'
import { ReduxState } from "../../store";
import { ChainSwitch } from "./chainSwitch"
import { DropDown } from "./DropDown"
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { setEventsQueryStringType } from "../../store/global";
import { useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./Buttons.css"

const Filter = ({ onClose }: { onClose: () => boolean }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState('All Types');

    const handleSelect = (e: any) => {
        console.log(e);
        if (e === 'All Types')
            dispatch(setEventsQueryStringType(undefined));
        else {
            dispatch(setEventsQueryStringType(e));
        }
        setValue(e)
    }
    const [startDate, setStart] = useState<Date | "">(
        "" //moment().subtract(1, "month").toDate()
    );
    const [isSettingDate, setIsSetting] = useState([false, false]);
    const [endDate, setEnd] = useState<Date | "">("");
    const [captchaRender, setCaptchaRender] = useState(false);

    const { eventsQueryString } = useSelector((state: ReduxState) => ({ page: state.global.page, eventsQueryString: state.global.eventsQueryString }))

    const onSetStart = (date: Date) => {
        if (!moment(date).isAfter(endDate)) {
            setStart(date);
        }
    };

    const onSetEnd = (date: Date) => {
        if (!moment(date).isBefore(startDate)) {
            setEnd(date);
        }
    };

    const onClickDownload = async () => {
        if (!startDate || !endDate) return;
        setCaptchaRender(true);
        // @ts-ignore
        window?.grecaptcha.render("CSVCaptchaContainer", {
            // @ts-ignore
            sitekey: window.SITE_KEY_CAPTCHA,
            callback: async function (token: string) {
                const res = await fetch(
                    `${url}csv?startDate=${startDate}&endDate=${endDate}&searchQuery=${eventsQueryString}&token=${token}`
                );
                //console.log(await res.json());
                if (res && res.ok) {
                    const blob = await res.blob();
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    //link.download = res.headers.get('fileName');
                    link.click();
                }

                setCaptchaRender(false);
            },
        });
    };

    return (
        <>
            <h2>Filters</h2>
            <div className="divider"></div>
            <p className="modalText">
                <span>
                    {onClose && (
                        <img
                            src={close}
                            className="closeModal"
                            alt="close"
                            onClick={onClose}
                        />
                    )}
                </span>
            </p>
            <div>
                <div className='modalDropDownContainer'>
                    <div className='dropDownWrapper'>
                        <div className='dropDownTitle'>
                            <p> Tx Type</p>
                        </div>
                        <div className='dropDown'>
                            <DropdownButton onSelect={handleSelect} id="dropdown-basic-button" title={value} size="sm" variant=''>
                                <Dropdown.Item eventKey="All Types" >All Types</Dropdown.Item>
                                <Dropdown.Item eventKey="Transfer" >Transfer</Dropdown.Item>
                                <Dropdown.Item eventKey="Unfreeze" >Unfreeze</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </div>
                </div >
                <br />
                <div className='modalDropDownContainer'>
                    <div className='dropDownWrapper'>
                        <div className='dropDownTitle'>
                            <p> Tx Type</p>
                        </div>
                        <div className='dropDown'>
                            <DropdownButton onSelect={handleSelect} id="dropdown-basic-button" title={value} size="sm" variant=''>
                                <Dropdown.Item eventKey="All Types" >All Types</Dropdown.Item>
                                <Dropdown.Item eventKey="Transfer" >Transfer</Dropdown.Item>
                                <Dropdown.Item eventKey="Unfreeze" >Unfreeze</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </div>
                </div >
                <br />
            </div>
            <div style={{ textAlign: "right" }}>
                <button className="csvBtn w-full md:w-fit" onClick={onClickDownload}>
                    Show Resaults
                </button>
            </div>
            <div style={{ textAlign: "right" }}>
                <button className="csvBtn w-full md:w-fit" onClick={onClickDownload}>
                    Clear All
                </button>
            </div>
            <div
                id="CSVCaptchaContainer"
                style={{ display: captchaRender ? "block" : "none" }}
            ></div>
        </>
    );
};

const FilterButton = ({ openModal }: { openModal?: () => void }) => {
    return (
        <button
            className="FilterButton bg-[#EEEEF2] text-[#222222] px-2 flex items-center space-x-1 p-1 hover:bg-[#235EF5] hover:text-white rounded"
            onClick={openModal}
        >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 4.5C15 4.22386 14.7761 4 14.5 4H12.95C12.7 2.85 11.7 2 10.5 2C9.3 2 8.3 2.85 8.05 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H8.05C8.3 6.15 9.3 7 10.5 7C11.7 7 12.7 6.15 12.95 5H14.5C14.7761 5 15 4.77614 15 4.5ZM10.5 6C9.65 6 9 5.35 9 4.5C9 3.65 9.65 3 10.5 3C11.35 3 12 3.65 12 4.5C12 5.35 11.35 6 10.5 6ZM1 11.5C1 11.7761 1.22386 12 1.5 12H3.05C3.3 13.15 4.3 14 5.5 14C6.7 14 7.7 13.15 7.95 12H14.5C14.7761 12 15 11.7761 15 11.5C15 11.2239 14.7761 11 14.5 11H7.95C7.7 9.85 6.7 9 5.5 9C4.3 9 3.3 9.85 3.05 11H1.5C1.22386 11 1 11.2239 1 11.5ZM5.5 10C6.35 10 7 10.65 7 11.5C7 12.35 6.35 13 5.5 13C4.65 13 4 12.35 4 11.5C4 10.65 4.65 10 5.5 10Z" fill="#222222" stroke="#222222" stroke-width="0.3" />

            </svg>
            <span className="font-medium text-sm">Filters</span>
        </button>
    );
};

export default compose(withModal(Filter))(FilterButton);
