import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react-swc";
import path from 'path';
import type { InlineConfig } from 'vitest';
import type { UserConfig } from 'vite';

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

export default defineConfig({
  test: {
    globals: true,
    setupFiles: 'test/setup.ts',
    coverage: {
      reporters: ['lcov', 'html'],
    }
  },
  plugins: [react({ tsDecorators: true })],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
  },
} as unknown as VitestConfigExport)
