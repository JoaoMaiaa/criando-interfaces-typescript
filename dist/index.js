/**
 * [*] 1 - Uma função que recebe um nome de usuário do Github e realiza um requisição GET para obter os dados dele através da API pública do github
 * [*] 2 - Uma função que mostra as informações salvas de um determinado usuário e alguns de seus repositórios públicos
 * [*] 3 - Uma função que mostra todos os usuários salvos
 * [*] 4 - Uma função que calcula a soma de repositórios dos usários salvos na lista e mostre o resultado
 * [/*] 5 - Uma função que mostre o top cinco de usuários com maior número de repositórios públicos (nome e quantidade)
 *
 * funcao 1
 *
 * url: api.github.com/users/nome
 * id: string
 * login: string
 * name: string
 * bio: string
 * public_repos: number
 * repos_url: string
 *
 * se não existir retorna um objeto {message:"not found"}
 *
 * todo usuário deve ser salvo em uma lista
 *
 * funcao 2
 *
 * a requisicao deve ser feita atraves da url salva na propriedade repos_url
 * o retorno de repositorios será um array
 *
 * de todos os dados retornados dos respositorios, exibir apenas os seguintes:
 * name: string
 * description: string
 * fork: boolean
 * stargarzers_count: number
 */
// INCOMPLETO
let allUsers = [];
let repos = [];
function menu() {
    let option = Number(prompt('Menu principal\n1 - Salvar um usuário\n2 - Mostrar informações salvas de um usuário\n3 - Mostrar todos os usuários salvos\n4 - Soma de repositórios\n5 - Repositorios e usuários\n6 - Sair'));
    if (option == 6) {
        alert('Saindo do programa em 3, 2, 1...');
    }
    return option;
}
let result = menu();
while (result != 6) {
    switch (result) {
        case 1:
            let resultGet = prompt('Qual usuário você deseja salvar as informações?');
            getUsers(resultGet);
            break;
        case 2:
            let listUser = prompt('De qual usuário você quer ler os repositórios?');
            allUsers.map(user => {
                if (listUser == user.name) {
                    listRepos(user.repos_url);
                }
                else {
                    alert(`Este usuário não foi salvo`);
                }
            });
            break;
        case 3:
            list();
            break;
        case 4:
            sumRepos();
            break;
        case 5:
            topFiveRepos();
            break;
    }
    result = menu();
}
class SaveUser {
    id;
    login;
    name;
    bio;
    public_repos;
    repos_url;
    constructor(id, login, name, bio, public_repos, repos_url) {
        this.id = id,
            this.login = login,
            this.name = name,
            this.bio = bio,
            this.public_repos = public_repos,
            this.repos_url = repos_url;
    }
}
class Repos {
    name;
    description;
    fork;
    stargarzers_count;
    constructor(name, description, fork, stargarzers_count) {
        this.name = name,
            this.description = description,
            this.fork = fork,
            this.stargarzers_count = stargarzers_count;
    }
}
async function getUsers(name) {
    let response = await fetch(`https://api.github.com/users/${name}`);
    let data = await response.json();
    let user = new SaveUser(data.id, data.login, data.name, data.bio, data.public_repos, data.repos_url);
    allUsers.push(user);
    return data;
}
// async function getRepos(name:string){
//     let response = await fetch(`https://api.github.com/users/${name}/repos`)
//     let data = await response.json()
//     return data
// }
async function listRepos(url) {
    let response = await fetch(`${url}`);
    let data = await response.json();
    data.map(element => {
        let reposResult = new Repos(element.name, element.description, element.fork, element.stargarzers_count);
        repos.push(reposResult);
    });
    repos.map(repo => {
        alert(`
        ${repo.name}
        ${repo.description}
        ${repo.fork}
        ${repo.stargarzers_count}
        `);
    });
}
function sumRepos() {
    alert(`A soma de repositórios salvos é de: ${repos.length}`);
}
function topFiveRepos() {
    let users = [];
    allUsers.map(user => {
        let nRepos = user.public_repos;
        let name = user.name;
        users.push({ name: name, repos: nRepos });
    });
    users.map(el => {
        alert(`
            Nome: ${el.name}
            Repositórios: ${el.repos}
        `);
    });
}
function list() {
    if (allUsers) {
        allUsers.map(user => {
            let text = `
                id: ${user.id}
                login: ${user.login}
                name: ${user.name}
                bio: ${user.bio}
                public_repos: ${user.public_repos}
                repos_url: ${user.repos_url}
            `;
            alert(`${text}`);
            // console.log(user)
        });
    }
    else {
        alert('Não existe usuários');
    }
}
