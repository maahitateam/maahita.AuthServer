/**
 * Extracts a readable error message from any error type
 * @param error The caught error
 * @returns A string representation of the error
 */
export const getErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : "An unknown error occurred";
};

/**
 * Creates a standard error response object
 * @param error The caught error
 * @returns An object with the error message
 */
export const createErrorResponse = (error: unknown): { error: string } => {
  return { error: getErrorMessage(error) };
};