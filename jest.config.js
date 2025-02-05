module.exports = {
  transformIgnorePatterns: [
    "/node_modules/(?!react-leaflet|@react-leaflet).+\\.js$", // Ignore les autres packages mais transforme react-leaflet
  ],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest", // Transformer tout le code JSX/JS avec Babel
  },
  moduleNameMapper: {
    // Si tu utilises des modules comme des CSS, images ou autres ressources non-JS, tu peux les simuler ici
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
}
