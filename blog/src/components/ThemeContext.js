import React, { useEffect, useState } from "react";

export const ThemeContext = React.createContext({
  name: "light",
  updateTheme: () => {},
});

export const themes = {
  faded: "#888",
  light: {
    foreground: "inherit",
    background: "white",
  },
  dark: {
    foreground: "#ffffff",
    background: "black",
  },
};
export const ThemeProvider = ({ children }) => {
  const val =
    typeof window !== `undefined`
      ? JSON.parse(window.localStorage.getItem("theme"))
      : undefined;
  const [theme, setTheme] = useState(val == undefined ? "light" : val);

  useEffect(() => {
    window.localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        name: theme,
        updateTheme: setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

import styled from "@emotion/styled";
export const ThemedLayout = styled.div`
  color: ${(props) => themes[props.theme.name].foreground};
  background-color: ${(props) => themes[props.theme.name].background};
  transition: all 0.4s ease;
  min-height: 100vh;

  & a {
    color: ${(props) => (props.theme.name === "dark" ? "#B38CD9" : "inherit")};
  }
`;

import sunIcon from "../../static/media/sun-icon.svg";
import moonIcon from "../../static/media/moon-icon.svg";
import Switch from "react-switch";

export const ToggleSwitch = ({ theme }) => {
  return (
    <Switch
      onChange={() =>
        theme.updateTheme(theme.name === "light" ? "dark" : "light")
      }
      checked={theme.name === "dark"}
      onColor="#222"
      offColor="#333"
      checkedIcon={<img src={moonIcon} alt="moon icon" />}
      uncheckedIcon={<img src={sunIcon} alt="sun icon" />}
      boxShadow="0 0 2px 3px #B38CD9"
      activeBoxShadow="0 0 2px 3px #dfb3e6"
    />
  );
};
