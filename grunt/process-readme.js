module.exports = function(grunt) {
  grunt.registerTask('process-readme', function() {
    var done = this.async();

    require('https').get({
      path: '/walmartlabs/thorax/content-rework/README.md',
      method: 'GET',
      host: 'raw.github.com',
      port: 443
    }, function(response) {
      console.log("Got response: " + response.statusCode);
      var buffer = '';
      response.on('data', function(data) {
        buffer += data.toString();
      });
      response.on('end', function() {
        processReadme(buffer, done);
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
      console.log(e);
      done(false)
    });

  });

  function processReadme(text, done) {
    var segments = text.split(/\n\#\s/m).map(function(segment, i) {
      if (i !== 0) {
        segment = '# ' + segment;
      }
      return segment;
    });

    // segments SHOULD contain:
    // [0] thorax
    // [1] quick start
    // [2] features
    // [3] getting started
    // [4] API Reference
    // [5] Error Codes

    grunt.file.write('src/content/quick-start.md', segments[1]);
    grunt.file.write('src/content/features.md', segments[2].replace(/^.+/, '')); // will remove first line only
    grunt.file.write('src/content/api.md', segments[3]);

    
    done(true);
  }

};