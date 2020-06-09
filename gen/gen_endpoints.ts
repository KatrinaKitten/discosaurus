import { objectEntries, localizePath } from '../src/util/functions.ts'

console.log(`import { makeRequest } from '../network/api.ts'`)

type ValueSchema = string|{ type: string, default?: string, optional?: boolean, nullable?: boolean }
type ValueArg = { name: string, schema: ValueSchema, fnArg: string }

const inputPath = localizePath('endpoints.json', import.meta.url)
const defs = JSON.parse(await Deno.readTextFile(inputPath)) as {
  imports: {[name: string]: string}
  enums: {[name: string]: string[]}

  endpoints: {[name: string]: {
    method: 'get'|'post'|'put'|'patch'|'delete'
    path: string
    path_schema?: {[k: string]: ValueSchema}
    body_schema?: {[k: string]: ValueSchema}
    query_schema?: {[k: string]: ValueSchema}
  }}
}

function processValueSchema([name, schema]: [string, ValueSchema], allOptional = false): ValueArg {
  if(typeof schema === 'string') return {
    name, schema,
    fnArg: `${name}: ${schema}${allOptional ? '|undefined = undefined' : ''}`
  }

  let defaultValue = ''
  if(schema.nullable) defaultValue = '|null = null'
  if(schema.optional || allOptional) defaultValue = '|undefined = undefined'
  if(schema.default) defaultValue = ' = '+schema.default
  
  return {
    name, schema,
    fnArg: `${name}: ${schema.type}${defaultValue}`
  }
}

/// SECTION: Imports
let importDefs: Record<string, string[]> = {}
for(let [name, from] of objectEntries(defs.imports)) {
  importDefs[from] ?? (importDefs[from] = [])
  importDefs[from].push(name)
}
for(let [from, names] of objectEntries(importDefs))
  console.log(`import { ${names.join(', ')} } from '${from}'`)
console.log()

/// SECTION: Endpoints
for(let [name, def] of objectEntries(defs.endpoints)) {
  let pathArgs = def.path_schema && objectEntries(def.path_schema).map(v => processValueSchema(v))
  let bodyArgs = def.body_schema && objectEntries(def.body_schema).map(v => processValueSchema(v))
  let queryArgs = def.query_schema && objectEntries(def.query_schema).map(v => processValueSchema(v, true))

  let bodyArgNames = bodyArgs?.map(a => a.name) ?? []
  let queryArgNames = queryArgs?.map(a => a.name) ?? []

  let pathFnArgs = pathArgs ? ',\n  '+pathArgs?.map(a => a.fnArg).join(',\n  ') : ''
  let bodyFnArgs = bodyArgs ? ',\n  '+bodyArgs?.map(a => a.fnArg).join(',\n  ') : ''
  let queryFnArgs = queryArgs ? ',\n  '+queryArgs?.map(a => a.fnArg).join(',\n  ') : ''

  console.log(`
    export function ${name}(
      token: string${pathFnArgs}${queryFnArgs}${bodyFnArgs}
    ) {
      return makeRequest(
        token, '${def.method}', \`${def.path.replace(/\{/g,'${')}\`,
        ${queryArgNames.length ? '{'+queryArgNames.join(',')+'}' : 'undefined'},
        ${bodyArgNames.length ? '{'+bodyArgNames.join(',')+'}' : 'undefined'}
      )
    }
  `.trim().replace(/^ {4}/gm,''))
  console.log()
}
