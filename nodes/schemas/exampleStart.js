module.exports = {
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