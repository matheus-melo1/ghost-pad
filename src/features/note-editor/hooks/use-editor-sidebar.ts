import { redirect } from "next/navigation";

export const useEditorSidebar = () => {
  const onChangeRoute = (route: string) => {
    redirect(route);
  };

  return {
    onChangeRoute,
  };
};
