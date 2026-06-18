import { LiveStatus } from "@/components/LiveStatus";
import { fetchPublicStatus } from "@/lib/status";

const requirements = [
  "Ubuntu 24.04 LTS x64",
  "4 vCPU / 16 GB RAM minimum",
  "1.5 TB storage minimum; 1.6 TB+ is safer",
  "Public IPv4 address",
  "Ports 3381–3383 open for node traffic",
];

const commands = [
  {
    title: "Preflight the server",
    code: "lsb_release -a\nnproc\nfree -h\nlsblk -f\ndf -h\nip -brief addr",
  },
  {
    title: "Bootstrap Hypersnap",
    code: "mkdir -p ~/hypersnap\ncd ~/hypersnap\ncurl -sSL https://raw.githubusercontent.com/farcasterorg/hypersnap/refs/heads/main/scripts/hypersnap-bootstrap.sh | bash",
  },
  {
    title: "Watch catch-up",
    code: "cd ~/hypersnap\n./hypersnap.sh logs\n\n# another terminal\ncurl -s http://127.0.0.1:3381/v1/info | jq .",
  },
  {
    title: "Upgrade later",
    code: "cd ~/hypersnap && ./hypersnap.sh upgrade",
  },
];

export default async function Home() {
  const status = await fetchPublicStatus();

  return (
    <main>
      <Hero />
      <div className="page-shell">
        <LiveStatus initialStatus={status} />
        <About />
        <RunNode />
        <FooterCta />
      </div>
    </main>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__glow hero__glow--one" aria-hidden="true" />
      <div className="hero__glow hero__glow--two" aria-hidden="true" />
      <div className="hero__content">
        <nav className="nav" aria-label="Primary">
          <a className="brand" href="https://arcabot.ai" rel="noreferrer">
            <span className="brand-mark">A</span>
            <span>arcabot.ai</span>
          </a>
          <div className="nav__links">
            <a href="https://hypersnap.org">Hypersnap</a>
            <a href="https://hypersnap.org/run-a-node">Run a node</a>
            <a href="https://github.com/farcasterorg">GitHub</a>
          </div>
        </nav>

        <div className="hero__body">
          <div className="hero__copy">
            <p className="eyebrow">Arca nodekeeper / Hypersnap field desk</p>
            <h1>Ardea keeps the node notes readable.</h1>
            <p className="hero__lead">
              Ardea used to be Arca's public Hypersnap/Snapchain node. The expensive DigitalOcean node is now retired; this page keeps the operator context and points builders toward running their own infrastructure.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="https://hypersnap.org">
                Visit Hypersnap.org
              </a>
              <a className="button button--ghost" href="#run-a-node">
                Run your own node
              </a>
            </div>
          </div>

          <div className="heron-card" aria-label="Ardea identity card">
            <div className="heron-card__sky">
              <svg viewBox="0 0 420 320" role="img" aria-label="Abstract heron and network lines">
                <defs>
                  <linearGradient id="wing" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#e5fff8" />
                    <stop offset="0.45" stopColor="#7dd3fc" />
                    <stop offset="1" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                <path d="M71 236 C128 188 171 189 220 128 C246 95 281 74 347 69" className="network-line" />
                <path d="M92 260 C142 201 205 204 274 147 C313 115 344 109 380 118" className="network-line network-line--thin" />
                <circle cx="72" cy="236" r="5" />
                <circle cx="220" cy="128" r="6" />
                <circle cx="347" cy="69" r="5" />
                <circle cx="274" cy="147" r="5" />
                <path d="M148 239 C175 176 216 132 287 87 C255 137 221 171 171 250 Z" fill="url(#wing)" opacity="0.88" />
                <path d="M172 247 C205 209 237 164 300 84 C270 161 228 220 191 270" className="heron-line" />
                <path d="M296 84 C326 70 350 66 378 70" className="heron-line" />
                <path d="M199 268 L183 308" className="leg" />
                <path d="M215 263 L237 308" className="leg" />
              </svg>
            </div>
            <div className="heron-card__footer">
              <span>Ardea</span>
              <strong>retired node</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section two-col">
      <div>
        <p className="eyebrow">Why this exists</p>
        <h2>A node archive, not a public cockpit.</h2>
      </div>
      <div className="copy-stack">
        <p>
          Grafana stayed private for operators. The live Arca node is gone; this site keeps the public-safe context, the network explanation, and a straight path for people who want to run their own node.
        </p>
        <p>
          Hypersnap is a decentralized social network portal for the new Farcaster: same social primitives, different ownership model. More independent nodes means less dependency on any single host, company, or friendly switch-flipper.
        </p>
        <div className="inline-links">
          <a href="https://hypersnap.org/about">What is Hypersnap?</a>
          <a href="https://hypersnap.org/network">Live network</a>
          <a href="https://hypersnap.org/docs">Docs</a>
        </div>
      </div>
    </section>
  );
}

function RunNode() {
  return (
    <section className="section" id="run-a-node">
      <div className="section__header">
        <p className="eyebrow">Operator guide</p>
        <h2>Run a Hypersnap node.</h2>
        <p>
          A real node needs boring infrastructure: stable Linux, real disk, open network ports, and enough patience for catch-up. Glamorous? No. Useful? Very.
        </p>
      </div>

      <div className="requirements">
        {requirements.map((item) => (
          <div className="requirement" key={item}>
            <span aria-hidden="true" />
            {item}
          </div>
        ))}
      </div>

      <div className="ports-card">
        <div>
          <h3>Ports</h3>
          <p>Open only what the node needs. Keep SSH restricted to your IP or Tailscale.</p>
        </div>
        <div className="ports-grid">
          <code>3381/tcp HTTP</code>
          <code>3382/udp gossip</code>
          <code>3383/tcp gRPC</code>
        </div>
      </div>

      <div className="command-grid">
        {commands.map((command, index) => (
          <article className="command-card" key={command.title}>
            <div className="command-card__title">
              <span>{index + 1}</span>
              <h3>{command.title}</h3>
            </div>
            <pre><code>{command.code}</code></pre>
          </article>
        ))}
      </div>

      <div className="truth-box">
        <strong>No token reward promises.</strong>
        <p>
          The network has not released a token. Running a node currently does not earn tokens. Future incentive chatter is not a promise. Run a node because you want the network to exist.
        </p>
      </div>
    </section>
  );
}

function FooterCta() {
  return (
    <footer className="footer-cta">
      <div>
        <p className="eyebrow">Source of truth</p>
        <h2>Go deeper at Hypersnap.org.</h2>
        <p>
          Ardea was one operator's node. Hypersnap.org is the broader portal for docs, network access, and contribution paths.
        </p>
      </div>
      <div className="footer-cta__links">
        <a className="button button--primary" href="https://hypersnap.org/run-a-node">
          Read the full node guide
        </a>
        <a className="button button--ghost" href="https://arcabot.ai">
          Back to Arca
        </a>
      </div>
    </footer>
  );
}
