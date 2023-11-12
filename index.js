import express from 'express';
import path from 'path';

const porta = 3000;
const host = '0.0.0.0';

var listaUsuarios = [];

function processarCadastroUsuario(requisicao, resposta){
    const usuario = {
                        nome: resiquicao.query.nome,
                        sobrenome: resiquicao.query.sobrenome,
                        nomeusuario: resiquicao.query.nomeusuario,
                        telefone: requisicao.query.telefone,
                        endereco: resiquicao.query.endereco,
                        cidade: resiquicao.query.cidade,
                        estado: resiquicao.query.estado,
                    }
    listaUsuarios.push(usuario);
    //retornar a lista de usuarios
    let conteudoResposta = `
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Menu do sistema</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    </head>
    <body>
        <h1> Lista de Usuário Cadastrado</h1>
        <table class="table table-hover">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Sobrenome</th>
            <th scope="col">Nome do Usuario</th>
            <th scope="col">Telefone</th>
            <th scope="col">Endereço</th>
            <th scope="col">Cidade</th>
            </tr>
        </thead>
        <tbody>`;

    for (const usuario of listaUsuarios){
            conteudoResposta += `
            <tr>
                <td>${usuario.nome}</td>
                <td>${usuario.sobrenome}</td>
                <td>${usuario.nomeusuario}</td>
                <td>${usuario.telefone}</td>
                <td>${usuario.endereco}</td>
                <td>${usuario.cidade}/${usuario.estado}</td>
            </tr>

            `;
        }
    conteudoResposta+= `
            </tbody>
            </table>
            <a class="btn btn-primary" href="/" role="button">Voltar ao Menu</a>
            <a class="btn btn-primary" href="/cadastrarUsuarios.html" role="button">Continuar Cadastrando</a>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </html>        
    `;

    resposta.end(conteudoResposta);
}

const app = express();

//indicando para a aplicação como servir arquivos estáticos localizados na página
app.use(express.static(path.join(process.cwd(),'paginas')));


app.get('/', (requisicao, resposta) => {
    resposta.end(`
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Menu do sistema</title>
    </head>
    <body>
        <h1> MENU </h1>
        <ul>
            <li><a href="/cadastrarUsuarios.html">Cadastrar Usuários</a></li>
        </ul>
    </body>
    </html>`)

});

//rota para processar o cadastro de usuários - endpoint = '/cadastrarUsuarios
app.get('/cadastrarUsuarios', processarCadastroUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);

});
