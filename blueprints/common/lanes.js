const lisp = require('./lisp')

const lanes = [
  {
    id: "anyone",
    name: "always true",
    rule: lisp.return_true()
  },
  {
    id: "authenticated",
    name: "checks if actor data has claim authenticated",
    rule: lisp.validate_claim('authenticated')
  },
  {
    id: "actorId",
    name: "restricted",
    rule: ["fn", ["actor_data", "bag"],["=",
      ["get", ["get", "bag", ["`", "is_authorized"]],["`","id"]],
      ["get", "actor_data",["`","id"]]
    ]
    ]
  },
  {
    id: "simpleton",
    name: "simpleton",
    rule: lisp.validate_claim("simpleton"),
  },
  {
    id: "admin",
    name: "admin",
    rule: lisp.validate_claim("admin"),
  },
]

const getLanes = (nodes) => {
  const usedLanes = nodes.map((node) => (node.lane_id));
  const uniqueLanes = [...new Set(usedLanes)];

  return lanes.filter((lane) => (uniqueLanes.includes(lane.id)))
}

module.exports = {
  lanes,
  getLanes
}