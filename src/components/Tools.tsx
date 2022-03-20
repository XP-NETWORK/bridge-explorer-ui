import { ChangeEvent, FC, useState, useEffect, useMemo } from "react";
import { chains } from "../constants";
import { Container } from "./Container";
import { url, _headers } from "../constants";
import successIcon from '../assets/img/success.svg'
import closeIcon from '../assets/img/close.svg'
import warnIcon from '../assets/img/warning.svg'
import warnSmall from '../assets/img/warnSmall.svg'

export const Tools = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-6 mt-5 gap-10 mb-44">
        <div className="col-span-4 md:order-2">
          <Card />
        </div>
        <div className="col-span-4 md:order-1 md:col-span-2">
          <Form />
        </div>
      </div>
    </Container>
  );
};

const Form = () => {
  const [txHash, setHash] = useState("");
  const [depChain, setDepChain] = useState('');
  const [destChain, setDestChain] = useState('');
  const [validError, setValidError] = useState('');
  const [depValidError, setDepFail] = useState(false);
  const [desValidError, setDesFail] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorStatus, setError] = useState(false);
  const [captchaRender, setCaptchaRender] = useState(false);
  


  const captchaHandler = async (token: string) => {
    try {
      const res = await fetch(`${url}reportIssue`, {
        headers: _headers,
        method: "POST",
        body: JSON.stringify({
          txHash,
          depChain,
          destChain,
          token,
        }),
      });
      if (res && res.ok) {
        const { message } = await res.json();
        
        if (message === "Hash not found") {
     
          setValidError('Invalid Tx hash');
        } else if (message === "Success") {
         
          setSuccess(true);
          setHash('');
          setDepChain('');
          setDestChain('');
        }
      } else {
        setError(true)
      }

      setCaptchaRender(false);
        //@ts-ignore
        document.getElementById('captchaContainer')?.parentElement?.removeChild(document.getElementById('captchaContainer'));
        const newContainer = document.createElement('div')
        newContainer.id = 'captchaContainer'
        document.querySelector('#root form.issueForm')?.appendChild(newContainer);
    } catch(e) {

    }
    }

  const sendIssue =  () => {
    let error = false;
    if (!txHash)  {setValidError('Paste Tx Hash'); error = true}
    if (!depChain)  {setDepFail(true); error = true}
    if (!destChain)  {setDesFail(true);error = true}
    if (error) return;
    setCaptchaRender(true);
        // @ts-ignore
      window?.grecaptcha.render("captchaContainer", {
      // @ts-ignore
      sitekey: window.SITE_KEY_CAPTCHA,
      callback: captchaHandler,
    });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
     sendIssue();
  };

  return (
    <form onSubmit={handleSubmit} className="issueForm">
      <div className="block space-y-1 mb-8">
        <span className="text-sm">Tx Hash:</span>
        <div className={`inputWrap ${validError ? "failValid" : ""}`}>
          <input
            type="text"
            value={txHash}
            onBlur={() => !txHash && setValidError('Paste Tx Hash')}
            className="bg-white h-[2.9rem] flex justify-between items-center focus:outline-none w-full select-none border rounded px-4 py-2"
            onChange={(e) => {
              setValidError('');
              setSuccess(false);
              setError(false);
              setHash(e.target.value);
            }}
          />
          {validError && <span className="inputError"><img src={warnSmall} alt="small" /><span>{validError}</span></span>}
        </div>
      </div>
      <div className={`block mb-4 space-y-1  ${depValidError ? "failValid" : ""}`} >
        <span className="text-sm">Departure Chain:</span>
        <Dropdown _chains={chains.filter(chain => chain.name !== destChain)} setSelectedChain={(val) => {
          setDepFail(false);
          setDepChain(val)}} />
      {depValidError &&  <span className="inputError"><img src={warnSmall} alt="small" /><span>Select Departure Chain</span></span>}
      </div>

      <div className={`block space-y-1  ${desValidError ? "failValid" : ""}`}>
        <span className="text-sm">Destination Chain:</span>
        <Dropdown _chains={chains.filter(chain => chain.name !== depChain)} setSelectedChain={(val) => {
          setDesFail(false);
          setDestChain(val)
        }} />
      { desValidError && <span className="inputError"><img src={warnSmall} alt="small" /><span>Select Destination Chain</span></span>}
      </div>
      <div
        id="captchaContainer"
        style={{ display: captchaRender ? "block" : "none" }}
      ></div>

      {!captchaRender && (
        <button
          className="block mt-4 w-full p-2 text-center text-white rounded-md bg-[#297EFE] hover:bg-[#154EDF]"
          type="submit"
        >
          Send
        </button>
      )}
      {success && <div className="formSuccess"><img src={successIcon} alt="success" /><span>Done! You successfully sent your request.</span> <pre>|</pre> <img onClick={() => setSuccess(false)} src={closeIcon} alt="close" /></div>}
      {errorStatus && <span className="formFail"><img src={warnIcon} alt="warning" /><span>Uh oh... Something went wrong! Please try again.</span> <pre>|</pre> <img onClick={() => setError(false)} src={closeIcon} alt="close" /></span>}
    </form>
  );
};

const Dropdown: FC<{
  setSelectedChain: React.Dispatch<React.SetStateAction<string>>;
  _chains: {
    id: string;
    name: string;
    icon: string;
}[]

}> = ({ setSelectedChain, _chains }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [_selectedChain, _setSelectedChain] = useState("");

  return (
    <>
      {/* backdrop */}
      <div
        className={` ${
          isOpen ? "fixed" : "hidden"
        } top-0 left-0 w-full h-full z-10`}
        onClick={() => setIsOpen(false)}
      />
      <div className="relative">
        <h1
          className="bg-white flex justify-between group items-center select-none border rounded px-4 py-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="h-7 flex items-center">{_selectedChain.length ? _selectedChain : ""}</span>
          <svg
            className={isOpen ? "rotate-180" : "rotate-0"}
            width="8"
            height="4"
            viewBox="0 0 8 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 -3.49691e-07L4 4L8 0L0 -3.49691e-07Z" className={`${!isOpen ? 'fill-[#62718A]' : 'fill-black'} group-hover:fill-black`}  />
          </svg>
        </h1>
        <ul
          className={`${
            isOpen || "hidden"
          } z-10 mt-1 dropdown-scrollbar rounded absolute w-full py-2 bg-white shadow-[0_1px_15px_0px_#2F303214] max-h-52 no-scrollbar overflow-y-scroll`}
        >
          {_chains.map((chain) => (
            <li
              onClick={(e) => {
                _setSelectedChain(e.currentTarget.innerText);
                setSelectedChain(e.currentTarget.innerText);
                setIsOpen(false);
              }}
              className="py-2 flex px-4 select-none cursor-pointer hover:bg-[#F7F7F9]"
              key={chain.name}
            >
              <img src={chain.icon} alt="chain icon" />
              <span className="ml-2">{chain.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const Card = () => {
  return (
    <div className="bg-white text-[#000000D9] rounded-lg border p-8">
      <h2 className="font-roboto">Keep calm. We are on it!</h2>
      <p className="mt-5 text-sm">First of all, don't panic. Your asset is safe.</p>
      <p className="mt-5 text-sm">
        Sometimes you may not see your cross-chain transaction in the XP.NETWORK
        explorer due to unpredictable glitches on different blockchain networks
        and the decentralized nature of XP.NETWORK protocol.
      </p>
      <p className="mt-5 text-sm">
        If your transaction is not showing up in our explorer, You can use the tool below, and we will register your transaction.
      </p>
      <p className="mt-5 text-sm">
        Please check your transaction in XP.NETWORK explorer 5 minutes after
        using this tool.
      </p>
    </div>
  );
};
