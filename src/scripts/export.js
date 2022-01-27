const fs = require('fs');
const path = require('path');
const JSum = require('jsum');
const { logger } = require('../utils/logger');

if (!fs.existsSync('export')) { fs.mkdirSync('export'); }
if (!fs.existsSync('export/blueprints')) { fs.mkdirSync('export/blueprints'); }
if (!fs.existsSync('download/me')) { fs.mkdirSync('download/me'); }

logger.debug('starting export');

fs.readdir('blueprints', async (err, files) => {
  if (err) {
    logger.error('Unable to find blueprints directory');
    process.exit(1);
  }

  const summary = [];
  files.forEach(async (file) => {
    if (path.extname(`../../blueprints/${file}`) === '.js') {
      const scriptName = path.basename(`../../blueprints/${file}`, '.js');
      const spec = require(`../../blueprints/${scriptName}`);
      fs.writeFileSync(`export/blueprints/${spec.name}.json`, JSON.stringify(spec, null, 2));

      logger.info(`Exporting ${file} to ${spec.name}.json!`);

      summary.push({
        name: spec.name,
        created_at: new Date(),
        version: 0,
        hash: JSum.digest(spec.blueprint_spec, 'SHA256', 'hex'),
      });

      return {
        name: spec.name,
        created_at: new Date(),
        version: 0,
        hash: JSum.digest(spec.blueprint_spec, 'SHA256', 'hex'),
      };
    } if (path.extname(`../blueprints/${file}`) === '.json') {
      let bp;

      const data = fs.readFileSync(`blueprints/${file}`);
      bp = JSON.parse(data);

      fs.writeFileSync(`export/blueprints/${bp.name}.json`, JSON.stringify(bp, null, 2));

      logger.info(`Exporting ${file} to ${bp.name}.json!`);

      summary.push({
        name: bp.name,
        created_at: new Date(),
        version: 0,
        hash: JSum.digest(bp.blueprint_spec, 'SHA256', 'hex'),
      });

      return {
        name: bp.name,
        created_at: new Date(),
        version: 0,
        hash: JSum.digest(bp.blueprint_spec, 'SHA256', 'hex'),
      };
    }
  });

  logger.info(`Saving summary`);
  fs.writeFileSync('download/me/summary.json', JSON.stringify(summary, null, 2));
});
