import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const COLORS = {
    // base colors
    primary: "#FC6D3F", // orange
    secondary: "#CDCDD2",   // gray

    // colors
    bgBlack: '#000000',
    black: "#1E1F20",
    white: "#FFFFFF",

    lightGray: "#F5F5F6",
    lightGray2: "#F6F6F7",
    lightGray3: "#EFEFF1",
    lightGray4: "#F8F8F9",
    transparent: "transparent",
    darkgray: '#898C95',

    Yellow:"#f9c80e",
    Orange:"#f86624",
    Red:"#ea3546",
    Purple:"#7B61FF",
    Blue:"#43bccd"};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 30,
    paddingS: 8,
    paddingM: 12,
    paddingL: 16,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 24,
    h3: 18,
    h4: 14,
    body4: 30,
    body3: 20,
    body2: 16,
    body: 14,

    // app dimensions
    width,
    height
};


export const FONTS = {
    largeTitle: { fontFamily: "Roboto-regular", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: "Inter-Bold", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Inter-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Inter-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Inter-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    body4: { fontFamily: "Inter-Regular", fontSize: SIZES.body4, lineHeight: 36 },
    body3: { fontFamily: "Inter-Regular", fontSize: SIZES.body3, lineHeight: 30 },
    body2: { fontFamily: "Inter-Regular", fontSize: SIZES.body2, lineHeight: 22 },
    body: { fontFamily: "Inter-Regular", fontSize: SIZES.body, lineHeight: 22 },

};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;