import { FC } from "react";
import { Container } from "./Container";
import logo2 from "../assets/img/logo2.svg";

export const Footer = () => {
  return (
    <footer className="mt-32 bg-zinc-800 py-8">
      <Container className="text-white text-sm">
        <div className="flex flex-col md:flex-row gap-y-10 justify-between">
          <div className="font-poppins flex flex-col gap-3">
            <FooterLink href="/">
              <img src={logo2} className="mb-4" alt="logo" />
            </FooterLink>
            <FooterLink href="tel:+1 (650) 924-9214">
              +1 (650) 924-9214
            </FooterLink>
            <FooterLink href="mailto:contact@xp.network">
              contact@xp.network
            </FooterLink>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="font-medium text-white">Products</h1>
            <FooterLink href="https://bridge.xp.network/">
              Cross-Chain NFT Bridge
            </FooterLink>
            <FooterLink href="https://xp.network/api/">XPNET-JS API</FooterLink>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="font-medium text-white">Resources</h1>
            <FooterLink href="https://xp.network/whitepaper/">
              Whitepaper
            </FooterLink>
            <FooterLink href="https://docs.xp.network/">Docs</FooterLink>
            <FooterLink href="https://docs.xp.network/docs/roadmap/">
              Roadmap
            </FooterLink>
            <FooterLink href="https://github.com/xp-network/">
              GitHub
            </FooterLink>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="font-medium text-white">XP.NETWORK</h1>
            <FooterLink href="https://xp.network/team/">Team</FooterLink>
            <FooterLink href="https://blog.xp.network/">Blog</FooterLink>
            <FooterLink href="https://drive.google.com/drive/folders/1i8evWmyH_8APiDDO89depEw_8JnDSACK">
              Brand Assets
            </FooterLink>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="font-medium text-white">Community</h1>
            <FooterLink href="https://twitter.com/xpnetwork_">
              Twitter
            </FooterLink>
            <FooterLink href="https://t.me/xp_network">Telegram</FooterLink>
            <FooterLink href="https://www.reddit.com/r/XP_network/">
              Reddit
            </FooterLink>
            <FooterLink href="https://www.linkedin.com/company/xpnetwork/mycompany/">
              Linkedin
            </FooterLink>
            <FooterLink href="https://www.facebook.com/XPNETWORKOFFICIAL/">
              Facebook
            </FooterLink>
            <FooterLink href="https://discord.com/invite/g3vkcsmd38">
              Discord
            </FooterLink>
            <FooterLink href="https://bitclout.com/u/XPnetwork">
              Bitclout
            </FooterLink>
            <FooterLink href="https://www.instagram.com/xp_network/">
              Instagram
            </FooterLink>
          </div>
        </div>
        <hr className="border-zinc-700 my-5" />
        <div className="text-[.85rem] gap-y-8 justify-between">
          <p className="text-white text-opacity-50 text-xs mb-8">
            A blockchain-agnostic network for building NFT dApps
          </p>
          <p className="text-white text-sm text-opacity-70">
            © 2021 XP.network Ltd. All Rights Reserved
          </p>
        </div>
      </Container>
    </footer>
  );
};

const FooterLink: FC<{ disabled?: boolean; href: string }> = ({
  children,
  disabled = false,
  href,
}) => {
  return (
    <a
      target="_blank"
      href={href}
      className={`text-white text-opacity-70 hover:text-opacity-100 ${
        disabled && "pointer-events-none text-opacity-25"
      }`}
    >
      {children}
    </a>
  );
};
