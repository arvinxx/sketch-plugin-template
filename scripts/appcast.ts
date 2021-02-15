import { zipFilename } from './zip';
import xml2js from 'xml2js';
import path from 'path';
import fs from 'fs';

const pkg = require('../package.json');

const { version, repository } = pkg;

const EMPTY_APPCAST = {
  rss: {
    $: {
      'xmlns:sparkle': 'http://www.andymatuschak.org/xml-namespaces/sparkle',
      'xmlns:dc': 'http://purl.org/dc/elements/1.1/',
      version: '2.0',
    },
    channel: [{ item: [] }],
  },
};

export const updateAppcast = async () => {
  const appcast = path
    .join(process.cwd(), '.appcast.xml')
    .replace(/^\.\//g, '');

  const appcastObj = await new Promise((resolve) => {
    fs.readFile(appcast, (err, data) => {
      if (err) {
        return resolve(EMPTY_APPCAST);
      }
      return xml2js.parseString(data, (parseErr, result) => {
        if (parseErr) {
          return resolve(EMPTY_APPCAST);
        }
        return resolve(result);
      });
    });
  });

  // @ts-ignore
  appcastObj.rss.channel[0].item.unshift({
    enclosure: [
      {
        $: {
          url: `${repository}/releases/download/v${version}/${zipFilename}`,
          'sparkle:version': version,
        },
      },
    ],
  });
  const builder = new xml2js.Builder();
  const xml = await builder.buildObject(appcastObj);

  fs.writeFileSync(appcast, xml);
};
