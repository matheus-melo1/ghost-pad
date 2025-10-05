"use client";

import "@/core/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/core/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/core/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/core/components/tiptap-node/list-node/list-node.scss";
import "@/core/components/tiptap-node/image-node/image-node.scss";
import "@/core/components/tiptap-node/heading-node/heading-node.scss";
import "@/core/components/tiptap-node/paragraph-node/paragraph-node.scss";
import "@/core/styles/globals.css";

import { EditorContent, EditorContext } from "@tiptap/react";
import { useEditorHook } from "../hooks/use-editor";
import type { NoteEditorParams } from "../models";
import Resulted from "@/core/components/customize/resulted";
import SkeletonText from "./components/skeleton-text";
import { Save, TriangleAlert } from "lucide-react";

export default function EditorSection(props: NoteEditorParams) {
  const { params } = props;
  const noteIdValue =
    params?.value?.split?.('"')?.[3]?.replaceAll?.("'", "") ?? "";
  const { editor, note, isErrorNote, title, setTitle, isLoadingNote, saved } =
    useEditorHook({
      id: noteIdValue,
    });

  return (
    <div className="relative h-screen w-full overflow-x-hidden overflow-y-auto p-3 pt-5 dark:bg-zinc-950">
      <div className="mx-auto flex h-screen w-2/4 flex-col gap-6">
        {saved && (
          <div className="absolute top-4 left-4 animate-pulse rounded-full bg-black p-1 text-white transition-all dark:bg-white dark:text-black">
            <Save size={24} />
          </div>
        )}
        <EditorContext.Provider value={{ editor }}>
          <Resulted
            data={note}
            isError={isErrorNote}
            isLoading={isLoadingNote}
            successComponent={
              <div className="flex flex-col gap-3">
                <input
                  placeholder="Digite o título da nota"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-3xl font-semibold !outline-none"
                />

                {/* <Button */}
                {/*   onClick={onChangeContent} */}
                {/*   className="z-10 w-fit cursor-pointer !px-3 !py-0 text-base font-semibold" */}
                {/*   size="sm" */}
                {/* > */}
                {/*   <Pencil /> */}
                {/*   Salvar */}
                {/* </Button> */}
              </div>
            }
            errorComponent={
              <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                <TriangleAlert className="h-12 w-12 text-zinc-500 dark:text-zinc-600" />
                <p className="text-2xl font-semibold text-zinc-500 dark:text-zinc-600">
                  Erro ao carregar nota
                </p>
              </div>
            }
            loadingComponent={
              <div className="h-7 w-72 animate-pulse rounded-[4px] bg-zinc-500 dark:bg-zinc-600"></div>
            }
          />
          {isLoadingNote ? (
            <SkeletonText />
          ) : (
            <EditorContent
              editor={editor}
              placeholder="Digite o conteúdo da nota"
              role="presentation"
              className="!outline-none"
            />
          )}
        </EditorContext.Provider>
      </div>
    </div>
  );
}
