export function isValidName(name: string) {
  const regex = /^\s[A-Za-z]+(?:\s[A-Za-z]+)?$/;
  return regex.test(name);
}
