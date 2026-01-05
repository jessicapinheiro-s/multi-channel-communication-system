/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
    readonly VITE_API_URL: string
    readonly VITE_AMBIENTE_API?: string
    // outras variáveis aqui (adicionar novas variáveis aqui)
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}