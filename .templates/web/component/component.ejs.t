---
to: apps/web/src/components/<%= h.changeCase.param(path) %>/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.tsx
---
export interface <%= h.changeCase.pascal(name) %>Props {}

export function <%= h.changeCase.pascal(name) %>(props: <%= h.changeCase.pascal(name) %>Props) {
  return null;
}
