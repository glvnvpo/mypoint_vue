module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/style/variables.scss";'
      }
    }
  },
  devServer: {
    proxy: process.env.VUE_APP_API_URL
  }
};
