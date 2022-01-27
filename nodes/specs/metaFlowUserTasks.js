const _ = require("lodash");
const { logger } = require("../../utils/logger");
const { nodeList, getNode, getExample } = require("../../utils/nodeFunctions");

const buildNode = () => {
  const allNodes = nodeList();
  try {
    const userNodes = _.compact(
      allNodes.map((i) => {
        const node = getNode(i);
        if (node?.type === "UserTask") {
          let nodeExample;
          if (node?.example?.file) {
            nodeExample = getExample(node.example.file);
          } else {
            logger.warn(`unable to get example from ${node.name}`);
            nodeExample = {};
          }
          return {
            id: node.parameters.action,
            name: node.name,
            next: "END",
            type: node.type,
            lane_id: "actorId",
            parameters: {
              action: node.parameters.action,
              input: nodeExample,
              activity_schema: node.parameters.activity_schema,
            },
            timeout: 10,
          };
        }
      })
    );
    const actions = userNodes.reduce(
      (acc, i) => {
        return { ...acc, [i.parameters.action]: i.parameters.action };
      },
      { default: "END" }
    );
    const flowNode = {
      id: "SWITCH",
      name: "switch selected action",
      type: "Flow",
      next: actions,
      lane_id: "actorId",
      parameters: {
        input: {
          key: { $ref: "bag.action" },
        },
      },
    };
    return [flowNode, ...userNodes];
  } catch (e) {
    logger.error("unable to build node", e);
  }
};

module.exports = buildNode();
