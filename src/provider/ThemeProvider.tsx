import {
  createContext,
  useState,
  useMemo,
  type PropsWithChildren,
} from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { type PaletteMode } from "@mui/material";
import { FONT_WEIGHT } from "@/utils/constant/fontWeight";

export const ThemeProviderContext = createContext({
  toggleColorMode: () => {},
});
export default function ThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<PaletteMode>("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => {
    const thm = createTheme({
      components: {
        MuiButton: {
          styleOverrides: {
            root: ({ theme, ownerState }) => ({
              textTransform: "none",
              lineHeight: "20px",
              fontSize: 12,
              padding: ownerState.size == "small" ? undefined : "4px 16px",
              borderRadius: "8px",
              borderWidth:
                ownerState.variant == "outlined" ? "2px !important" : undefined,
              fontWeight: FONT_WEIGHT.BOLD,
              "& .MuiButton-startIcon": {
                marginRight: "4px",
                marginLeft: "0px",
              },
            }),
          },
        },
        MuiTextField: {
          defaultProps: {
            fullWidth: true,
            variant: "outlined",
            size: "small",
          },
          styleOverrides: {
            root: () => ({
              "& .MuiFormHelperText-root": { margin: 0 },
              "& .MuiInputBase-root": {
                backgroundColor: "white",
                borderRadius: "8px",
              },
            }),
          },
        },
      },
      typography: {
        textXl: {
          lineHeight: "28px",
          fontSize: 18,
        },
        textM: {
          lineHeight: "24px",
          fontSize: 14,
        },
        textS: {
          lineHeight: "20px",
          fontSize: 12,
        },
      },
      palette: {
        mode,
        ...(mode === "light"
          ? {
              background: {
                default: "#FFFFFF",
              },
              primary: {
                main: "#01959F",
                "50": "#F7FEFF",
              },
              secondary: {
                main: "#026dbf",
                "50": "#e6f0f9",
                "100": "#b1d2eb",
                "200": "#8bbce2",
                "300": "#559dd4",
                "400": "#358acc",
                "500": "#026dbf",
                "600": "#0263ae",
                "700": "#014d88",
                "800": "#013c69",
                "900": "#012e50",
              },
              success: {
                main: "#43936C",
                "50": "#F8FBF9",
                "100": "#B8DBCA",
              },
              warning: {
                main: "#FA9810",
                "50": "#FFFCF5",
                "100": "#FEEABC",
              },
              error: {
                main: "#E11428",
                "50": "#FFFAFA",
                "100": "#F5B1B7",
              },
              grey: {
                "50": "#FAFAFA",
                "100":"#EDEDED",
                "200": "#E0E0E0",
                "500": "#757575",
                "900":"#333333"
              },

              text: {
                primary: "#404040",
                secondary: "#1E1F21",
                tertiary: "#1D1F20",
                disabled: "#718096",
              },
            }
          : {}),
      },
    });

    return thm;
  }, [mode]);
  return (
    <ThemeProviderContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeProviderContext.Provider>
  );
}
