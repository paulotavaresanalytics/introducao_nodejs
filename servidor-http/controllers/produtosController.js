
const produtos = [
  { id: 1, nome: "Produto A", preco: 50 },
  { id: 2, nome: "Produto B", preco: 30 }
];

// GET - Listar produtos
function getProdutos(req, res) {
  res.statusCode = 200;
  res.end(JSON.stringify(produtos));
}

// POST - Criar produto
function createProduto(req, res) {
  let body = "";

  req.on("data", chunk => {
    body += chunk.toString();
  });

  req.on("end", () => {
    try {
      const dados = JSON.parse(body);

      const novoProduto = {
        id: Date.now(),
        nome: dados.nome,
        preco: dados.preco
      };

      produtos.push(novoProduto);

      res.statusCode = 201;
      res.end(JSON.stringify({
        message: "Produto criado",
        produto: novoProduto
      }));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({
        message: "Erro ao criar produto"
      }));
    }
  });
}

// PUT - Atualizar produto
function updateProduto(req, res) {
  const id = Number(req.url.split("/")[3]);
  let body = "";

  req.on("data", chunk => {
    body += chunk.toString();
  });

  req.on("end", () => {
    try {
      const dados = JSON.parse(body);
      const produto = produtos.find(p => p.id === id);

      if (!produto) {
        res.statusCode = 404;
        res.end(JSON.stringify({
          message: "Produto não encontrado"
        }));
        return;
      }

      produto.nome = dados.nome;
      produto.preco = dados.preco;

      res.statusCode = 200;
      res.end(JSON.stringify({
        message: "Produto atualizado",
        produto: produto
      }));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({
        message: "Erro ao atualizar produto"
      }));
    }
  });
}

// DELETE - Excluir produto
function deleteProduto(req, res) {
  const id = Number(req.url.split("/")[3]);

  const indice = produtos.findIndex(p => p.id === id);

  if (indice === -1) {
    res.statusCode = 404;
    res.end(JSON.stringify({
      message: "Produto não encontrado"
    }));
    return;
  }

  produtos.splice(indice, 1);

  res.statusCode = 200;
  res.end(JSON.stringify({
    message: `Produto com ID ${id} deletado`
  }));
}

module.exports = {
  getProdutos,
  createProduto,
  updateProduto,
  deleteProduto
};
