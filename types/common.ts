/*
 * @Author: hzm
 * @Date: 2022-09-16 15:37:37
 * @Description:
 */

//排除redaonly
export type Mutable<T> = { -readonly [P in keyof T]: T[P] };
export type UnknownObject = Record<string | number, unknown>;
export type IsAny<T> = 0 extends T & 1 ? true : false; // 提取属性

type NestedPath<T extends "array" | "object", P, C = undefined> = `${P &
  string}${T extends "array" ? `[${number}]` : ""}${C extends string
  ? `.${C}`
  : ""}`;

type ExtractTemplatePath<T, U> = T extends
  | `${infer P}[${string}`
  | `${infer P}.${string}`
  ? P extends U
    ? T
    : never
  : never;

type ExtractPath<T extends object> =
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ExtractTemplatePath<DeepPath<T>, keyof T> | keyof T;

type DeepNested<K extends string, V> = V extends object[]
  ? NestedPath<"array", K, ExtractPath<V[number]> | undefined>
  : V extends unknown[]
  ? NestedPath<"array", K>
  : V extends object
  ? NestedPath<"object", K, ExtractPath<V>>
  : never;

// 将属性转成联合类型
export type DeepPath<T extends object> = {
  [Q in keyof T]-?: Q | DeepNested<Q & string, NonNullable<T[Q]>>;
}[keyof T];

export type ColumnProp<T> = IsAny<T> extends true
  ? string
  : FilterObject<T> extends never
  ? string
  : DeepPath<FilterObject<T>>;
