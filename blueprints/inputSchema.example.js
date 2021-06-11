const { getLanes } = require('./common/lanes')

const startSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    dataInicio: { type: "string", format: "date-time" },
    dataFim: { type: "string", format: "date" },
    nome: { type: "string", minLength: 3 },
    email: { type: "string", format: "email" },
    animal: { type: "string", enum: ["cachorro", "gato"] },
    idade: { type: "number" },
    lista: { type: "array", items: { type: "string" } },
    endereco: {
      type: "object",
      properties: {
        logradouro: { type: "string" },
        numero: { type: "number" }
      }
    },
    contatos: {
      type: "array",
      items: {
        type: "object",
        properties: {
          nome: { type: "string" },
          telefone: { type: "string", pattern: '(\\(?\\d{2}\\)?\\s)?(\\d{4,5}\\-\\d{4})' }
        }
      }
    }
  },
  required: ["dataInicio"]
}

const nodes = [
  {
    id: "1",
    type: "Start",
    name: "Start inputSchema Example",
    parameters: {
      input_schema: startSchema
    },
    next: "2",
    lane_id: "anyone"
  },
  {
    id: "2",
    type: "ScriptTask",
    name: "Create values for bag",
    next: "3",
    lane_id: "anyone",
    parameters: {
      input: {},
      script: {
        package: "",
        function: [
          "fn",
          ["&", "args"],
          {
            example: "bag_example",
            value: "bag_value",
          },
        ],
      },
    }
  },
  {
    id: "3",
    type: "SystemTask",
    category: "SetToBag",
    name: "bag values",
    next: "4",
    lane_id: "anyone",
    parameters: {
      input: {
        example: { "$ref": "result.example" },
        valueResult: { "$ref": "result.value" }
      }
    }
  },
  {
    id: "4",
    type: "Finish",
    name: "Finish inputSchema Example",
    next: null,
    lane_id: "anyone"
  }
]

module.exports = {
  name: 'input_schema_example',
  description: '',
  blueprint_spec: {
    requirements: ["core"],
    prepare: [],
    nodes,
    lanes: getLanes(nodes),
    environment: {},
  }
}