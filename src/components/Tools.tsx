import { chains } from "../constants";
import { Container } from "./Container";

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
  return (
    <form>
      <label className="block  space-y-2">
        <span>Tx Hash:</span>
        <input type="text" className="w-full border-gray-200 rounded" />
      </label>
      <label className="block mt-5 space-y-2">
        <span>Departure Chain:</span>
        <select className="w-full border-gray-200  rounded">
          {chains.map((chain) => (
            <option key={chain.name}>{chain.name}</option>
          ))}
        </select>
      </label>
      <label className="block mt-5 space-y-2">
        <span>Destination Chain:</span>
        <select className="w-full border-gray-200  rounded">
          {chains.map((chain) => (
            <option key={chain.name}>{chain.name}</option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="block mt-5 w-full p-2 text-center text-white rounded-md bg-[#297EFE]"
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
