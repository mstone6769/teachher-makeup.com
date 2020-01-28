module.exports = function(eleventyConfig) {
  return {
    templateFormats: [
      "html"
    ],
    dir: {
      input: './src',
      output: './_site'
    }
  };
};