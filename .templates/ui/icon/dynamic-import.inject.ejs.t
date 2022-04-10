---
to: packages/ui/icons/DynamicIcon.tsx
inject: true
before: // import - hygen injection point - do not remove comment
skip_if: <%= h.changeCase.pascal(name) %>Icon,
---
  <%= h.changeCase.pascal(name) %>Icon,