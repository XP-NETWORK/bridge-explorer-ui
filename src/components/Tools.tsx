import { FC, useState } from "react";
import { chains } from "../constants";
import { Container } from "./Container";

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
  const [txHash, setTxHash] = useState("");
  const [fromChain, setFromChain] = useState("");
  const [toChain, setToChain] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(txHash, fromChain, toChain);
    // TODO: send tx to server
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="block  space-y-2">
        <span>Tx Hash:</span>
        <input
          value={txHash}
          onChange={(e) => setTxHash(e.currentTarget.value)}
          type="text"
          className="bg-white w-full focus:outline-none select-none border rounded px-4 py-2"
        />
      </div>
      <div className="block mt-5 space-y-2">
        <span>Destination Chain:</span>
        <Dropdown setSelectedChain={setFromChain} />
      </div>
      <div className="block mt-5 space-y-2">
        <span>Destination Chain:</span>
        <Dropdown setSelectedChain={setToChain} />
      </div>
      <button
        type="submit"
        className="block mt-5 w-full p-2 text-center text-white rounded-md bg-[#297EFE]"
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
