import React from "react";
import { CodeClient } from "./Component.client";

// This props interface should match the fields in your Payload block config
export interface Type {
  blockType: "code";
  blockName?: string;
  fileName?: string;
  language:
    | "typescript"
    | "javascript"
    | "tsx"
    | "jsx"
    | "json"
    | "html"
    | "css"
    | "bash";
  code: string;
}

export const Component: React.FC<Type> = ({ code, language, fileName }) => {
  return <CodeClient code={code} language={language} fileName={fileName} />;
};
