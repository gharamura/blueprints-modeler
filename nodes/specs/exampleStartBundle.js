module.exports = [
  {
    id: "START",
    name: "start process",
    next: "CONFIG",
    type: "Start",
    lane_id: "anyone",
    parameters: {
      timeout: 604800, //1 semana
      input_schema: {},
    },
  },
  {
    id: "CONFIG",
    name: "configure process",
    next: "END",
    type: "systemTask",
    category: "SetToBag",
    lane_id: "anyone",
    parameters: {
      input: {
        actorId: { $ref: "actor_data.actor_id" },
        value: "casa"
      },
    },
  },
];
