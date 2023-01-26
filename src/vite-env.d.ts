/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_THIONVILLE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}