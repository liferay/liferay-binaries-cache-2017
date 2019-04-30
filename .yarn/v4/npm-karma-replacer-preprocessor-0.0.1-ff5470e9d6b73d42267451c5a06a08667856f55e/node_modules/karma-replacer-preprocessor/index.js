var createPreprocessor = function(args, config, logger, helper) {
  config = config || {};

  var log = logger.create('preprocessor.replacer');

  var defaultOptions = {
    sourceMaps: false
  };

  var options = helper.merge(defaultOptions, args.options || {}, config.options || {});

  var replacer = args.replacer || config.replacer || function(file, content) {
    return content;
  };

  return function(content, file, done) {
    log.debug('Processing "%s".', file.originalPath);

    var replacedContent = replacer(file, content);

    return done(null, replacedContent);
  };
};

createPreprocessor.$inject = ['args', 'config.replacerPreprocessor', 'logger', 'helper'];

module.exports = {
  'preprocessor:replacer': ['factory', createPreprocessor]
};