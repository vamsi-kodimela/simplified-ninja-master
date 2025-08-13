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
      className="absolute right-2 top-2 z-20 flex items-center gap-1 rounded px-2 py-1 text-xs text-[#cccccc] transition-colors duration-200 hover:bg-white/10 hover:text-white disabled:opacity-50"
      onClick={onCopy}
      disabled={hasCopied}
    >
      {hasCopied ? (
        <>
          <Check size={12} />
          <span className="hidden sm:inline">Copied!</span>
        </>
      ) : (
        <>
          <Copy size={12} />
          <span className="hidden sm:inline">Copy</span>
        </>
      )}
    </button>
  );
}
