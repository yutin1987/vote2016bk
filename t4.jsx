import supertest from 'supertest-as-promised';
import cheerio from 'cheerio';
import lodash from 'lodash';
import promise from 'bluebird';
import fs from 'fs';

const req = supertest('http://vote2016.cec.gov.tw/zh_TW/')

const data = [
  'T4/n000000000000000.html',
  'T4/n100000000000000.html',
  'T4/n100000100000000.html',
  'T4/n100000100000000.html',
  'T4/n100000200000000.html',
  'T4/n100000200000000.html',
  'T4/n100000300000000.html',
  'T4/n100000300000000.html',
  'T4/n100000400000000.html',
  'T4/n100000400000000.html',
  'T4/n100000500000000.html',
  'T4/n100000500000000.html',
  'T4/n100000600000000.html',
  'T4/n100000600000000.html',
  'T4/n100000700000000.html',
  'T4/n100000700000000.html',
  'T4/n100000800000000.html',
  'T4/n100000800000000.html',
  'T4/n100000900000000.html',
  'T4/n100000900000000.html',
  'T4/n100001000000000.html',
  'T4/n100001000000000.html',
  'T4/n100001100000000.html',
  'T4/n100001100000000.html',
  'T4/n100001200000000.html',
  'T4/n100001200000000.html',
  'T4/n200000000000000.html',
  'T4/n300000000000000.html',
  'T4/n400000000000000.html',
  'T4/n500000000000000.html',
  'T4/n600000000000000.html',
  'T4/n701000000000000.html',
  'T4/n702000000000000.html',
  'T4/n703000000000000.html',
  'T4/n704000000000000.html',
  'T4/n705000000000000.html',
  'T4/n706000000000000.html',
  'T4/n707000000000000.html',
  'T4/n708000000000000.html',
  'T4/n709000000000000.html',
  'T4/n710000000000000.html',
  'T4/n711000000000000.html',
  'T4/n712000000000000.html',
  'T4/n713000000000000.html',
  'T4/n714000000000000.html',
  'T4/n801000000000000.html',
  'T4/n802000000000000.html',
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
  fs.writeFileSync(`${__dirname}/t4/${Date.now()}.json`, JSON.stringify(result, null, 4));
});