"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "./ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MdTextArea({ content }: { content: string }) {
  const [input, setInput] = useState(`${content}`);
  const [edit, setEdit] = useState(false);

  const handleShow = () => {
    setEdit(true);
  };
  const handleHide = () => {
    setEdit(false);
  };

  const Highlighter = ({ codeValue, language }: any) => {
    return (
      <SyntaxHighlighter
        language={language ?? null}
        style={atomDark}
        wrapLines={false}
        useInlineStyles={true}
        customStyle={{
          display: "inline-block",
          padding: "3px",
          marginTop: "0",
          marginBottom: "0",
          justifyItems: "center",
        }}
      >
        {codeValue ?? ""}
      </SyntaxHighlighter>
    );
  };

  return (
    <div>
      {edit && (
        <div className="flex flex-col">
          <Button variant="ghost" onClick={handleHide} className="self-end">
            Close Edit
          </Button>
          <textarea
            className="textarea min-w-full min-h-[50vh] bg-zinc-900  text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
        </div>
      )}
      {!edit && (
        <div className="flex flex-col">
          <Button variant="ghost" onClick={handleShow} className="self-end">
            Edit
          </Button>
          <ReactMarkdown
            className="markdown full min-h-[45vh] leading-normal max-w-[90vw] text-left"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              a: ({ node, ...props }) => (
                <a
                  {...props}
                  style={{
                    color: "aqua",
                    textDecoration: "none",
                  }}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  {...props}
                  style={{ listStyleType: "disc", marginLeft: "20px" }}
                />
              ),

              ol: ({ node, ...props }) => (
                <ol {...props} style={{ listStyleType: "decimal" }} />
              ),

              code: ({ node, inline, className, children, ...props }) => {
                if (inline) {
                  // Renders inline code
                  return (
                    <code
                      {...props}
                      className="bg-zinc-900 py-[2.72px] px-[5.44px] rounded-md"
                    >
                      {children}
                    </code>
                  );
                } else {
                  // Renders code block
                  return (
                    <Highlighter
                      codeValue={children[0]}
                      language={className ? className.split("-")[1] : undefined}
                    />
                  );
                }
              },
            }}
          >
            {input}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
