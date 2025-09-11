"use client";

import "@/core/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/core/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/core/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/core/components/tiptap-node/list-node/list-node.scss";
import "@/core/components/tiptap-node/image-node/image-node.scss";
import "@/core/components/tiptap-node/heading-node/heading-node.scss";
import "@/core/components/tiptap-node/paragraph-node/paragraph-node.scss";

import { EditorContent, EditorContext } from "@tiptap/react";
import { useEditorHook } from "../hooks/use-editor";

export default function EditorSection() {
  const { editor } = useEditorHook();

  return (
    <div className="h-screen w-full overflow-x-hidden overflow-y-auto p-3 pt-5 dark:bg-zinc-950">
      <EditorContext.Provider value={{ editor }}>
        <EditorContent
          editor={editor}
          role="presentation"
          className="mx-auto h-screen w-2/4 !outline-none"
        />
      </EditorContext.Provider>
    </div>
  );
}
