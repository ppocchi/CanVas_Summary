import React from "react";
import MDEditor from '@uiw/react-md-editor';

export default function App() {
  const [value, setValue] = React.useState("Hello Markdown! `Tab` key uses default behavior");
  return (
    <div className="container">
      <MDEditor
        value={value}
        onChange={setValue}
        commands={[]}
        extraCommands={[]}
      />
    </div>
  );
}