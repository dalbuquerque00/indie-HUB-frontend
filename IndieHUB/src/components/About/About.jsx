import './About.css';
import githubLogo from "../../assets/images/github-logo.png";

function About() {
  return (
    <main className="about-main">
      <h2>Sobre o indieHub</h2>
      <section>
        <h3>O Projeto</h3>
        <p>
          <strong>indieHub</strong> é uma plataforma desenvolvida para explorar, avaliar, favoritar jogos indie! O objetivo é conectar fãs e criadores, ajudando a divulgar a cena independente de games e tornar mais fácil descobrir pérolas do universo indie.
        </p>
      </section>

      <section>
        <h3>Sobre o Desenvolvedor</h3>
        <p>
          Olá! Meu nome é <strong>Danilo Albuquerque</strong>. Sou apaixonado por tecnologia, games e comunidades criativas. Atuo como desenvolvedor e analista de sistemas, e criei este projeto como parte de um desafio full-stack para expandir minhas habilidades em React, APIs e boas práticas de front-end.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0.5em 0 0 0' }}>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.5em'}}>
            <a href="https://github.com/dalbuquerque00" target="_blank" rel="noopener noreferrer" style={{display: 'inline-flex', alignItems: 'center', gap: '0.2em'}}>
              <img src={githubLogo} alt="GitHub" style={{width: '20px', height: '20px', marginRight: '0.2em'}} />
              github.com/dalbuquerque00
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h3>Tecnologias Utilizadas</h3>
        <ul>
          <li>React.js (Vite)</li>
          <li>React Router DOM</li>
          <li>CSS modular</li>
          <li>Consumo de APIs públicas (RAWG.io)</li>
          <li>Organização por componentes</li>
        </ul>
      </section>

      <section>
        <h3>Funcionalidades</h3>
        <ul>
          <li>Catálogo com filtro e busca de jogos indie</li>
          <li>Favoritar e avaliar jogos</li>
          <li>Perfil do usuário</li>
          <li>Layout responsivo e acessível</li>
        </ul>
      </section>

      <section>
        <h3>Contato</h3>
        <p>
          Ficou com dúvida, sugestão ou quer colaborar? Fique à vontade para me chamar pelo <a href="mailto:danilo@email.com">email</a> ou pelo{' '}
          <a href="https://github.com/dalbuquerque00" target="_blank" rel="noopener noreferrer" style={{display: 'inline-flex', alignItems: 'center', gap: '0.2em'}}>
            <img src={githubLogo} alt="GitHub" style={{width: '18px', height: '18px', marginRight: '0.22em'}} />
            GitHub
          </a>!
        </p>
      </section>
    </main>
  );
}

export default About;