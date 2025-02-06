interface AbortError extends DOMException {
  name: "AbortError";
}

export function isAbortError(error: unknown): error is AbortError {
  return error instanceof DOMException && error.name === "AbortError";
}
