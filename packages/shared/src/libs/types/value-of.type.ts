type EnumValue<T extends Record<string, number | string>> = T[keyof T];
type ValueOf<T> = T[keyof T];

export { type EnumValue, type ValueOf };
