"use client";

import { Highlight } from "prism-react-renderer";
import { CopyButton } from "./CopyButton";

interface Props {
  code: string;
  language:
    | "typescript"
    | "javascript"
    | "tsx"
    | "jsx"
    | "json"
    | "html"
    | "css"
    | "bash";
  fileName?: string;
}

export const CodeClient: React.FC<Props> = ({ code, language, fileName }) => {
  return (
    <div className="relative my-6 overflow-hidden rounded-lg bg-[#1e1e1e]">
      {fileName && (
        <div className="flex items-center gap-3 bg-[#2d2d30] px-4 py-2.5 border-b border-[#3e3e42]">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-[#ff5f57]"></div>
            <div className="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="h-3 w-3 rounded-full bg-[#28ca42]"></div>
          </div>
          <span className="font-mono text-sm text-[#cccccc]">{fileName}</span>
        </div>
      )}
      <div className="relative">
        <CopyButton code={code} />
        <Highlight
          theme={{
            plain: {
              color: "#d4d4d4",
              backgroundColor: "#1e1e1e",
            },
            styles: [
              {
                types: ["comment", "prolog", "doctype", "cdata"],
                style: {
                  color: "#6a9955",
                  fontStyle: "italic",
                },
              },
              {
                types: ["namespace"],
                style: {
                  opacity: 0.7,
                },
              },
              {
                types: ["string", "attr-value"],
                style: {
                  color: "#ce9178",
                },
              },
              {
                types: ["punctuation", "operator"],
                style: {
                  color: "#d4d4d4",
                },
              },
              {
                types: [
                  "entity",
                  "url",
                  "symbol",
                  "number",
                  "boolean",
                  "variable",
                  "constant",
                  "property",
                  "regex",
                  "inserted",
                ],
                style: {
                  color: "#b5cea8",
                },
              },
              {
                types: ["atrule", "keyword", "attr-name", "selector"],
                style: {
                  color: "#569cd6",
                },
              },
              {
                types: ["function", "deleted", "tag"],
                style: {
                  color: "#dcdcaa",
                },
              },
              {
                types: ["function-variable"],
                style: {
                  color: "#dcdcaa",
                },
              },
              {
                types: ["tag", "selector", "keyword"],
                style: {
                  color: "#569cd6",
                },
              },
            ],
          }}
          code={code?.trim()}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} relative overflow-x-auto p-4 font-mono text-sm leading-6`}
              style={{ ...style, backgroundColor: "#1e1e1e" }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};
