import NotesRecents from "./components/notes-recents";
import NotesTemplates from "./components/notes-templates";

export default function NotesSection() {
  return (
    <section className="flex h-full w-full flex-col gap-4">
      <div className="bg-muted h-80 w-full px-3 py-5">
        <NotesTemplates />
      </div>
      <NotesRecents />
    </section>
  );
}
