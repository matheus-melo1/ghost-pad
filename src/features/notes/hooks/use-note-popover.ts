import { signOut } from "next-auth/react";

export const useNotePopover = () => {
  const onLogout = async () => {
    await signOut({ redirectTo: "/auth" });
  };

  return {
    onLogout,
  };
};

export type useNotePopoverType = ReturnType<typeof useNotePopover>;
