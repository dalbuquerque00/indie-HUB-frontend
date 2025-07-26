import './Footer.css';
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <span>© {new Date().getFullYear()} indieHub. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
export default Footer;