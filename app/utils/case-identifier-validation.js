export const CASE_IDENTIFIER_REGEX = /^\d{4}[A-Z]\d{5}\.\d{3}$/;

export function caseIdentifierValid(identifier) {
  return !identifier || identifier === '' || caseIdentifierValidStrict(identifier);
}

export function caseIdentifierValidStrict(identifier) {
  return CASE_IDENTIFIER_REGEX.test(identifier);
}
