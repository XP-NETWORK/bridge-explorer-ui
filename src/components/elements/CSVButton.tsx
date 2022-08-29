import withModal from "../../context/withModal";
import DatePicker from "react-datepicker";
import moment from "moment";
import { compose } from "../Details/helpers";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import close from "../../assets/img/close.svg";
import calendar from "../../assets/img/calendar.svg";
import { url } from "../../constants";
import {useSelector} from 'react-redux'
import { ReduxState } from "../../store";
import "./Buttons.css"

const DownloadCSV = ({ onClose }: { onClose: () => boolean }) => {
  const [startDate, setStart] = useState<Date | "">(
    "" //moment().subtract(1, "month").toDate()
  );
  const [isSettingDate, setIsSetting] = useState([false, false]);
  const [endDate, setEnd] = useState<Date | "">("");
  const [captchaRender, setCaptchaRender] = useState(false);

  const {eventsQueryString} = useSelector((state: ReduxState) => ({page: state.global.page, eventsQueryString: state.global.eventsQueryString}))

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
      <h2>Export transactions sheet</h2>
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
      <div className="CSVwrapper min-w-max">
        <DatePicker
          {...(startDate ? { selected: startDate } : {})}
          {...(!isSettingDate[0] ? { value: "Start date" } : {})}
          onChange={(date: Date) => onSetStart(date)}
          onInputClick={() => setIsSetting([true, isSettingDate[1]])}
          className="datePick w-full"
        />
        <span>-</span>
        <DatePicker
          {...(endDate ? { selected: endDate } : {})}
          {...(!isSettingDate[1] ? { value: "End date" } : {})}
          onChange={(date: Date) => onSetEnd(date)}
          onInputClick={() => setIsSetting([isSettingDate[0], true])}
          className="datePick w-full endDatePick"
        />
        <img src={calendar} alt="calendar" />
      </div>
      {!captchaRender && (
        <div style={{ textAlign: "right" }}>
          <button className="csvBtn w-full md:w-fit" onClick={onClickDownload}>
            Export .CSV
          </button>
        </div>
      )}
      <div
        id="CSVCaptchaContainer"
        style={{ display: captchaRender ? "block" : "none" }}
      ></div>
    </>
  );
};

const CSVButton = ({ openModal }: { openModal?: () => void }) => {
  return (
    <button
      className="bg-[#EEEEF2] text-[#222222] px-2 flex items-center space-x-1 p-1 hover:bg-[#235EF5] hover:text-white rounded"
      onClick={openModal}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.7727 13.0909V9.54545C15.7727 9.37668 15.7057 9.21482 15.5863 9.09548C15.467 8.97614 15.3051 8.90909 15.1364 8.90909C14.9676 8.90909 14.8057 8.97614 14.6864 9.09548C14.567 9.21482 14.5 9.37668 14.5 9.54545V13.0909C14.5 13.2597 14.433 13.4215 14.3136 13.5409C14.1943 13.6602 14.0324 13.7273 13.8636 13.7273H2.40909C2.24032 13.7273 2.07846 13.6602 1.95911 13.5409C1.83977 13.4215 1.77273 13.2597 1.77273 13.0909V9.54545C1.77273 9.37668 1.70568 9.21482 1.58634 9.09548C1.467 8.97614 1.30514 8.90909 1.13636 8.90909C0.967589 8.90909 0.805728 8.97614 0.686387 9.09548C0.567045 9.21482 0.5 9.37668 0.5 9.54545V13.0909C0.5 13.5972 0.701136 14.0828 1.05916 14.4408C1.41718 14.7989 1.90277 15 2.40909 15H13.8636C14.37 15 14.8555 14.7989 15.2136 14.4408C15.5716 14.0828 15.7727 13.5972 15.7727 13.0909ZM11.7127 9.76909L8.53091 12.3145C8.41856 12.4033 8.27955 12.4516 8.13636 12.4516C7.99317 12.4516 7.85417 12.4033 7.74182 12.3145L4.56 9.76909C4.44406 9.65966 4.37343 9.51069 4.36207 9.35167C4.35071 9.19265 4.39945 9.03516 4.49866 8.91035C4.59786 8.78555 4.74029 8.70253 4.89778 8.67772C5.05526 8.65291 5.21632 8.68811 5.34909 8.77636L7.5 10.4945V1.63636C7.5 1.46759 7.56705 1.30573 7.68639 1.18639C7.80573 1.06705 7.96759 1 8.13636 1C8.30514 1 8.467 1.06705 8.58634 1.18639C8.70568 1.30573 8.77273 1.46759 8.77273 1.63636V10.4945L10.9236 8.77636C10.9877 8.71588 11.0637 8.66936 11.1467 8.63975C11.2297 8.61015 11.3179 8.5981 11.4058 8.60438C11.4937 8.61066 11.5793 8.63513 11.6573 8.67623C11.7352 8.71733 11.8038 8.77417 11.8586 8.84315C11.9134 8.91214 11.9534 8.99176 11.9758 9.07697C11.9983 9.16218 12.0028 9.25112 11.9891 9.33817C11.9753 9.42521 11.9437 9.50846 11.8961 9.58264C11.8486 9.65682 11.7861 9.72031 11.7127 9.76909Z"
          fill="#222222"
        />
      </svg>
      <span className="font-medium text-sm">CSV</span>
    </button>
  );
};

export default compose(withModal(DownloadCSV))(CSVButton);
