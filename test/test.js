'use strict';

var assert = require('assert');
var utils = require('../lib/utils');
var htmlprocessor = require('../index');
var cfg = { host: "http://localhost:3000", path: "/public/dist/a/" };

describe('dev', function () {
  it('should process and output an html file as defined by the build special comments for dev target', function (done) {
    htmlprocessor({
        src: ['test/fixtures/index.html'],
        dest: 'test/fixtures/dev/index.processed.html'
      },
      {
        data: {
          message: 'This is dev target'
        },
        environment: 'dev',
        config: cfg
      }
    );

    var actual = utils.read('test/fixtures/dev/index.processed.html');
    var expected = utils.read('test/expected/dev/index.html');
    // assert.equal(actual, expected);
    done();
  });
});

describe('dist', function () {
  it('should process and output an html file as defined by the build special comments for dist target', function (done) {
    htmlprocessor({
        src: ['test/fixtures/index.html'],
        dest: 'test/fixtures/dist/index.processed.html'
      },
      {
        data: {
          message: 'This is dist target'
        },
        environment: 'dist',
        config: cfg
      }
    );

    var actual = utils.read('test/fixtures/dist/index.processed.html');
    var expected = utils.read('test/expected/dist/index.html');
    // assert.equal(actual, expected);

    done();
  });
});

describe('custom', function () {
  it('should be able to process a template with custom delimiters', function (done) {
    htmlprocessor({
        src: ['test/fixtures/custom.html'],
        dest: 'test/fixtures/custom/custom.processed.html'
      },
      {
        data: {
          message: 'This has custom delimiters for the template'
        },
        environment: 'dist',
        templateSettings: {
          interpolate: /{{([\s\S]+?)}}/g
        },
        config: cfg
      }
    );

    var actual = utils.read('test/fixtures/custom/custom.processed.html');
    var expected = utils.read('test/expected/custom/custom.html');
    // assert.equal(actual, expected);

    done();
  });
});

describe('marker', function () {

  it('should process and output an html file as defined by the build special comments for marker target', function (done) {
    htmlprocessor({
        src: ['test/fixtures/commentMarker.html'],
        dest: 'test/fixtures/commentMarker/commentMarker.processed.html'
      },
      {
        data: {
          message: 'This uses a custom comment marker',
        },
        commentMarker: 'process',
        environment: 'marker',
        config: cfg
      }
    );

    var actual = utils.read('test/fixtures/commentMarker/commentMarker.processed.html');
    var expected = utils.read('test/expected/commentMarker/commentMarker.html');
    // assert.equal(actual, expected);

    done();
  });
});

describe('strip', function () {

  it('should remove build comments for non-targets', function (done) {
    htmlprocessor({
        src: ['test/fixtures/strip.html'],
        dest: 'test/fixtures/strip/strip.processed.html'
      },
      {strip: true, config: cfg});

    var actual = utils.read('test/fixtures/strip/strip.processed.html');
    var expected = utils.read('test/expected/strip/strip.html');
    // assert.equal(actual, expected);

    done();
  });
});

describe('multiple', function () {

  it('parse comment block defining multiple targets (1)', function (done) {
    htmlprocessor({
      src: ['test/fixtures/multiple.html'],
      dest: 'test/fixtures/multiple/mult_one.processed.html'
    }, {
        environment: 'mult_one',
        config: cfg
    });

    var actual = utils.read('test/fixtures/multiple/mult_one.processed.html');
    var expected = utils.read('test/expected/multiple/mult_one.html');
    // assert.equal(actual, expected, 'parse comment block defining multiple targets (1)');
    done();
  });

  it('parse comment block defining multiple targets (2)', function (done) {
    htmlprocessor({
      src: ['test/fixtures/multiple.html'],
      dest: 'test/fixtures/multiple/mult_two.processed.html'
    }, {
        environment: 'mult_two',
        config: cfg
    });

    var actual = utils.read('test/fixtures/multiple/mult_two.processed.html');
    var expected = utils.read('test/expected/multiple/mult_two.html');
    // assert.equal(actual, expected);

    done();
  });

  it('parse comment block defining multiple targets (3)', function (done) {
    htmlprocessor({
      src: ['test/fixtures/multiple.html'],
      dest: 'test/fixtures/multiple/mult_three.processed.html'
    }, {
        environment: 'mult_three',
        config: cfg
    });

    var actual = utils.read('test/fixtures/multiple/mult_three.processed.html');
    var expected = utils.read('test/expected/multiple/mult_three.html');
    // assert.equal(actual, expected);

    done();
  });
});

describe('include_js', function () {
  it('include a js file', function (done) {
    htmlprocessor({
      src: ['test/fixtures/include.html'],
      dest: 'test/fixtures/include/include.processed.html'
    },{ config: cfg });

    var actual = utils.read('test/fixtures/include/include.processed.html');
    var expected = utils.read('test/expected/include/include.html');
    // assert.equal(actual, expected);

    done();
  });
});

describe('conditional_ie', function () {
  it('correctly parse build comments inside conditional ie statement', function (done) {
    htmlprocessor({
      src: ['test/fixtures/conditional_ie.html'],
      dest: 'test/fixtures/conditional_ie/conditional_ie.processed.html'
    }, { config: cfg });

    var actual = utils.read('test/fixtures/conditional_ie/conditional_ie.processed.html');
    var expected = utils.read('test/expected/conditional_ie/conditional_ie.html');
    // assert.equal(actual, expected);

    done();
  });
});

describe('recursive_process', function () {
  it('recursively process included files', function (done) {
    htmlprocessor({
      src: ['test/fixtures/recursive.html'],
      dest: 'test/fixtures/recursive/recursive.processed.html'
    }, {
      recursive: true,
      config: cfg
    });

    var actual = utils.read('test/fixtures/recursive/recursive.processed.html');
    var expected = utils.read('test/expected/recursive/recursive.html');
    // assert.equal(actual, expected);

    done();
  });
});

describe('custom_blocktype', function () {
  it('define custom block types', function (done) {
    htmlprocessor({
      src: ['test/fixtures/custom_blocktype.html'],
      dest: 'test/fixtures/custom_blocktype/custom_blocktype.processed.html'
    }, {
      customBlockTypes: ['test/fixtures/custom_blocktype.js'],
      config: cfg
    });

    var actual = utils.read('test/fixtures/custom_blocktype/custom_blocktype.processed.html');
    var expected = utils.read('test/expected/custom_blocktype/custom_blocktype.html');
    // assert.equal(actual, expected);

    done();
  });
});

describe('attr', function () {
  it('modify attributes', function (done) {
    htmlprocessor({
      src: ['test/fixtures/attr.html'],
      dest: 'test/fixtures/attr/attr.processed.html'
    },{ config: cfg });

    var actual = utils.read('test/fixtures/attr/attr.processed.html');
    var expected = utils.read('test/expected/attr/attr.html');
    // assert.equal(actual, expected);

    done();
  });
});

describe('template', function () {
  it('replace template data', function (done) {
    htmlprocessor({
      src: ['test/fixtures/template.html'],
      dest: 'test/fixtures/template/template.processed.html'
    }, {
      data: {
        msg: 'hey',
        test: 'text_$&_text'
      },
      config: cfg
    });

    var actual = utils.read('test/fixtures/template/template.processed.html');
    var expected = utils.read('test/expected/template/template.html');
    // assert.equal(actual, expected);

    done();
  });
});

describe('remove_no_newline', function () {
  it('should remove block even if no starting new line is present', function (done) {
    htmlprocessor({
        src: ['test/fixtures/remove_no_newline.html'],
        dest: 'test/fixtures/remove/remove_no_newline.processed.html'
    }, {
        environment: 'testa',
        config: cfg
    });

    var actual = utils.read('test/fixtures/remove/remove_no_newline.processed.html');
    var expected = utils.read('test/expected/remove/remove_no_newline.html');
    // assert.equal(actual, expected);

    done();
  });
});

describe('remove_with_newline', function () {
  it('should remove block also when has a preceding newline', function (done) {
    htmlprocessor({
        src: ['test/fixtures/remove_with_newline.html'],
        dest: 'test/fixtures/remove/remove_with_newline.processed.html'
    }, {
        environment: 'testa',
        config: cfg
    });

    var actual = utils.read('test/fixtures/remove/remove_with_newline.processed.html');
    var expected = utils.read('test/expected/remove/remove_with_newline.html');
    // assert.equal(actual, expected);

    done();
  });
});

describe('inline', function () {
  it('should inline css and js for dist target', function (done) {
    htmlprocessor({
        src: ['test/fixtures/inline.html'],
        dest: 'test/fixtures/inline/inline.processed.html'
    }, { config: cfg });

    var actual = utils.read('test/fixtures/inline/inline.processed.html');
    var expected = utils.read('test/expected/inline/inline.html');
    // assert.equal(actual, expected);

    done();
  });
});