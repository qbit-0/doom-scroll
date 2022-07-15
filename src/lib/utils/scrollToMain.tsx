export const scrollToMain = () => {
    document
        .getElementsByTagName("main")[0]
        .scrollIntoView({ behavior: "smooth" });
};
