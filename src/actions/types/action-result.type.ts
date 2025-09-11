export type ActionSuccess<T = unknown> = {
  success: true;
  data: T;
  message?: string;
};

export type ActionError = {
  success: false;
  error: string;
  fieldErrors?: Record<string, string[]>;
};

export type ActionResult<T = unknown> = ActionSuccess<T> | ActionError;
export type PromiseActionResult<T = unknown> = Promise<ActionResult<T>>;

export const actionSuccess = <T>(
  data: T,
  message?: string,
): ActionSuccess<T> => ({
  success: true,
  data,
  message,
});

export const actionError = (
  error: string,
  fieldErrors?: Record<string, string[]>,
): ActionError => ({
  success: false,
  error,
  fieldErrors,
});

export const isActionSuccess = <T>(
  result: ActionResult<T>,
): result is ActionSuccess<T> => result.success;

export const isActionError = <T>(
  result: ActionResult<T>,
): result is ActionError => !result.success;
