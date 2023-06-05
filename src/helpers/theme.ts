// This file contains the logic for setting light/dark mode
// On first load, we check the user's device theme
// Then, whenever they change it, we save the value in local storage
// So that the setting persists in that browser

// This is an 'object' which describes the two possible themes - dark and light
export const theme = {
    dark: "dark",
    light: "light",
  } as const;
  
  export type Theme = keyof typeof theme;
  
  // This returns the current theme
  export const getTheme = (): Theme => {
    // First check if the theme is stored in local storage - user preferences
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      const stored = localStorage.getItem("theme");
      if (stored && stored in theme) return stored as Theme;
    }
    // Otherwise, check device settings
    if (window && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    // Otherwise, default to light
    return "light";
  };
  
  // This function adds the 'dark' or 'light' class to the top level HTML node.
  // This is what Tailwind looks at
  export const setTheme = (theme: Theme) => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    window?.localStorage.setItem("theme", theme);
  };
