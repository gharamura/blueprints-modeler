module.exports = {
  id: "FLOW",
  name: "direcionar fluxo",
  next: {
    true: "END",
    default: "END",
  },
  type: "Flow",
  lane_id: "actorId",
  parameters: {
    input: {
      decision: {
        $ref: "result.data.key",
      },
    },
  },
};
