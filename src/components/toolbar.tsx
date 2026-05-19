import "./toolbar.css";
import { getCurrentWindow } from "@tauri-apps/api/window";
const appWindow = getCurrentWindow();

document
  .getElementById("titlebar-minimize")
  ?.addEventListener("onClick", () => appWindow.minimize());
document
  .getElementById("titlebar-maximize")
  ?.addEventListener("onClick", () => appWindow.toggleMaximize());
document
  .getElementById("titlebar-close")
  ?.addEventListener("onClick", () => appWindow.close());

document.getElementById("titlebar")?.addEventListener("mousedown", (e) => {
  if (e.buttons === 1) {
    // Primary (left) button
    e.detail === 2
      ? appWindow.toggleMaximize() // Maximize on double click
      : appWindow.startDragging(); // Else start dragging
  }
});

export default function Toolbar() {
  return (
    <div id="titlebar">
      <img src="/kiva.png" id="logo"/>
      <div id="buttons">
        <button id="titlebar-minimize"></button>
        <button id="titlebar-maximize"></button>
        <button id="titlebar-close"></button>
      </div>
    </div>
  );
}
