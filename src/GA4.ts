import ReactGA from "react-ga4";

const tagId = "G-YHV5NL1DH9";

ReactGA.initialize(tagId);
ReactGA.set({ appName: "XP.BRIDGE EXPLORER" });

interface IEvent {
    category: string;
    action: string;
    label?: string;
    value?: number;
    nonInteraction?: boolean | undefined;
}

interface IPageView {
    hitType: string;
    page: string;
    title: string;
}

export const googleAnalyticsCategories = {
    Connect: "connect",
    Approve: "approve",
    Transfer: "transfer",
    Content: "content",
    Chain: "chain",
    Error: "error",
    UserInf: "userInf",
    Button: "button",
    Whitelist: "whitelist",
};

export const handleGoogleAnalyticsEvent = (event: IEvent) => {
    const { category, action, label, value, nonInteraction } = event;
    ReactGA.event({
        category,
        action,
        label: label || undefined, // optional
        value: value || undefined, // optional, must be a number
        nonInteraction: nonInteraction || undefined, // optional, true/false
        transport: "xhr", // optional, beacon/xhr/image
    });
};

export const handleGoogleAnalyticsPageView = (view: IPageView) => {
    const { hitType, page, title } = view;
    ReactGA.send({ hitType, page, title });
};

export default ReactGA;
