
# Url Shortener App

Esse projeto é um encurtador de url que utiliza json-server para simular uma api REST. Além disso, é possível criar um usuário e se logar, para verificar as urls geradas pelo seu user e gerencia-las.

## Como rodar o projeto - Front-end
- Instalar dependências
```
npm install
```

### Compila o projeto e o executa com hot-reload.
- Rodar o projeto
```
npm run serve
```
## Como rodar o projeto - "Fake Back-end"
Uma REST API fake que utiliza json-server + autenticação JWT. 

### Entrar na pasta da api
```
cd ./api 
```

### Rodar o comando abaixo para se registrar/logar na plataforma
```
npm run auth-start
```
### Rodar o comando abaixo para startar o servidor
```
npm run start
```
## Como funciona o login/cadastro?

Você pode se registrar/logar enviando um POST request para

```
POST http://localhost:8000/auth/login
POST http://localhost:8000/auth/register
```
com os dados:

```
{
  "email": "ygcorrea@email.com",
  "password":"ygcorrea"
}
```
