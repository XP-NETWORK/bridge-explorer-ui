import { Container } from "./Container";

export const Footer = () => {
  return (
    <footer className="mt-10 bg-zinc-800 py-10">
      <Container className="text-zinc-400 text-sm">
        <div className="flex flex-col md:flex-row gap-y-10 justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold">Products</h1>
            <a href="/">Cross-Chain NFT Bridge</a>
            <a href="/">NFT Bridge Widget</a>
            <a href="/">XPNET-JS API</a>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold">Resources</h1>
            <a href="/">White Paper</a>
            <a href="/">Wiki</a>
            <a href="/">Docs</a>
            <a href="/">Roadmap</a>
            <a href="/">GitHub</a>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold">XPNET</h1>
            <a href="/">Token</a>
            <a href="/">Staking</a>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold">XP.NETWORK</h1>
            <a href="/">Team</a>
            <a href="/">Blog</a>
            <a href="/">Brand Assets</a>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold">Community</h1>
            <a href="/">Ambassadors ship</a>
            <a href="/">Global Chanels</a>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold">Follow</h1>
            <a href="/">Twitter</a>
            <a href="/">Telegram</a>
            <a href="/">Reddit</a>
            <a href="/">Linkedin</a>
            <a href="/">Facebook</a>
            <a href="/">Discord</a>
            <a href="/">Bitclout</a>
            <a href="/">Instagram</a>
          </div>
        </div>
        <hr className="border-zinc-700 my-10" />
        <div className="flex flex-col md:flex-row gap-y-8 justify-between">
          <div>
            <a href="/">Privacy Policy</a>
            <a className="ml-10" href="/">
              Terms of use
            </a>
          </div>
          <p>A blockchain-agnostic network for building NFT dApps</p>
        </div>
        <p className="mt-8">© 2021 XP.network Ltd. All Rights Reserved</p>
      </Container>
    </footer>
  );
};
