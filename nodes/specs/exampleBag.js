module.exports = {
  id: "BAG-DATA",
  name: "guardar dados na bag",
  next: "END",
  type: "SystemTask",
  lane_id: "actorId",
  category: "setToBag",
  parameters: {
    input: {
      data: {
        $ref: "result.data"
      }
    }
  }
}