---
to: 'Dockerfile'
inject: true
before: HYGEN INJECTION POINT
skip_if: <%= prefix %><%= h.changeCase.constantCase(name) %>
---
ARG <%= prefix %><%= h.changeCase.constantCase(name) %>=$<%= prefix %><%= h.changeCase.constantCase(name) %>