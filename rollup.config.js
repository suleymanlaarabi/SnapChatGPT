import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "./.tempDist/src/index.js", // Votre fichier d'entrée
  output: {
    file: "dist/bundle.js", // Le fichier final
    format: "iife", // Format immédiatement invoqué pour éviter d'introduire des syntaxes modernes
  },
  plugins: [
    resolve(), // Résout les modules node dans les fichiers ES6
  ],
};
