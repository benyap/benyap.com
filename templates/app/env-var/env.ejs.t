---
to: 'apps/<%= app %>/.env.development'
inject: true
before: HYGEN INJECTION POINT
---
<%= prefix %><%= h.changeCase.constantCase(name) %>=<%= defaultValue %>