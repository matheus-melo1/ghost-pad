import AppPage from "@/core/components/layout/app-page";
import EditorSection from "@/features/note-editor/components/editor-section";
import { EditorSidebar } from "@/features/note-editor/components/editor-sidebar";
import type { NoteEditorParams } from "@/features/note-editor/models/params-id.type";
import { TRPCReactProvider } from "@/trpc/react";

export default function Note(props: NoteEditorParams) {
  return (
    <AppPage navbar={<EditorSidebar {...props} />}>
      <TRPCReactProvider>
        <EditorSection {...props} />
      </TRPCReactProvider>
    </AppPage>
  );
}
