import AppPage from "@/core/components/layout/app-page";
import NotesHeader from "@/features/notes/components/notes-header";
import NotesSection from "@/features/notes/components/notes-section";

export default function Note() {
  return (
    <AppPage header={<NotesHeader />}>
      <NotesSection />
    </AppPage>
  );
}
