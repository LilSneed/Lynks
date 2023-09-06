import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Highlighter({ value, language }: any) {
  return (
    <SyntaxHighlighter language={language} style={dark}>
      {value}
    </SyntaxHighlighter>
  );
}
