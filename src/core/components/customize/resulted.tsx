interface IResultedProps<T> {
  data: T | T[] | null;
  isError?: boolean;
  isLoading?: boolean;
  successComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  loadingComponent?: React.ReactNode;
}

export default function Resulted<T>(props: IResultedProps<T>) {
  const {
    data,
    isError,
    successComponent,
    errorComponent,
    loadingComponent,
    isLoading,
  } = props;

  if (isLoading) return loadingComponent;

  if (isError || data === null) return errorComponent;

  return successComponent;
}
