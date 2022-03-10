import { ChangeEvent, FC, useState } from "react";
import { chains } from "../constants";
import { Container } from "./Container";
import { url, _headers } from "../constants";

export const Tools = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-6 mt-5 gap-10">
        <div className="col-span-4 md:col-span-2">
          <Form />
        </div>
        <div className="col-span-4">
          <Card />
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
  const [captchaRender, setCaptchaRender] = useState(false)

  const sendIssue = async () => {
    
   // if (!txHash) return setValidError(true);
   setCaptchaRender(true);
     // @ts-ignore
    window?.grecaptcha.render("captchaContainer", {
       // @ts-ignore
      sitekey: window.SITE_KEY_CAPTCHA,
      callback: async (token:string) => {
        console.log(token);
      }

    })

return;
    const res = await fetch(`${url}reportIssue`, {
      headers: _headers,
      method: "POST",
      body: JSON.stringify({
        txHash,
        depChain,
        destChain,
      }),
    });
    if (res && res.ok) {
        const {message} = await res.json()

        if (message === 'Hash not found') {
            return setValidError(true)
        }
        if (message === 'Success') {
        setSuccess(true)
        }
    }
    
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendIssue();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="block  space-y-2">
        <span>Tx Hash:</span>
        <div className={`inputWrap ${validError ? "failValid" : ""}`}>
          <input
            type="text"
            value={txHash}
            className="bg-white flex justify-between items-center focus:outline-none w-full select-none border rounded px-4 py-2"
            onChange={(e) => {
              setValidError(false);
              setHash(e.target.value);
            }}
          />
          <span className="inputError">Invalid Hash</span>
        </div>
      </div>
      <label className="block mt-5 space-y-2">
        <span>Departure Chain:</span>
        <Dropdown setSelectedChain={setDepChain} />
      </label>
      <label className="block mt-5 space-y-2">
        <span>Destination Chain:</span>
        <Dropdown setSelectedChain={setDestChain} />
      </label>
      <div id="captchaContainer"></div>
     {!captchaRender &&  <button
        className="block mt-5 w-full p-2 text-center text-white rounded-md bg-[#297EFE]"
        type="submit"
      >
        Send
      </button>}
      {success && <span className="formSuccess">Report has been sent</span>}
    </form>
  );
};

const Dropdown: FC<{
  setSelectedChain: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setSelectedChain }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [_selectedChain, _setSelectedChain] = useState("");

  return (
    <div className="relative">
      <h1
        className="bg-white flex justify-between items-center select-none border rounded px-4 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{_selectedChain.length ? _selectedChain : "Select Chain"}</span>
        <svg
          width="8"
          height="4"
          viewBox="0 0 8 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 -3.49691e-07L4 4L8 0L0 -3.49691e-07Z" fill="#62718A" />
        </svg>
      </h1>
      <ul
        className={`${
          isOpen || "hidden"
        } z-10 rounded absolute w-full py-2 bg-white shadow max-h-72 overflow-y-scroll`}
      >
        {chains.map((chain) => (
          <li
            onClick={(e) => {
              _setSelectedChain(e.currentTarget.innerText);
              setSelectedChain(e.currentTarget.innerText);
              setIsOpen(false);
            }}
            className="py-2 px-4 select-none cursor-pointer hover:bg-slate-100"
            key={chain.name}
          >
            {chain.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Card = () => {
  return (
    <div className="bg-white rounded-sm border p-5">
      <h2>Keep calm</h2>
      <p className="mt-4">
        Due to the unpredictable glitches on different blockchain networks and
        the decentralized nature of XP.NETWORK protocol, you may not find your
        cross chain transaction in the XP.NETWORK explorer sometimes. Don't
        worry, your asset is safe.
      </p>
      <p className="mt-6">
        You can use the tool below if your transaction is not showing up in our
        explorer. XP.NETWORK will then register your transaction.
      </p>
      <p className="mt-6">
        Please check your transaction in XP.NETWORK explorer 5 minutes after
        using this tool.
      </p>
    </div>
  );
};
