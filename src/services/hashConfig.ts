export const confiUrl = (hash: string) => {
    if (hash.includes("-")) {
        //@ts-ignore
        // hash = hash.replaceAll("-", "%2B");
    }
    if (hash.includes("=")) {
        //@ts-ignore
        hash = hash.replaceAll("=", "%3D");
    }
    if (hash.includes("_")) {
        //@ts-ignore
        hash = hash.replaceAll("=", "%2F");
    }
    if (hash.includes("/")) {
        //@ts-ignore
        hash = hash.replaceAll("/", "%2F");
    }
    if (hash.includes("+")) {
        //@ts-ignore
        hash = hash.replaceAll("+", "%2B");
    }
    return hash;
};
