import {
  DefaultNodeTypes,
  SerializedBlockNode,
} from "@payloadcms/richtext-lexical";
import { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import { SERVER_URL } from "@/config/api.config";
import Image from "next/image";
import React from "react";

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<any>; // eslint-disable-line

export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  blocks: {},
  // Handle upload nodes (Payload CMS images)
  upload: ({ node }) => {
    const upload = node?.value as Record<string, unknown>;
    if (!upload || typeof upload !== "object" || !upload.url) {
      return null;
    }

    const url = upload.url as string;
    const src = url.startsWith("/")
      ? `${SERVER_URL}${url}`
      : url.startsWith("http")
        ? url
        : `${SERVER_URL}/${url}`;

    return React.createElement(Image, {
      src: src,
      alt: (upload.alt as string) || (upload.filename as string) || "",
      width: (upload.width as number) || 800,
      height: (upload.height as number) || 600,
      className: "post-content-image",
      style: {
        maxWidth: "100%",
        height: "auto",
        borderRadius: "var(--radius-lg)",
        margin: "var(--space-2xl) 0",
        boxShadow: "var(--shadow-md)",
        border: "1px solid var(--border-subtle)",
      },
    });
  },
  // Handle direct image nodes (if any)
  image: ({ node }) => {
    const imageNode = node as Record<string, unknown>;
    const nodeSrc = imageNode.src as string;
    const src = nodeSrc
      ? nodeSrc.startsWith("/")
        ? `${SERVER_URL}${nodeSrc}`
        : nodeSrc.startsWith("http")
          ? nodeSrc
          : `${SERVER_URL}/${nodeSrc}`
      : null;

    if (!src) return null;

    return React.createElement(Image, {
      src: src,
      alt: (imageNode.altText as string) || (imageNode.alt as string) || "",
      width: (imageNode.width as number) || 800,
      height: (imageNode.height as number) || 600,
      className: "post-content-image",
      style: {
        maxWidth: "100%",
        height: "auto",
        borderRadius: "var(--radius-lg)",
        margin: "var(--space-2xl) 0",
        boxShadow: "var(--shadow-md)",
        border: "1px solid var(--border-subtle)",
      },
    });
  },
  // Handle code blocks with proper styling
  code: ({ node }) => {
    const codeNode = node as Record<string, unknown>;
    return React.createElement(
      "code",
      {
        className: "post-content-code",
        style: {
          backgroundColor: "var(--bg-card)",
          color: "var(--primary-accent)",
          padding: "0.125rem 0.25rem",
          borderRadius: "var(--radius-sm)",
          fontSize: "0.875em",
          fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
          border: "1px solid var(--border-subtle)",
        },
      },
      (codeNode.text as string) || "",
    );
  },
  // Handle code blocks
  codeblock: ({ node }) => {
    const codeBlockNode = node as Record<string, unknown>;
    return React.createElement(
      "pre",
      {
        className: "post-content-codeblock",
        style: {
          backgroundColor: "var(--bg-card)",
          color: "var(--text-primary)",
          padding: "var(--space-lg)",
          borderRadius: "var(--radius-lg)",
          overflow: "auto",
          border: "1px solid var(--border-subtle)",
          margin: "var(--space-2xl) 0",
          fontSize: "0.875rem",
          lineHeight: "1.5",
          fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
        },
      },
      React.createElement(
        "code",
        {},
        (codeBlockNode.code as string) || (codeBlockNode.text as string) || "",
      ),
    );
  },
});
