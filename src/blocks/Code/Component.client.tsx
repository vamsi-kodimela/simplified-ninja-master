"use client";

import { Highlight, themes } from "prism-react-renderer";
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
    <div className="relative my-6 rounded-lg bg-[#282C34] font-mono text-sm">
      {fileName && (
        <div className="flex items-center justify-between rounded-t-lg bg-gray-700 px-4 py-2 text-xs text-gray-300">
          <span>{fileName}</span>
        </div>
      )}
      <div className="relative">
        <CopyButton code={code} />
        <Highlight
          theme={themes.vsDark}
          code={code?.trim()}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} overflow-x-auto p-4 ${fileName ? "rounded-b-lg" : "rounded-lg"}`}
              style={style}
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
