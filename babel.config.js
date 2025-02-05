module.exports = {
  presets: [
    "@babel/preset-env", // Convertit le code moderne en code compatible avec Node.js
    "@babel/preset-react", // Si tu utilises React
  ],
  plugins: [
    "@babel/plugin-transform-runtime", // Pour gérer certaines fonctionnalités JS modernes
  ],
}
