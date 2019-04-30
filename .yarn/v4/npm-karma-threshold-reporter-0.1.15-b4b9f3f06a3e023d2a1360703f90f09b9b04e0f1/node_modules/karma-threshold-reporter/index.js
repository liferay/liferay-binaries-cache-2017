var istanbul = require('istanbul');
var istanbulUtils = require('./istanbul-utils');

var ThresholdReporter = function(baseReporterDecorator, config, logger, helper) {
  var log = logger.create('Threshold');
  var reporterConfig = config.thresholdReporter || { statements: 50, branches: 50, functions: 50, lines: 50};
  baseReporterDecorator(this);
  var failedExpectation = false;

  var collector = new istanbul.Collector();

  function lineForKey(summary, key, expectation) {
    var metrics = summary[key],
      skipped,
      result;
    key = key.substring(0, 1).toUpperCase() + key.substring(1);
    if (key.length < 12) { key += '                   '.substring(0, 12 - key.length); }
    result = [ key , ':', metrics.pct + '%', '(', metrics.covered + '/' + metrics.total, ')', 'Threshold : ' + expectation + '%'].join(' ');
    skipped = metrics.skipped;
    if(metrics.pct < expectation) {
      failedExpectation = true;
    }

    if (skipped > 0) {
      result += ', ' + skipped + ' ignored';
    }
    return result;
  }

  this.onBrowserComplete = function(browser,result) {
    if (result && result.coverage) {
      collector.add(result.coverage);
    }
  };

  this.onSpecComplete = function(browser, result) {
    if (result && result.coverage) {
      collector.add(result.coverage);
    }
  };

  // process the coverage thresholds before exiting
  this.onExit = function(done) {
    var summaries = [],summary,lines = [],text;
    collector.files().forEach(function (file) {
      summaries.push(istanbulUtils.summarizeFileCoverage(collector.fileCoverageFor(file)));
    });

    summary = istanbulUtils.mergeSummaryObjects.apply(null, summaries);
    var statements = summary['statements'];

    lines.push('');
    lines.push('==================== Coverage / Threshold summary =============================');
    lines.push.apply(lines, [
      lineForKey(summary, 'statements', reporterConfig.statements),
      lineForKey(summary, 'branches', reporterConfig.branches),
      lineForKey(summary, 'functions', reporterConfig.functions),
      lineForKey(summary, 'lines', reporterConfig.lines)
    ]);
    lines.push('================================================================================');
    text = lines.join('\n');
    console.log(text);

    if(failedExpectation) {
      log.error('Failed minimum coverage threshold expectations');
      process.on('exit', function() {
        process.exit(1);
      });
    }
    done();
  };
};

ThresholdReporter.$inject = ['baseReporterDecorator', 'config', 'logger', 'helper'];

// PUBLISH DI MODULE
module.exports = {
  'reporter:threshold': ['type', ThresholdReporter]
};
