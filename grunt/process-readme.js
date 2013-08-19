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


};