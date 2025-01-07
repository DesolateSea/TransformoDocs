/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_REACT_APP_BACKWEB: string;
    readonly VITE_REACT_APP_GOOGLELOGIN: string;
    readonly VITE_REACT_APP_GITHUB: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  