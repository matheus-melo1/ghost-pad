import { ImageUploadNode } from "@/core/components/tiptap-node/image-upload-node/image-upload-node-extension";
import { HorizontalRule } from "@/core/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";

import { handleImageUpload, MAX_FILE_SIZE } from "@/core/lib/tiptap-utils";
import Highlight from "@tiptap/extension-highlight";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Superscript, Subscript } from "lucide-react";
import { api } from "@/trpc/react";
import { useCallback, useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { changeTitleNote } from "@/core/lib/actions/shared/change-title-note";
import toast from "react-hot-toast";
import { changeContentNote } from "@/core/lib/actions/shared/change-content-note";
import { debounce } from "lodash";

interface IUseEditor {
  id: string;
}

export const useEditorHook = (props: IUseEditor) => {
  const { id } = props;

  const { getNoteById } = api.note;
  const {
    data: note,
    isError: isErrorNote,
    isLoading: isLoadingNote,
    refetch: refetchNote,
  } = getNoteById.useQuery({
    id,
  });

  const [title, setTitle] = useState(note?.title ?? "");
  const [debouncedTitle] = useDebounceValue(title, 500);
  const [content, setContent] = useState<JSON>();
  const [saved, setSaved] = useState(false);

  const editor = useEditor({
    immediatelyRender: true,
    shouldRerenderOnTransaction: true,
    editorProps: {
      attributes: {
        // autocomplete: "off",
        // autocorrect: "off",
        // autocapitalize: "off",
        // "aria-label": "Main content area, start typing to enter text.",
        style: "caret-color: #3b82f6;",
        // class: "editor-purple",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: "task-item",
        },
      }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
    ],
    content,
    onUpdate: useCallback(
      debounce(() => {
        onChangeContent().catch(console.error);
      }, 500),
      [],
    ),
  });

  const onChangeTitle = async () => {
    if (debouncedTitle === note?.title) return;

    const result = await changeTitleNote({ id, title: debouncedTitle });

    if (!result.success) {
      toast.error(result.error);
    }
  };
  const toggleSaved = () => setSaved((prev) => !prev);

  const onChangeContent = async () => {
    if (JSON.stringify(editor.getJSON().content) === JSON.stringify(note?.text))
      return;

    toggleSaved();
    const result = await changeContentNote({
      id,
      content: JSON.stringify(editor.getJSON().content),
    });

    if (!result.success) {
      toast.error(result.error);

      toggleSaved();
      return;
    }

    // toast.success("Nota salva com sucesso!");

    toggleSaved();
    await refetchNote();
  };

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      editor.commands.setContent(content!);
      setContent(note.text as JSON);
    }
  }, [note, editor, content]);

  useEffect(() => {
    if (!debouncedTitle || !note) return;
    onChangeTitle().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTitle]);

  return {
    editor,
    note,
    isErrorNote,
    title,
    setTitle,
    isLoadingNote,
    saved,
  };
};

export type useEditorType = ReturnType<typeof useEditor>;
