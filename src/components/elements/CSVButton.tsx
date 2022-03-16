
import withModal from "../../context/withModal";
import DatePicker from "react-datepicker";
import moment from "moment";
import { compose } from "../Details/helpers";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useContext } from "react";
import { EventsContext } from "../../context/Events";

import { url } from "../../constants";

const DownloadCSV = () => {

  const [startDate, setStart] = useState(moment().subtract(1, 'month').toDate())
  const [endDate, setEnd] = useState(new Date())
  const [captchaRender, setCaptchaRender] = useState(false);


  const ctx = useContext(EventsContext)
  console.log(ctx, 'ccc');

  const onSetStart = (date:Date) => {
      if (!moment(date).isAfter(endDate)) {
        setStart(date)
      }
  }

  const onSetEnd = (date:Date) => {
    if (!moment(date).isBefore(startDate)) {
      setEnd(date)
    }
  }

  const onClickDownload = async () => {

      setCaptchaRender(true);
       // @ts-ignore
      window?.grecaptcha.render("CSVCaptchaContainer", {
        // @ts-ignore
        sitekey: window.SITE_KEY_CAPTCHA,
        callback: async function  (token:string) {
          const res = await fetch(`${url}csv?startDate=${startDate}&endDate=${endDate}&searchQuery=${ctx?.chainName}&token=${token}`)
          //console.log(await res.json());
            if (res && res.ok) {
        
              const blob = await res.blob()
              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              //link.download = res.headers.get('fileName');
              link.click();
          }


          setCaptchaRender(false);

        },
      });

     
  }

  return <>
      <p className="modalText">Export transactions starting from</p>
  <div className="CSVwrapper">
      <DatePicker selected={startDate}  onChange={(date:Date) => onSetStart(date)} className="datePick"/>
      <span>To</span>
      <DatePicker selected={endDate}  onChange={(date:Date) => onSetEnd(date)}  className="datePick"/>
  </div>
  {!captchaRender && <button className="csvBtn" onClick={onClickDownload}>Download</button>}
  <div id="CSVCaptchaContainer"  style={{ display: captchaRender ? "block" : "none" }}></div>
  </>
}

const CSVButton =  ({openModal}: {openModal?: () => void}) => {
  return (
    <button className="bg-[#235EF51A] text-[#235EF5] csvBtn" onClick={openModal}>
      <svg
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.7727 12.0909V8.54545C15.7727 8.37668 15.7057 8.21482 15.5863 8.09548C15.467 7.97614 15.3051 7.90909 15.1364 7.90909C14.9676 7.90909 14.8057 7.97614 14.6864 8.09548C14.567 8.21482 14.5 8.37668 14.5 8.54545V12.0909C14.5 12.2597 14.433 12.4215 14.3136 12.5409C14.1943 12.6602 14.0324 12.7273 13.8636 12.7273H2.40909C2.24032 12.7273 2.07846 12.6602 1.95911 12.5409C1.83977 12.4215 1.77273 12.2597 1.77273 12.0909V8.54545C1.77273 8.37668 1.70568 8.21482 1.58634 8.09548C1.467 7.97614 1.30514 7.90909 1.13636 7.90909C0.967589 7.90909 0.805728 7.97614 0.686387 8.09548C0.567045 8.21482 0.5 8.37668 0.5 8.54545V12.0909C0.5 12.5972 0.701136 13.0828 1.05916 13.4408C1.41718 13.7989 1.90277 14 2.40909 14H13.8636C14.37 14 14.8555 13.7989 15.2136 13.4408C15.5716 13.0828 15.7727 12.5972 15.7727 12.0909ZM11.7127 8.76909L8.53091 11.3145C8.41856 11.4033 8.27955 11.4516 8.13636 11.4516C7.99317 11.4516 7.85417 11.4033 7.74182 11.3145L4.56 8.76909C4.44406 8.65966 4.37343 8.51069 4.36207 8.35167C4.35071 8.19265 4.39945 8.03516 4.49866 7.91035C4.59786 7.78555 4.74029 7.70253 4.89778 7.67772C5.05526 7.65291 5.21632 7.68811 5.34909 7.77636L7.5 9.49454V0.636364C7.5 0.467589 7.56705 0.305728 7.68639 0.186387C7.80573 0.0670454 7.96759 0 8.13636 0C8.30514 0 8.467 0.0670454 8.58634 0.186387C8.70568 0.305728 8.77273 0.467589 8.77273 0.636364V9.49454L10.9236 7.77636C10.9877 7.71588 11.0637 7.66936 11.1467 7.63975C11.2297 7.61015 11.3179 7.5981 11.4058 7.60438C11.4937 7.61066 11.5793 7.63513 11.6573 7.67623C11.7352 7.71733 11.8038 7.77417 11.8586 7.84315C11.9134 7.91214 11.9534 7.99176 11.9758 8.07697C11.9983 8.16218 12.0028 8.25112 11.9891 8.33817C11.9753 8.42521 11.9437 8.50846 11.8961 8.58264C11.8486 8.65682 11.7861 8.72031 11.7127 8.76909Z"
          fill="currentColor"
        />
      </svg>
      <span>CSV</span>
    </button>
  );
};


export default compose(withModal(DownloadCSV))(CSVButton)