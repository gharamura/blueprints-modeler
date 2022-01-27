module.exports = {
  id: "INDEX-PROCESS",
  name: "Index Process",
  type: "systemTask",
  category: "createIndex",
  next: "END",
  lane_id: "actorId",
  parameters: {
    input: {
      entity_type: { $ref: "bag.entity_type" },
      entity_id: { $ref: "bag.entity_id" },
    },
  },
};
