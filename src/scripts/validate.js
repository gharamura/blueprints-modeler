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
  
  let token;

  try {
    logger.debug("get token");
    token = await getToken('123',["me"]);
    logger.info('token acquired');
  } catch (e) {
    logger.error("unable to get token")
    process.exit(1)
  }

  const promises = files.map(async (file) => {
    if (path.extname(`../export/blueprints/${file}`) === ".json") {
      const data = fs.readFileSync(`export/blueprints/${file}`, "utf8") 
      let content = JSON.parse(data);
      const validation = await requests.validateBlueprint(content, { environment: ENVIRONMENT, token })          
        
      return {
        file,
        validation
      }
    }
  }
  );

  const validations = await Promise.allSettled(promises)

  let errors;

  validations.map(item => {
    const response = item.value;
    if(response?.validation?.status === 200) {
      logger.info('[%s] is valid', response.file.toString().trim());
    } else {
      logger.error('[%s] invalid, message: %s', response.file.toString().trim(), response.validation.data.message);
      errors = true
    }
  })

  if(errors) {
    logger.warn("Validation problem")
    process.exit(1)
  } else {
    logger.info("Validation Sucessful")
  }

});
