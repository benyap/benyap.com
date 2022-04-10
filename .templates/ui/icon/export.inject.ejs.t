---
to: packages/ui/icons/index.ts
inject: true
append: true
skip_if: <%= h.changeCase.pascal(name) %>Icon
---
export * from "./<%= h.changeCase.pascal(name) %>Icon";