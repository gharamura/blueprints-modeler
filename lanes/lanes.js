const lisp = require("./lispRules");

const lanes = [
  {
    id: "anonymous",
    name: "someone without claims",
    rule: { $js: "({ actor_data }) => (!actor_data.claims || actor_data.claims.length === 0 ? true : false)" },
  },
  {
    id: "anyone",
    name: "always true",
    rule: { $js: "() => true" },
  },
  {
    id: "authenticated",
    name: "checks if actor data has claim authenticated",
    rule: lisp.validate_claim("authenticated"),
  },
  {
    id: "actorId",
    name: "restricted to an actor id",
    rule: lisp.check_actor_id('actorId'),
  },
  {
    id: "eventId",
    name: "restricted to eventId",
    rule: { $js: "({ actor_data, bag }) => (actor_data.event_id === bag.actor.event_id ? true : false)" },
  },
  {
    id: "actorIdJs",
    name: "restricted to actorId using js notation",
    rule: { $js: "({ actor_data, bag }) => (actor_data.actor_id === bag.actorId ? true : false)" },
  },
  {
    id: "adminJs",
    name: "admin claim",
    rule: { $js: "({ actor_data }) => (actor_data?.claims?.includes('admin') ? true : false)" },
  },
];

const getLanes = (nodes) => {
  const usedLanes = nodes.map((node) => node.lane_id);
  const uniqueLanes = [...new Set(usedLanes)];

  return lanes.filter((lane) => uniqueLanes.includes(lane.id));
};

module.exports = {
  lanes,
  getLanes,
};