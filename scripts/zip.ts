const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const pkg = require('../package.json');

const DIR_NAME = 'sketch-plugin-template.sketchplugin';
const DEST_DIR = path.join(__dirname, `../${DIR_NAME}`);
const DEST_ZIP_DIR = path.join(__dirname, '../release');

const extractExtensionData = () => {
  return {
    name: pkg.name,
    version: pkg.version,
  };
};
const { name, version } = extractExtensionData();

export const zipFilename = `${name}.v${version}.zip`;

const makeDestZipDirIfNotExists = () => {
  if (!fs.existsSync(DEST_ZIP_DIR)) {
    fs.mkdirSync(DEST_ZIP_DIR);
  }
};

const buildZip = (src: string, dist: string, zipFilename: string) => {
  makeDestZipDirIfNotExists();

  console.info(`📦 构建 ${zipFilename}...`);

  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = fs.createWriteStream(path.join(dist, zipFilename));

  return new Promise<void>((resolve, reject) => {
    archive
      .directory(src, DIR_NAME)
      .on('error', (err: any) => reject(err))
      .pipe(stream);

    stream.on('close', () => resolve());
    archive.finalize().then();
  });
};

export const releaseZip = () => {
  buildZip(DEST_DIR, DEST_ZIP_DIR, zipFilename)
    .then(() => console.info('✅  构建完成!'))
    .catch(console.error);
};
