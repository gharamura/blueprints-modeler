const return_true = () => {
  return ["fn", ["&", "args"], true];
};

const validate_claim = (claim) => {
  return [
    "fn",
    ["actor_data", "bag"],
    ["eval", ["apply", "or", ["map", ["fn", ["v"], ["=", "v", ["`", claim]]], ["get", "actor_data", ["`", "claims"]]]]],
  ];
};

const check_actor_id = (key) => {
  return [
    'fn',
    ['actor_data', 'bag'],
    [
      '=',
      ['get', 'bag', ['`', key]],
      ['get', 'actor_data', ['`', 'actor_id']]
    ]
  ]
}

module.exports = {
  return_true,
  validate_claim,
  check_actor_id
};
