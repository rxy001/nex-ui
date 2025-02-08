export const rootFile = `
import React from "react";
import ReactDOM from "react-dom/client";
import { NexUIProvider } from "@nex-ui/react";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NexUIProvider>
      <App />
    </NexUIProvider>
  </React.StrictMode>
);`

export const getHtmlFile = (
  theme: string,
  entryFile: string,
) => `<!DOCTYPE html>
<html lang="en" class="${theme}" >
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/${entryFile}"></script>
  </body>
</html>`
