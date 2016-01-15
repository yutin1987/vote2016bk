'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var req = (0, _supertestAsPromised2['default'])('http://vote2016.cec.gov.tw/zh_TW/');

var data = ['P1/n000000000000000.html', 'P1/n100000000000000.html', 'P1/n200000000000000.html', 'P1/n200000100000000.html', 'P1/n200000200000000.html', 'P1/n200000300000000.html', 'P1/n200000400000000.html', 'P1/n200000500000000.html', 'P1/n200000600000000.html', 'P1/n200000700000000.html', 'P1/n200000800000000.html', 'P1/n200000900000000.html', 'P1/n200001000000000.html', 'P1/n200001100000000.html', 'P1/n200001200000000.html', 'P1/n200001300000000.html', 'P1/n200001400000000.html', 'P1/n200001500000000.html', 'P1/n200001600000000.html', 'P1/n200001700000000.html', 'P1/n200001800000000.html', 'P1/n200001900000000.html', 'P1/n200002000000000.html', 'P1/n200002100000000.html', 'P1/n200002200000000.html', 'P1/n200002300000000.html', 'P1/n200002400000000.html', 'P1/n200002500000000.html', 'P1/n200002600000000.html', 'P1/n200002700000000.html', 'P1/n200002800000000.html', 'P1/n200002900000000.html', 'P1/n300000000000000.html', 'P1/n400000000000000.html', 'P1/n500000000000000.html', 'P1/n600000000000000.html', 'P1/n701000000000000.html', 'P1/n702000000000000.html', 'P1/n703000000000000.html', 'P1/n704000000000000.html', 'P1/n705000000000000.html', 'P1/n706000000000000.html', 'P1/n707000000000000.html', 'P1/n708000000000000.html', 'P1/n709000000000000.html', 'P1/n710000000000000.html', 'P1/n711000000000000.html', 'P1/n712000000000000.html', 'P1/n713000000000000.html', 'P1/n714000000000000.html', 'P1/n801000000000000.html', 'P1/n802000000000000.html'];

_bluebird2['default'].all(data.map(function (url) {
  return req.get(url).expect(200).then(function (reply) {
    var $ = _cheerio2['default'].load(reply.res.text);
    var title = $('#divContent tr').eq(0).text().trim();
    var tr = $('#divContent .tableT tr');
    return {
      title: title,
      content: tr.map(function (i, row) {
        return $('td', row).map(function (j, column) {
          return $(column).text().trim();
        }).get().join(',');
      }).get()
    };
  }, function (err) {
    return {
      title: url,
      err: err
    };
  });
})).then(function (result) {
  _fs2['default'].writeFileSync(__dirname + '/p/' + Date.now() + '.json', JSON.stringify(result, null, 4));
});