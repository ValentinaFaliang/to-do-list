import React, { useEffect, useState } from "react";
import "./Notes.css";

interface NotesProps {
  transformed: boolean;
}

export const Notes = ({ transformed }: NotesProps) => {
  const [notes, setNotes] = useState<string[]>([]);

  // Load from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem("userNotes");
    const parsedNotes = savedNotes ? JSON.parse(savedNotes) : [];
    setNotes(parsedNotes.length > 0 ? parsedNotes : [""]);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("userNotes", JSON.stringify(notes));
  }, [notes]);

  const handleInput = (index: number, text: string) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = text;

    // If user types into the last line, add a new one
    if (index === notes.length - 1 && text.trim() !== "") {
      updatedNotes.push("");
    }

    setNotes(updatedNotes);
  };
  console.log("notes:", notes);

  return (
    <div className="notes">
      <div className="notes__background">
        <div className={"notes__header" + (transformed ? " transformed" : "")}>
          <h2>Notes</h2>
        </div>
        <div className={"notes__content" + (transformed ? " transformed" : "")}>
          {notes.map((line, index) => (
            <textarea
              key={index}
              className="notes__line"
              value={line}
              onChange={(e) => handleInput(index, e.target.value)}
              rows={1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
