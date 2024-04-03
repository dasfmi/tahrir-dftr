import "./styles.css";
// fonts
import '@fontsource/amiri';
import '@fontsource-variable/vazirmatn';
import '@fontsource-variable/rubik/wght-italic.css';
import '@fontsource/ibm-plex-sans-arabic/400.css';
import '@fontsource/ibm-plex-sans-arabic/600.css';
import '@fontsource/ibm-plex-sans-arabic/700.css';
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
