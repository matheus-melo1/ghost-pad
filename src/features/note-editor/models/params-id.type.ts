export type NoteEditorParams = {
  params: { noteId: string; value: string };
  searchParams: { archived?: "true" | "false" | undefined };
};
