require("dotenv-flow").config();
const fs = require("fs");
const path = require("path");
const { logger } = require('./utils/logger');
const requests = require('./utils/requests');
const { getToken } = require('./utils/token');

const ENVIRONMENT = process.env.NODE_ENV;
const BACKEND_URL = process.env.BACKEND_URL;

logger.info("Validate blueprints against: %s", BACKEND_URL);

fs.readdir("export/blueprints", async (err, files) => {
  if (err) {
    logger.error("Unable to find blueprints directory");
    process.exit(1);
  }

  
  try {
    logger.debug("get token");
    const token = await getToken('123',["me"]);
    logger.info('token acquired');

    await files.forEach(async (file) => {    
      if (path.extname(`../export/blueprints/${file}`) === ".json") {
        fs.readFile(`export/blueprints/${file}`, "utf8", async (err, data) => {
          let content = JSON.parse(data);
  
          try{
      
            const response = await requests.validateBlueprint(content, { environment: ENVIRONMENT, token })
            
            if(response.status === 200) {
              logger.info('[%s] is valid', file.toString().trim());
            } else {
              logger.error('[%s] invalid, message: %s', file.toString().trim(), response.data.message);
              process.exit(1)
            }           
      
          } catch(e) {
      
            logger.error('error: %s', e);
            process.exit(1)
      
          }
        });
      }
    });

  } catch (e) {
    logger.error("unable to get token")
    process.exit(1)
  }
});
