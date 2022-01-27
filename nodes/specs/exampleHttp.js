module.exports = {
  id: "HTTP-CALL",
  name: "call an example endpoint",
  next: "END",
  type: "SystemTask",
  category: "HTTP",
  lane_id: "anyone",
  parameters: {
    input: {
      test: { $mustache: "value bag {{ bag.value }}" }
    },
    request: {
      verb: "POST",
      url: "https://webhook.site/c2f0b516-1855-4426-a484-58173347ad46",
      headers: {
        "ContentType": "application/json"
      },
    },
  }
}