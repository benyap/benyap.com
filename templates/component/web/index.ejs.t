---
to: apps/web/components/<%= h.changeCase.param(path) %>/<%= h.changeCase.pascal(name) %>/index.ts
---
export * from "./<%= h.changeCase.pascal(name) %>";
