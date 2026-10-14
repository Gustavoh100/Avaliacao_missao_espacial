import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger.js'
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


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


/** 
 *@openapi
 * /missoes/{id}:
 *   get: 
 *     summary: Buscar missao por um missao pelo id 
 *     parameters:
 *       - in: path 
 *         name: id 
 *         required: true 
 *         schema :
 *           type: integer 
 *     responses:
 *       204:
 *         description : buscado com sucesso 
 *       404:
 *         description: Não encontrado
*/
app.get('/missoes/:id', (req, res) => {
    const missao = missoes.find(p => p.id === Number(req.params.id));
    if (!missao) {
        return res.status(404).json({ error: 'missao não encontrada' });
    }
    res.status(200).json(missao);
})



/**
* @openapi
* /missoes:
*   get:
*     summary: Retorna todas as missões ou filtra por query
*     parameters:
*       - in: query
*         name: nome
*         schema: { type: string }
*       - in: query
*         name: agencia
*         schema: { type: string }
*       - in: query
*         name: ano
*         schema: { type: integer }
*     responses:
*       200:
*         description: Lista de missões
*/

app.get('/missoes', (req, res) => {
    const { nome, agencia, ano } = req.query

    if (nome || agencia || ano) {
        const missoesFiltradas = missoes.filter(item => item.nome.toLowerCase().includes(nome.toLowerCase()) || item.agencia.toLowerCase().includes(agencia.toLowerCase()) || item.ano.toLowerCase().includes(ano.toLowerCase()))
        res.status(200).json(missoesFiltradas)
    } else {
        res.status(200).json(missoes)
    }

})



/**
 * @openapi
 * /missoes:
 *   post:
 *     summary: Cria uma nova missão
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - agencia
 *               - ano
 *             properties:
 *               nome:
 *                 type: string
 *               agencia:
 *                 type: string
 *               ano:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Missão criada
 *       '400':
 *         description: Missão não criada
 */
app.post('/missoes', (req, res) => {
    const nome = req?.body?.nome || null
    const agencia = req?.body?.agencia || null
    const ano = req?.body?.ano || null
    if (!agencia) {
        res.status(400).json({ error: ' agencia é obrigatorio ' })
    }
    if (!nome) {
        res.status(400).json({ error: ' nome  é obrigatorio ' })
    }
    if (!ano) {
        res.status(400).json({ error: ' ano é obrigatorio ' })
    }
    const novoMissoes = {
        id: missoes.length + 1, nome: nome, agencia: agencia
    };
    missoes.push(novoMissoes);
    res.status(201).json(novoMissoes)
});

/**
 * @openapi
 * /missoes/{id}:
 *   put:
 *     summary: Atualiza uma missao pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Apollo 11
 *               agencia:
 *                 type: string
 *                 example: NASA
 *               ano:
 *                 type: integer
 *                 example: 1969
 *     responses:
 *       200:
 *         description: Missao atualizada com sucesso
 *       404:
 *         description: Missao não encontrada
 */
app.put('/missoes/:id', (req, res) => {
    const missao = missoes.find(p => p.id === Number(req.params.id));
    if (!missao) {
        return res.status(404).json({ error: "missao não encontrada" });
    };

    if (req?.body.nome && req.body.nome != "") {
        missao.nome = req.body.nome;
    };


    if (req?.body.agencia && req.body.agencia != "") {
        missao.agencia = req.body.agencia;
    };

    if (req?.body.ano && req.body.ano != "") {
        missao.ano = req.body.ano;
    };

    res.status(200).json(missao);
})


/**
 * @openapi
 * /missoes/{id}:
 *   delete:
 *     summary: Exclui um livro pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Missoes excluida com sucesso
 *       404:
 *         description: Missoes não encontrado
 */
app.delete('/missoes/:id', (req, res) => {
    const id = Number(req.params.id);
    const indice = missoes.findIndex(item => item.id === id)

    if (indice === -1) {
        return res.status(404).json({ error: "Missao não encontrada" })
    }

    missoes.splice(indice, 1);

    res.status(204).send('')

});





export default app