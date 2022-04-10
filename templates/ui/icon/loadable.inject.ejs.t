---
to: packages/ui/icons/_loadable.ts
inject: true
append: true
skip_if: <%= h.changeCase.pascal(name) %>Icon
---
export const <%= h.changeCase.pascal(name) %>Icon = loadable(() => import("./<%= h.changeCase.pascal(name) %>Icon"));