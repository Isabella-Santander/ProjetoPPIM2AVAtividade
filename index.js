import express from 'express';
import path from 'path';

const porta = 3000;
const host =  '0.0.0.0';

var listaUsuarios = [];

function processarCadastroUsuario(requisicao, reposta){
    const usuario = {
        nome: requisicao.query.nome,
        sobrenome: requisicao.query.sobrenome,
        cidade: requisicao.query.cidade,
        uf: requisicao.query.uf,
        curso: requisicao.query.curso,
        obs: requisicao.query.obs,
    } 
    listaUsuarios.push(usuario);

    let conteudoResposta =`
    <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Alunos Cadastrados</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        </head>
        <body>
            <h1 style="color: green; text-align: center;">Lista de Alunos cadastrados</h1>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Cidade/UF</th>
                        <th>Curso</th>
                        <th>Observação</th>
                    </tr>
                </thead>
                <tbody>
                </tbody> `;

                for (const usuario of listaUsuarios){
                    conteudoResposta += `
                        <tr>
                            <td>${usuario.nome}</td>
                            <td>${usuario.sobrenome}</td>
                            <td>${usuario.cidade}/${usuario.uf}</td>
                            <td>${usuario.curso}</td>
                            <td>${usuario.obs}</td>
                        <tr>
                    `;
                }

                conteudoResposta += `
                            </tbody>
                        </table>
                        <a class="btn btn-danger" href="/" role"button"> Voltar ao menu </a>
                        <a class="btn btn-success" href="/cadastroUsuario.html" role"button"> Continuar cadastrando </a>
                    </body>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script
                    </html>
                `;
                reposta.end(conteudoResposta);
}

const app = express();

//indicando para a aplicação como servir arquivos estáticos localizados na pasta paginas.
app.use(express.static(path.join(process.cwd(),'paginas')));

app.get('/', (requisicao, reposta) =>{
    reposta.end (`
    <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Menu do Sistema</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        </head>
        <body>
        <div class="col-4">
            <h1>Menu</h1>
            <nav class="nav flex-column">
                <a style="font-size: 30px;" class="nav-link" href="/cadastroUsuario.html">Cadastrar Aluno</a>
            </nav>
        </div>    
        </body>
        `);
})

app.get('/cadastrarUsuario' , processarCadastroUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor executando na url https://${host}:${porta}`)
});