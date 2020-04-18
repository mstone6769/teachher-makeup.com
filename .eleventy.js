const htmlmin = require('html-minifier');
const Terser = require('terser');
const pluginSass = require("eleventy-plugin-sass");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginSass, {
    watch: ['src/styles/*.{scss,sass}', '!node_modules/**'],
    sourcemaps: true
  });
  eleventyConfig.addFilter('nowhitespace', (code) => code.replace(/\s+/g, ''));
  eleventyConfig.addFilter('jsmin', (code) => {
    const minified = Terser.minify(code);
    if (!minified.error) {
      return minified.code;
    }
    console.log('Terser error: ', minified.error);
    return code;
  });
  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    if( !outputPath.endsWith('.html') ) {
      return content;
    }
    return htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true
    });
  });

  eleventyConfig.addPassthroughCopy({ 'src/_static': '.' });
  return {
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};