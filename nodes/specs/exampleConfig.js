module.exports = {
  id: "CONFIG",
  name: "guardar parâmetros do processo",
  next: "",
  type: "SystemTask",
  lane_id: "authenticated",
  category: "setToBag",
  parameters: {
    input: {
      actorId: { $ref: "actor_data.actor_id" }
    },
  },
};