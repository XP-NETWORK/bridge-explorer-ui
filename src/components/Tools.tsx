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

  const sendIssue = async () => {
    if (!txHash) return setValidError(true);
    const res = await fetch(`${url}reportIssue`, {
      headers: _headers,
      method: "POST",
      body: JSON.stringify({
        txHash,
        depChain,
        destChain,
      }),
    });
    console.log(res);
    console.log(await res.json());
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
      <div className="block mt-5 space-y-2">
        <span>Departure Chain:</span>
        <Dropdown setSelectedChain={setDepChain} />
      </div>
      <div className="block mt-5 space-y-2">
        <span>Destination Chain:</span>
        <Dropdown setSelectedChain={setDestChain} />
      </div>
      <button
        className="block mt-5 w-full p-2 text-center text-white rounded-md bg-[#297EFE]"
        type="submit"
      >
        Send
      </button>
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
    </>
  );
};

const Card = () => {
  return (
    <div className="bg-white rounded-sm border p-5">
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
