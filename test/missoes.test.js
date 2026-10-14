import request from "supertest";

import app from "../app.js";


test("GET /missoes  filtra missoes pelo nome", async () => {
  const resposta = await request(app).get("/missoes")
    .send("Apollo 11");
});

test("POST/missoes cria uma nova missao ", async () => {
  const resposta = await request(app).post("/missoes")
    .send({ nome: "Apollo 11", agencia: "NASA", ano: 1969 });

  expect(resposta.status).toBe(201);
  expect(resposta.body.nome).toBe("Apollo 11");
});
test("PUT/missoes/:id altera uma missao", async () => {
  const resposta = await request(app).put("/missoes/1").send({ nome: "Apollo 11", agencia: "NASA", ano: 1969 })
  expect(resposta.status).toBe(200)
  expect(resposta.body.nome).toBe("Apollo 11")
});
test("DELETE /missoes/:id remove o missao encontrado", async () => {
  const resposta = await request(app).delete("/missoes/1");

  expect(resposta.status).toBe(204);
  expect(resposta.body).toEqual({});
});

test("GET /missoes retorna todas as missoes ", async () => {

const missoes = [
    {
        id: 1,
        nome: "Apollo 11",
        ano: 1969,
        agencia: "NASA"
    },
    {
        id: 2,
        nome: "Voyager",
        ano: 1977,
        agencia: "NASA"
    },
]
  const resposta = await request(app).get("/missoes").send()
  expect(resposta.status).toBe(200)
  expect(Array.isArray(resposta.body)).toBe(true);
  expect(resposta.body.length).toBeGreaterThan(0);
})