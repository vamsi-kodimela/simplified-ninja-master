"use client";

import { Check, Copy } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

interface CopyButtonProps {
  code: string;
}

export function CopyButton({ code }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setHasCopied(true);
      toast.success("Copied to clipboard!");
    });
  };

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => {
        setHasCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  return (
    <button
      className="absolute right-2 top-2 z-10 rounded-md bg-gray-800 p-2 text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
      onClick={onCopy}
      disabled={hasCopied}
    >
      {hasCopied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}
