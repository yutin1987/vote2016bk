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

var data = ['T3/n000000000000000.html', 'T3/n100000000000000.html', 'T3/n100000100000000.html', 'T3/n100000100000000.html', 'T3/n100000200000000.html', 'T3/n100000200000000.html', 'T3/n100000300000000.html', 'T3/n100000300000000.html', 'T3/n100000400000000.html', 'T3/n100000400000000.html', 'T3/n100000500000000.html', 'T3/n100000500000000.html', 'T3/n100000600000000.html', 'T3/n100000600000000.html', 'T3/n100000700000000.html', 'T3/n100000700000000.html', 'T3/n100000800000000.html', 'T3/n100000800000000.html', 'T3/n100000900000000.html', 'T3/n100000900000000.html', 'T3/n100001000000000.html', 'T3/n100001000000000.html', 'T3/n100001100000000.html', 'T3/n100001100000000.html', 'T3/n100001200000000.html', 'T3/n100001200000000.html', 'T3/n200000000000000.html', 'T3/n300000000000000.html', 'T3/n400000000000000.html', 'T3/n500000000000000.html', 'T3/n600000000000000.html', 'T3/n701000000000000.html', 'T3/n702000000000000.html', 'T3/n703000000000000.html', 'T3/n704000000000000.html', 'T3/n705000000000000.html', 'T3/n706000000000000.html', 'T3/n707000000000000.html', 'T3/n708000000000000.html', 'T3/n709000000000000.html', 'T3/n710000000000000.html', 'T3/n711000000000000.html', 'T3/n712000000000000.html', 'T3/n713000000000000.html', 'T3/n714000000000000.html', 'T3/n801000000000000.html', 'T3/n802000000000000.html'];

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
  _fs2['default'].writeFileSync(__dirname + '/t3/' + Date.now() + '.json', JSON.stringify(result, null, 4));
});