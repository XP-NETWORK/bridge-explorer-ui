import { ChangeEvent, FC, useState, useEffect, useMemo } from "react";
import { chains } from "../constants";
import { Container } from "./Container";
import { url, _headers } from "../constants";

export const Tools = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-6 mt-5 gap-10 md:mb-44">
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
  const [depChain, setDepChain] = useState(chains[0].name);
  const [destChain, setDestChain] = useState(chains[0].name);
  const [validError, setValidError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorStatus, setError] = useState('');
  const [captchaRender, setCaptchaRender] = useState(false);
  


  const captchaHandler = async (token: string) => {
   
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
     
          setValidError(true);
        } else if (message === "Success") {
         
          setSuccess(true);
        }
      } else {
        setError((await res.json()).message)
      }

      setCaptchaRender(false);
        //@ts-ignore
        document.getElementById('captchaContainer')?.parentElement?.removeChild(document.getElementById('captchaContainer'));
        const newContainer = document.createElement('div')
        newContainer.id = 'captchaContainer'
        document.querySelector('#root form.issueForm')?.appendChild(newContainer);
    }

  const sendIssue =  () => {
    if (!txHash) return setValidError(true);
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
      <div className="block  space-y-2">
        <span className="text-sm">Tx Hash:</span>
        <div className={`inputWrap ${validError ? "failValid" : ""}`}>
          <input
            type="text"
            value={txHash}
            className="bg-white h-7 flex justify-between items-center focus:outline-none w-full select-none border rounded px-4 py-2"
            onChange={(e) => {
              setValidError(false);
              setSuccess(false);
              setError('');
              setHash(e.target.value);
            }}
          />
          <span className="inputError">Invalid Hash</span>
        </div>
      </div>
      <div className="block mt-5 space-y-2">
        <span className="text-sm">Departure Chain:</span>
        <Dropdown setSelectedChain={setDepChain} />
      </div>
      <div className="block mt-5 space-y-2">
        <span className="text-sm">Destination Chain:</span>
        <Dropdown setSelectedChain={setDestChain} />
      </div>
      <div
        id="captchaContainer"
        style={{ display: captchaRender ? "block" : "none" }}
      ></div>

      {!captchaRender && (
        <button
          className="block mt-8 w-full p-2 text-center text-white rounded-md bg-[#297EFE] hover:bg-[#154EDF]"
          type="submit"
        >
          Send
        </button>
      )}
      {success && <span className="formSuccess">Report has been sent</span>}
      {errorStatus && <span className="formFail">{errorStatus}</span>}
    </form>
  );
};

const Dropdown: FC<{
  setSelectedChain: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setSelectedChain }) => {
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
          } z-10 rounded absolute w-full py-2 bg-white shadow-[0_1px_15px_0px_#2F303214] max-h-52 overflow-y-scroll`}
        >
          {chains.map((chain) => (
            <li
              onClick={(e) => {
                _setSelectedChain(e.currentTarget.innerText);
                setSelectedChain(e.currentTarget.innerText);
                setIsOpen(false);
              }}
              className="py-2 flex px-4 select-none cursor-pointer hover:bg-slate-100"
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
    <div className="bg-white rounded-lg border p-5">
      <h2 className="font-medium">Keep calm. We are on it!</h2>
      <p className="mt-4">First of all, don't panic.</p>
      <p className="mt-4">Your asset is safe.</p>
      <p className="mt-4">
        Sometimes you may not see your cross-chain transaction in the XP.NETWORK
        explorer due to unpredictable glitches on different blockchain networks
        and the decentralized nature of XP.NETWORK protocol.
      </p>
      <p className="mt-4">
        If your transaction is not showing up in our explorer,
      </p>
      <p className="mt-4">
        You can use the tool below, and we will register your transaction.
      </p>
      <p className="mt-4">
        Please check your transaction in XP.NETWORK explorer 5 minutes after
        using this tool.
      </p>
    </div>
  );
};
