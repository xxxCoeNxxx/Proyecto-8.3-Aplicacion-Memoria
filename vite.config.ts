import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import path from "path";
import type { UserConfig as VitestUserConfigInterface } from "vitest/config";

const vitestConfig: VitestUserConfigInterface = {
  test: {
    globals: true,
    restoreMocks: true,
    exclude: ['***/FINAL/***'], // QUITAR ESTA LINEA AL ACABAR PRIMEROS PASOS
  },
};

export default defineConfig({
  plugins: [checker({ typescript: true })],
  test: vitestConfig.test,
  build: {
    rollupOptions: {
      input: {
        barajar: path.resolve(__dirname, "01-barajar-cartas/index.html"),
        voltear: path.resolve(__dirname, "02-voltear-una-carta/index.html"),
        grid: path.resolve(__dirname, "03-grid-cartas/index.html"),
        voltearDos: path.resolve(__dirname, "04-voltear-dos-cartas/index.html"),
        mapear: path.resolve(__dirname, "05-mapear-div-con-array/index.html"),
      },
    },
  },
  server: {
    fs: {
      allow: ['.'],
    },
    watch: { // QUITAR ESTA LINEA AL ACABAR PRIMEROS PASOS
      ignored: ['**/FINAL/**'],} // QUITAR ESTA LINEA AL ACABAR PRIMEROS PASOS
  },
});
