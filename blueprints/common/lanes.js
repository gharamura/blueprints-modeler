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
  } 
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