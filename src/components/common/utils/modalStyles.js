export const editProfileStyle = () => {
    if (screen.width < 579) {
        return {
            content: {
                position: "absolute",
                top: "15%",
                left: "8%",
                right: "8%",
                bottom: "15%",
                border: "0.5px solid rgba(43, 122, 120, 0.5)",
                background: "#feffff",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "4px",
                outline: "none",
                padding: "30px"

            }
        };
    } else if (screen.width > 767 && screen.height > 1365) {
        return {
            content: {
                position: "absolute",
                top: "15%",
                left: "15%",
                right: "15%",
                bottom: "31%",
                border: "0.5px solid rgba(43, 122, 120, 0.5)",
                background: "#feffff",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "4px",
                outline: "none",
                padding: "30px"

            }
        };
    } else if (screen.width > 767 && screen.height > 1279) {
        return {
            content: {
                position: "absolute",
                top: "15%",
                left: "15%",
                right: "15%",
                bottom: "27%",
                border: "0.5px solid rgba(43, 122, 120, 0.5)",
                background: "#feffff",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "4px",
                outline: "none",
                padding: "30px"
            }
        };
    } else if (screen.width > 767 && screen.width < 1023 && screen.height > 1023) {
        return {
            content: {
                position: "absolute",
                top: "11%",
                left: "15%",
                right: "15%",
                bottom: "17%",
                border: "0.5px solid rgba(43, 122, 120, 0.5)",
                background: "#feffff",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "4px",
                outline: "none",
                padding: "30px"
            }
        };
    } else if (screen.width > 1023 && screen.height > 1079) {
        return {
            content: {
                position: "absolute",
                top: "11%",
                left: "30%",
                right: "30%",
                bottom: "7%",
                border: "0.5px solid rgba(43, 122, 120, 0.5)",
                background: "#feffff",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "4px",
                outline: "none",
                padding: "30px"
            }
        };
    } 
};

export const newPostStyle = () => {
    if (screen.width < 579) {
        return {
            content: {
                position: "absolute",
                top: "8%",
                left: "8%",
                right: "8%",
                bottom: "15%",
                border: "0.5px solid rgba(43, 122, 120, 0.5)",
                background: "#feffff",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "4px",
                outline: "none",
                padding: "30px"

            }
        };
    } else if (screen.width > 767 && screen.height > 1365) {
        return {
            content: {
                position: "absolute",
                top: "15%",
                left: "15%",
                right: "15%",
                bottom: "47%",
                border: "0.5px solid rgba(43, 122, 120, 0.5)",
                background: "#feffff",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "4px",
                outline: "none",
                padding: "30px"

            }
        };
    } else if (screen.width > 767 && screen.height > 1279) {
        return {
            content: {
                position: "absolute",
                top: "13%",
                left: "15%",
                right: "15%",
                bottom: "46%",
                border: "0.5px solid rgba(43, 122, 120, 0.5)",
                background: "#feffff",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "4px",
                outline: "none",
                padding: "30px"
            }
        };
    } else if (screen.width > 767 && screen.width < 1023 && screen.height > 1023) {
        return {
            content: {
                position: "absolute",
                top: "13%",
                left: "15%",
                right: "15%",
                bottom: "37%",
                border: "0.5px solid rgba(43, 122, 120, 0.5)",
                background: "#feffff",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "4px",
                outline: "none",
                padding: "30px"
            }
        };
    } else if (screen.width > 1023 && screen.height > 1079) {
        return {
            content: {
                position: "absolute",
                top: "13%",
                left: "25%",
                right: "25%",
                bottom: "29%",
                border: "0.5px solid rgba(43, 122, 120, 0.5)",
                background: "#feffff",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "4px",
                outline: "none",
                padding: "30px"
            }
        };
    } 
};

export const deletePostStyle = () => {
    if (screen.width < 579) {
        console.log("1");
        return {
            content: {
                position: "absolute",
                top: "8%",
                left: "8%",
                right: "8%",
                bottom: "15%",
                border: "0.5px solid rgba(43, 122, 120, 0.5)",
                background: "#feffff",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "4px",
                outline: "none",
                padding: "30px"

            }
        };
    } else if (screen.width > 767 && screen.height > 1365) {
        console.log("2");
        return {
            content: {
                position: "absolute",
                top: "15%",
                left: "15%",
                right: "15%",
                bottom: "47%",
                border: "0.5px solid rgba(43, 122, 120, 0.5)",
                background: "#feffff",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "4px",
                outline: "none",
                padding: "30px"

            }
        };
    } else if (screen.width > 767 && screen.height > 1279) {
        console.log("3");
        return {
            content: {
                position: "absolute",
                top: "13%",
                left: "15%",
                right: "15%",
                bottom: "46%",
                border: "0.5px solid rgba(43, 122, 120, 0.5)",
                background: "#feffff",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "4px",
                outline: "none",
                padding: "30px"
            }
        };
    } else if (screen.width > 767 && screen.width < 1023 && screen.height > 1023) {
        console.log("4");
        return {
            content: {
                position: "absolute",
                top: "20%",
                left: "20%",
                right: "20%",
                bottom: "65%",
                border: "0.5px solid rgba(43, 122, 120, 0.5)",
                background: "#feffff",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "4px",
                outline: "none",
                padding: "30px"
            }
        };
    } else if (screen.width > 1023 && screen.height > 1079) {
        console.log("5");
        return {
            content: {
                position: "absolute",
                top: "25%",
                left: "32%",
                right: "37%",
                bottom: "57%",
                border: "0.5px solid rgba(43, 122, 120, 0.5)",
                background: "#feffff",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "4px",
                outline: "none",
                padding: "30px"
            }
        };
    } 
};