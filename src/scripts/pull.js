require("dotenv-flow").config();
const fs = require("fs");
const JSum = require('jsum');
const { logger } = require('./utils/logger');
const requests = require('./utils/requests');
const { getToken } = require('./utils/token');

const ENVIRONMENT = process.env.NODE_ENV;
const BACKEND_URL = process.env.BACKEND_URL;

logger.info("pulling blueprints from: %s", BACKEND_URL);

if (!fs.existsSync("download")) { fs.mkdirSync("download") }
if (!fs.existsSync(`download/${ENVIRONMENT}`)) { fs.mkdirSync(`download/${ENVIRONMENT}`) }

const doit = async () => {

  logger.debug("get token");
  const token = await getToken('123',["me"]);
  logger.debug('token acquired');
  
  const workflows = await requests.getWorkflows({ token });
  
  const promises = workflows.map(async (wf) => {
    let createdAt;
    let spec;
    
    if(!wf.blueprint_spec) {
      const bp = await requests.getBlueprintSpec(wf.id, { environment: ENVIRONMENT, token });
      spec = bp.blueprint_spec;
      createdAt = bp.created_at;
    } else {
      spec = wf.blueprint_spec;
      createdAt = wf.created_at;
    }

    const moduleExports = {
      name: wf.name,
      description: wf.description,
      blueprint_spec: spec
    }

    fs.writeFileSync(`download/${ENVIRONMENT}/${wf.name}.json`,JSON.stringify(moduleExports));
    
    logger.info(`Downloaded ${wf.name}`);
    return { 
      name: wf.name,
      created_at: createdAt,
      version: wf.version,
      hash: JSum.digest(spec, 'SHA256', 'hex')
    }
  });

  const summary = await Promise.all(promises);

  fs.writeFileSync(`download/${ENVIRONMENT}/summary.json`,JSON.stringify(summary, null, 2));

  logger.info('summary done!');
}

doit();


