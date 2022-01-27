require("dotenv-flow").config();
const fs = require("fs");
const path = require("path");
const { logger } = require('./utils/logger');
const requests = require('./utils/requests');
const { getToken } = require('./utils/token');

const BACKEND_URL = process.env.BACKEND_URL;

logger.info("Deploying to: %s", BACKEND_URL);

fs.readdir("export/blueprints", async (err, files) => {
  if (err) {
    logger.error("Unable to find blueprints directory");
    process.exit(1);
  }

  try {
    logger.debug("get token");
    const token = await getToken('123',["me"]);
    logger.info('token acquired');

    files.forEach(async (file) => {
      if (path.extname(`./export/blueprints/${file}`) === ".json") {       
        fs.readFile(`./export/blueprints/${file}`,"utf8", async (err, data) => {
          let content = JSON.parse(data);
           
          const comparison = await requests.compareBlueprint(content, { token })
          
          if (comparison.status === 202 || comparison.status === 404) {             
            const publish = await requests.publishBlueprint(content, { token })

            logger.info('[%s] published, workflow_id: %s', file.toString().trim(), publish.workflow_id);

          } else {

            logger.debug('No changes at %s, skipped', file.toString().trim());
            
          }
        }
        );
      }
    });
  } catch (e) {
    console.error("unable to get token");
    process.exit(1);
  }
});
