exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        "https":  false,
        "fs": false,
        "path": false,
        "os": false,
      }
    }
  })
}