export function isNull_Undefined_Empty(value: any) {
  return [null, undefined, ""].includes(value);
}

export function isNull_Undefined(value: any) {
  return [null, undefined].includes(value);
}

export function isStrictNumber(value: any) {
  return typeof value === "number" && !isNaN(value);
}

export function isStringNumber(value: any) {
  return typeof value === "string" && !isNaN(+value) && !isNaN(parseInt(value));
}

export function isLooselyNumber(value: any) {
  return isStrictNumber(value) || isStringNumber(value);
}
