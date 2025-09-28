const getPreferenceTheme = (): boolean => {
  if (typeof window === "undefined") return false;

  const saved = localStorage.getItem("darkTheme");
  if (saved !== null) {
    return saved === "true";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export default getPreferenceTheme;
