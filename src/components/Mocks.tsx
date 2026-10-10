// Illustrative product mock-ups (no real client data).
const rows = [
  { t: 'Images missing alternative text', p: '12 pages', s: 'reopened' },
  { t: 'Insufficient colour contrast', p: '4 pages', s: 'open' },
  { t: 'Form fields without labels', p: '2 pages', s: 'resolved' },
  { t: 'Keyboard focus not visible', p: '7 pages', s: 'open' },
]

export function AuditMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-bar">
        <span /> <span /> <span />
        <b>scan #48 · authenticated · mobile</b>
      </div>
      <ul className="mock-rows">
        {rows.map((r) => (
          <li key={r.t}>
            <i className={r.s} />
            <span>{r.t}</span>
            <small>{r.p}</small>
            <em className={r.s}>{r.s}</em>
          </li>
        ))}
      </ul>
      <p className="mock-note">Illustrative: recurring issues reopen across scans, fixed ones close.</p>
    </div>
  )
}

export function CliMock() {
  return (
    <pre className="mock cli" aria-hidden="true">
      <span className="dim">$</span> audit run --url https://example.com --device mobile{'\n'}
      <span className="ok">✓</span> session authenticated{'\n'}
      <span className="ok">✓</span> 24 pages scanned · evidence captured{'\n'}
      <span className="warn">!</span> 3 new issues · 1 reopened · 5 resolved{'\n'}
      <span className="dim">→ report.json · exit 1 (policy: fail on new)</span>
      {'\n'}
      <span className="dim">Illustrative output.</span>
    </pre>
  )
}

export function FixMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-bar">
        <span /> <span /> <span />
        <b>suggestion · grounded in knowledge base</b>
      </div>
      <div className="fix">
        <p className="fix-finding">
          <em>Finding</em> Image has no alternative text
        </p>
        <pre>
          <span className="del">- &lt;img src="team.jpg"&gt;</span>
          {'\n'}
          <span className="add">+ &lt;img src="team.jpg" alt="Support team at work"&gt;</span>
        </pre>
        <div className="fix-meta">
          <i>WCAG 1.1.1</i>
          <i>3 sources</i>
          <i>RAG</i>
        </div>
      </div>
      <p className="mock-note">Illustrative: remediation and code-fix suggestions for audit findings.</p>
    </div>
  )
}
