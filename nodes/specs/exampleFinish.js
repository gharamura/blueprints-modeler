module.exports = {
  id: "END",
  name: "finish generic process",
  next: null,
  type: "Finish",
  lane_id: "actorId",
  parameters: {
    input: {
      data: { $ref: "bag" }
    }
  }
};
