# IndieHub 🎮

IndieHub é uma plataforma para descobrir, explorar e favoritar jogos indie, conectando jogadores apaixonados por novidades do mundo dos games independentes. O site integra a API pública RAWG para exibir dados atualizados dos jogos e simula funcionalidades de login, cadastro e gerenciamento de perfil de usuário.

---

## 🚀 Funcionalidades

- **Catálogo de Jogos:** Visualize dezenas de jogos indie, filtrados diretamente da API RAWG.
- **Detalhes do Jogo:** Clique em qualquer jogo para ver informações detalhadas, incluindo plataformas disponíveis, nota e descrição.
- **Favoritos:** Adicione jogos aos favoritos (armazenados localmente) e veja sua coleção no perfil.
- **Autenticação Simulada:** Crie uma conta, faça login/logout e personalize seu perfil (simulação via localStorage).
- **Perfil do Usuário:** Edite informações pessoais e veja jogos favoritos.
- **Interface Responsiva:** Layout adaptado para desktop, tablets e smartphones.
- **Janelas Modais:** Login e cadastro são realizados via modal para UX moderna.
- **Design inspirado em RAWG:** Cards de jogos interativos com efeito hover.

---

## 🧑‍💻 Tecnologias e Ferramentas

- **React 18 + Vite**
- **CSS Flexbox & Grid (responsivo)**
- **API [RAWG Video Games Database](https://rawg.io/apidocs)**
- **React Router DOM**
- **React Icons**
- **LocalStorage**
- **SVG e fontes customizadas**

---

## 📂 Estrutura de Pastas

```
src/
  components/
    App/
    Catalog/
    GameCard/
    GameDetails/
    Profile/
    Login/
    Register/
    About/
    Navigation/
    ...etc
  utils/
    rawgApi.js
  assets/
    images/
    icons/
  vendor/
    fonts/
    normalize.css
  data/
    (mockGames.js — opcional)
```

---

## 🔧 Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seuusuario/indie-HUB-frontend.git
   cd indie-HUB-frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure sua chave de API:**
   - Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
     ```
     VITE_API_KEY=sua_api_key_rawg
     VITE_API_URL=https://api.rawg.io/api
     ```
   - [Obtenha sua chave aqui](https://rawg.io/apidocs).

4. **Execute o projeto localmente:**
   ```bash
   npm run dev
   ```

5. **Acesse:**  
   [http://localhost:5173](http://localhost:5173)

---

## 📝 Requisitos e Observações

- Projeto desenvolvido para fins acadêmicos (TripleTen/Practicum).
- Não utiliza bibliotecas de UI externas além de React Icons.
- Login e cadastro são simulados (ainda não há backend real).
- O botão “favoritar” e funções de perfil funcionam via localStorage.
- O site exibe apenas jogos indie, respeitando o propósito do projeto.
- Imagens, ícones e fontes foram otimizados.
- O site é totalmente responsivo.
- A branch principal para entrega é `stage-react-api`.

---

## 💡 Futuras Melhorias

- Implementar backend real para persistência de usuários e favoritos.
- Adicionar filtros e busca no catálogo.
- Aumentar capacidade de requisição da lista de jogos
- Tradução automática das descrições dos jogos.
- Dark mode/light mode.
- Integração com comunidades de jogos indie.

---

## 🙋‍♂️ Sobre o Autor

- Nome: Danilo Morais
- Projeto desenvolvido no curso TripleTen

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---