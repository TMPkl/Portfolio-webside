export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          © {new Date().getFullYear()} Karol Leszyński. All rights reserved.
        </div>
        <div className="footer-links">
          <a
            href="https://www.instagram.com/kl.eszczyk/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <img src="/icons/INS.svg" alt="Instagram" style={{ width: 28, height: 28 }} />
          </a>
          <span className="footer-sep">|</span>
          <a
            href="https://www.linkedin.com/in/karol-leszy%C5%84ski-1310582a9/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <img src="/icons/LIN.svg" alt="LinkedIn" style={{ width: 28, height: 28 }} />
          </a>
          <span className="footer-sep">|</span>
          <a
            href="https://github.com/TMPkl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <img src="/icons/GH.svg" alt="GitHub" style={{ width: 28, height: 28 }} />
          </a>
        </div>
      </div>
    </footer>
  );
}