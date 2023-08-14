/**
 * @type ArrayElementType<T>
 * Type of each element of an array
 */
export type ArrayElementType<T> = T extends readonly (infer E)[] ? E : never
