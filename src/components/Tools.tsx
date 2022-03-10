import { useState } from "react";
import { chains } from "../constants";
import { Container } from "./Container";
import { url, _headers } from "../constants";

export const Tools = () => {
  return (
    <Container>
      <div className="grid grid-cols-6 mt-5 gap-10">
        <div className="col-span-2">
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

  return (
    <form>
      <label className="block  space-y-2">
        <span>Tx Hash:</span>
        <div className={`inputWrap ${validError ? "failValid" : ""}`}>
          <input
            type="text"
            value={txHash}
            className={`w-full border-gray-200 rounded`}
            onChange={(e) => {
              setValidError(false);
              setHash(e.target.value);
            }}
          />
          <span className="inputError">Invalid Hash</span>
        </div>
      </label>
      <label className="block mt-5 space-y-2">
        <span>Departure Chain:</span>
        <select
          value={depChain}
          className="w-full border-gray-200  rounded"
          onChange={(e) => setDepChain(e.target.value)}
        >
          {chains.map((chain) => (
            <option key={chain.name}>{chain.name}</option>
          ))}
        </select>
      </label>
      <label className="block mt-5 space-y-2">
        <span>Destination Chain:</span>
        <select
          className="w-full border-gray-200  rounded"
          value={destChain}
          onChange={(e) => setDestChain(e.target.value)}
        >
          {chains.map((chain) => (
            <option key={chain.name}>{chain.name}</option>
          ))}
        </select>
      </label>
      <button
        className="block mt-5 w-full p-2 text-center text-white rounded-md bg-[#297EFE]"
        onClick={(e) => {
          e.preventDefault();
          sendIssue();
        }}
      >
        Send
      </button>
    </form>
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
