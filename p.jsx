import supertest from 'supertest-as-promised';
import cheerio from 'cheerio';
import lodash from 'lodash';
import promise from 'bluebird';
import fs from 'fs';

const req = supertest('http://vote2016.cec.gov.tw/zh_TW/')

const data = [
  'P1/n000000000000000.html',
  'P1/n100000000000000.html',
  'P1/n200000000000000.html',
  'P1/n200000100000000.html',
  'P1/n200000200000000.html',
  'P1/n200000300000000.html',
  'P1/n200000400000000.html',
  'P1/n200000500000000.html',
  'P1/n200000600000000.html',
  'P1/n200000700000000.html',
  'P1/n200000800000000.html',
  'P1/n200000900000000.html',
  'P1/n200001000000000.html',
  'P1/n200001100000000.html',
  'P1/n200001200000000.html',
  'P1/n200001300000000.html',
  'P1/n200001400000000.html',
  'P1/n200001500000000.html',
  'P1/n200001600000000.html',
  'P1/n200001700000000.html',
  'P1/n200001800000000.html',
  'P1/n200001900000000.html',
  'P1/n200002000000000.html',
  'P1/n200002100000000.html',
  'P1/n200002200000000.html',
  'P1/n200002300000000.html',
  'P1/n200002400000000.html',
  'P1/n200002500000000.html',
  'P1/n200002600000000.html',
  'P1/n200002700000000.html',
  'P1/n200002800000000.html',
  'P1/n200002900000000.html',
  'P1/n300000000000000.html',
  'P1/n400000000000000.html',
  'P1/n500000000000000.html',
  'P1/n600000000000000.html',
  'P1/n701000000000000.html',
  'P1/n702000000000000.html',
  'P1/n703000000000000.html',
  'P1/n704000000000000.html',
  'P1/n705000000000000.html',
  'P1/n706000000000000.html',
  'P1/n707000000000000.html',
  'P1/n708000000000000.html',
  'P1/n709000000000000.html',
  'P1/n710000000000000.html',
  'P1/n711000000000000.html',
  'P1/n712000000000000.html',
  'P1/n713000000000000.html',
  'P1/n714000000000000.html',
  'P1/n801000000000000.html',
  'P1/n802000000000000.html',
];

promise.all(
  data.map((url) => {
    return req.get(url)
      .expect(200)
      .then(reply => {
        const $ = cheerio.load(reply.res.text);
        const title = $('#divContent tr').eq(0).text().trim();
        const tr = $('#divContent .tableT tr');
        return {
          title,
          content: tr.map((i, row) => $('td', row).map((j, column) => $(column).text().trim()).get().join(',')).get(),
        };
      }, err => {
        return {
          title: url,
          err,
        }
      });
  })
).then((result) => {
  fs.writeFileSync(`${__dirname}/p/${Date.now()}.json`, JSON.stringify(result, null, 4));
});