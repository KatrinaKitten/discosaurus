@echo off
deno run --allow-read gen/endpoints-gen.ts > src/generated/endpoints.ts
