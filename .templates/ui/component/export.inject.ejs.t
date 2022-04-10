---
to: packages/ui/index.ts
inject: true
append: true
skip_if: <%= h.changeCase.param(path) %>/<%= h.changeCase.pascal(name) %>
---
export * from "./<%= h.changeCase.param(path) %>/<%= h.changeCase.pascal(name) %>";