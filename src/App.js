import React from "react";
import CanvasEditor from './components/Canvas-editor/index'
import MarkdownEditor from './components/Markdown-editor/index'

export default function App() {
  return (
    <div className="container">
      <CanvasEditor />
      <MarkdownEditor />
    </div>
  );
}