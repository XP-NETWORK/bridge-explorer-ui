import { FC, useEffect, useState } from "react";
import { Container } from "./Container";
import logo2 from "../assets/img/logo2.svg";
import sendBtn from "../assets/img/sendEmailBtn.svg";
import moment from "moment";

export const Footer = () => {
    const [latestCommit, setLatestCommit] = useState("");
    const [emailInput, setInput] = useState("");
    const [failedEmail, setFailed] = useState(false);

    useEffect(() => {
        fetch("https://xpvitaldata.herokuapp.com/last-commit")
            .then((res) => res.json())
            .then((data) => {
                setLatestCommit(data);
            });
    }, []);

    const handeNewsletter = () => {
        // @ts-ignore
        window?.grecaptcha.reset();
        if (/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(emailInput)) {
            failedEmail && setFailed(false);
            // @ts-ignore
            window.NEWS_EMAIL = emailInput;
            // @ts-ignore
            window?.grecaptcha.execute();
        } else {
            setFailed(true);
        }
    };

    return (
        <footer className="mt-10 bg-zinc-800 py-8" id="footer">
            <Container className="text-white text-sm">
                <div className="flex flex-col md:flex-row gap-y-10 justify-between">
                    <div className="flex flex-col gap-2">
                        <FooterLink href="https://xp.network">
                            <img src={logo2} className="mb-4" alt="logo" />
                        </FooterLink>

                        <div className="newsLetterWrapper">
                            <div className="quick_links">
                                <h4>Stay in the loop</h4>
                                <p>Subscribe for our newsletters</p>

                                <div
                                    className="inputWrapper"
                                    id="newsLetterWrap"
                                >
                                    <div
                                        className="g-recaptcha"
                                        //@ts-ignore
                                        data-sitekey={
                                            "6LfQOTEgAAAAAL07CQVjXTx8ixN1koilgCPRnzd4"
                                        }
                                        data-callback="sendNewsletter"
                                        data-size="invisible"
                                    />

                                    <img
                                        src={sendBtn}
                                        onClick={handeNewsletter}
                                    />
                                    <input
                                        className={`${
                                            failedEmail ? "failedEmail" : ""
                                        }`}
                                        type="text"
                                        placeholder="Your email address"
                                        onChange={(e) =>
                                            setInput(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <FooterLink
                            openInNewTab={false}
                            href="mailto:contact@xp.network"
                        >
                            contact@xp.network
                        </FooterLink>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="font-poppins font-medium text-white">
                            Products
                        </h1>
                        <FooterLink href="https://bridge.xp.network/">
                            Cross-Chain NFT Bridge
                        </FooterLink>
                        <FooterLink href="https://widget.xp.network/?widget=true&wsettings=true#">
                            Bridge Widget
                        </FooterLink>
                        <FooterLink href="https://xp.network/api/">
                            XPJS API
                        </FooterLink>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="font-poppins font-medium text-white">
                            Resources
                        </h1>
                        <FooterLink href="https://xp.network/whitepaper/">
                            Whitepaper
                        </FooterLink>
                        <FooterLink href="https://docs.xp.network/">
                            Docs
                        </FooterLink>
                        <FooterLink href="https://docs.xp.network/docs/roadmap/">
                            Roadmap
                        </FooterLink>
                        <FooterLink href="https://xp.network/security/">
                            Security
                        </FooterLink>
                        <FooterLink href="https://github.com/xp-network/">
                            GitHub
                            <div>
                                <span>
                                    <span className="wave"></span>
                                    Latest {moment(latestCommit).format("ll")}
                                </span>
                            </div>
                        </FooterLink>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="font-poppins font-medium text-white">
                            XP.NETWORK
                        </h1>
                        <FooterLink href="https://xp.network/team/">
                            Team
                        </FooterLink>
                        <FooterLink href="https://xp.network/about-us/">
                            About Us
                        </FooterLink>
                        {false && (
                            <FooterLink href="https://xp.network/events/">
                                News & Events
                            </FooterLink>
                        )}
                        <FooterLink href="https://blog.xp.network/">
                            Blog
                        </FooterLink>
                        <FooterLink href="https://xp.network/backers/">
                            Backers
                        </FooterLink>
                        <FooterLink href="https://drive.google.com/drive/folders/1i8evWmyH_8APiDDO89depEw_8JnDSACK">
                            Brand Assets
                        </FooterLink>
                        <FooterLink href="https://xp.network/ecosystem/">
                            Ecosystem
                        </FooterLink>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="font-poppins font-medium text-white">
                            Community
                        </h1>
                        <FooterLink href="https://twitter.com/xpnetwork_">
                            Twitter
                        </FooterLink>
                        <FooterLink href="https://t.me/xp_network">
                            Telegram
                        </FooterLink>
                        <FooterLink href="https://www.reddit.com/r/XP_network/">
                            Reddit
                        </FooterLink>
                        <FooterLink href="https://www.linkedin.com/company/xpnetwork/mycompany/">
                            LinkedIn
                        </FooterLink>
                        {false && (
                            <FooterLink href="https://www.facebook.com/XPNETWORKOFFICIAL/">
                                Facebook
                            </FooterLink>
                        )}
                        <FooterLink href="https://discord.com/invite/g3vkcsmd38">
                            Discord
                        </FooterLink>
                        <FooterLink href="https://bitclout.com/u/XPnetwork">
                            BitClout
                        </FooterLink>
                        <FooterLink href="https://www.instagram.com/xp_network/">
                            Instagram
                        </FooterLink>
                        <FooterLink href="https://www.youtube.com/channel/UC5KGVEkRzZ2XE4A-4XBceqg">
                            YouTube
                        </FooterLink>
                    </div>
                </div>
                <hr className="border-zinc-700 my-5" />
                <div className="text-[.85rem] gap-y-8 justify-between">
                    {/* <p className="text-white text-opacity-50 text-xs mb-8">
            A blockchain-agnostic network for building NFT dApps
          </p> */}
                    <p className="text-white text-sm text-opacity-70">
                        © {new Date().getFullYear()} XP.NETWORK Ltd. All Rights
                        Reserved
                    </p>
                </div>
            </Container>
        </footer>
    );
};

const FooterLink: FC<{
    disabled?: boolean;
    href: string;
    openInNewTab?: boolean;
}> = ({ children, disabled = false, openInNewTab = true, href }) => {
    return (
        <a
            target={openInNewTab ? "_blank" : "_self"}
            href={href}
            className={`font-poppins text-white text-opacity-70 hover:text-opacity-100 leading-6 ${
                disabled && "pointer-events-none text-opacity-25"
            }`}
        >
            {children}
        </a>
    );
};

// print date format: Feb 19, 2022
