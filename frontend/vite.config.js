
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react() , tailwindcss()],

  server: {
    historyApiFallback: {
      index: '/index.html' // Always return clean HTML without echoing path
    }
  }
});
