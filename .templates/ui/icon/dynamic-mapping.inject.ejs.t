---
to: packages/ui/icons/DynamicIcon.tsx
inject: true
before: // mapping - hygen injection point - do not remove comment
skip_if: '<%= h.changeCase.pascal(name) %>:'
---
  <%= h.changeCase.pascal(name) %>: <%= h.changeCase.pascal(name) %>Icon,