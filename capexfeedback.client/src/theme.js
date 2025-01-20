import {createContext, useState, useMemo} from 'react';
import { createTheme } from '@mui/material/styles';

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#000000",
          200: "#000000",
          300: "#000000",
          400: "#000000",
          500: "#000000",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000",
        },
        primary: {
          100: "#bcd7f7",
          200: "#8faeec",
          300: "#6a92e1",
          400: "#3f84b9", // Sidebar
          500: "#d7f3fb", // Main Body
          600: "#31598f",
          700: "#24467b",
          800: "#1a3568",
          900: "#11264b",
        },
        greenAccent: {
          100: "#e2f9f1",
          200: "#b8e8d8",
          300: "#8dd7bf",
          400: "#63c7a6",
          500: "#39b58d", // Gentle Green
          600: "#299c72",
          700: "#1c8259",
          800: "#126747",
          900: "#085432",
        },
        redAccent: {
          100: "#f6c6c5",
          200: "#ec9f9e",
          300: "#e27877",
          400: "#d95250",
          500: "#c62c2b",
          600: "#a52222",
          700: "#841a1a",
          800: "#641212",
          900: "#440a0a",
        },
        blueAccent: {
          100: "#d1e4f7",
          200: "#a2c9ef",
          300: "#74aee7",
          400: "#5199df",
          500: "#3e7eb4", // Calm Blue
          600: "#316690",
          700: "#254d6c",
          800: "#1a3a49",
          900: "#102528",
        },
      }
    : {
        grey: {
          100: "#000000",//Main Page Title
          200: "#d4d9e6",
          300: "#b8bec9",
          400: "#9aa5b1",
          500: "#7f8c9d",
          600: "#64758a",
          700: "#4c5d6e",
          800: "#737373",//Nav Bar Text
          900: "#2a303f",
        },
        primary: {
          100: "#000000",
          200: "#000000",
          300: "#98a6d5",
          400: "#ffffff", // Lighter Blue
          500: "#5b75a1", // Main Body
          600: "#4a5f85",
          700: "#2dc3e8",
          800: "#2b354f",
          900: "#1b2438",
        },
        greenAccent: {
          100: "#f0fdf6",
          200: "#c9f4e3",
          300: "#a0ebd0",
          400: "#2DC3E8",
          500: "#2DC3E8", // Soft Green
          600: "#3cb58a",
          700: "#2ba77a",
          800: "#1c9369",
          900: "#0e7c58",
        },
        redAccent: {
          100: "#fce1df",
          200: "#f7b9b5",
          300: "#f1908b",
          400: "#e96761",
          500: "#e03e38",
          600: "#c33630",
          700: "#a42e28",
          800: "#842426",
          900: "#68201e",
        },
        blueAccent: {
          100: "#e4f0f9",
          200: "#c1d9f3",
          300: "#9ec2ec",
          400: "#7aabe6",
          500: "#649ad5", // Peaceful Blue
          600: "#4f84b2",
          700: "#dad9d9",
          800: "#2d5073",
          900: "#1e3858",
        },
      }),
});


// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#eeeeee",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
