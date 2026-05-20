import { useState } from "react";
import "./main.css";

import { open, save } from "@tauri-apps/plugin-dialog";

import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";

export default function Main() {
  const [val, setVal] = useState("");
  const [currentFile, setCurrentFile] = useState<string | null>(null);

  // NEW NOTE
  const clearField = () => {
    setVal("");
    setCurrentFile(null);
  };

  // OPEN FILE
  const handleOpen = async () => {
    const selected = await open({
      multiple: false,
      directory: false,

      filters: [
        {
          name: "Notes",
          extensions: ["txt", "md"],
        },
      ],
    });

    if (!selected || Array.isArray(selected)) return;

    const content = await readTextFile(selected);

    setVal(content);
    setCurrentFile(selected);
  };

  // SAVE
  const handleSave = async () => {
    try {
      let path = currentFile;

      // If this is a new note -> Save As
      if (!path) {
        path = await save({
          filters: [
            {
              name: "Markdown",
              extensions: ["md"],
            },
            {
              name: "Text",
              extensions: ["txt"],
            },
          ],

          defaultPath: "note.md",
        });

        if (!path) return;

        setCurrentFile(path);
      }

      await writeTextFile(path, val);

      console.log("Saved:", path);
    } catch (err) {
      console.error(err);
    }
  };

  // SAVE AS
  const handleSaveAs = async () => {
    try {
      const path = await save({
        filters: [
          {
            name: "Markdown",
            extensions: ["md"],
          },
          {
            name: "Text",
            extensions: ["txt"],
          },
        ],

        defaultPath: "note.md",
      });

      if (!path) return;

      await writeTextFile(path, val);

      setCurrentFile(path);

      console.log("Saved as:", path);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="input-container">
      <div id="buttons">
        <button onClick={clearField}>New</button>

        <button onClick={handleOpen}>Open</button>

        <button onClick={handleSave}>Save</button>

        <button onClick={handleSaveAs}>Save As</button>

        <button>Preview</button>

        <button>Settings</button>
      </div>

      <textarea
        id="input-field"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    </div>
  );
}
