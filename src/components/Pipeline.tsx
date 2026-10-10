import { pipeline } from '../data'

const W = 120
const GAP = 44
const H = 64

export default function Pipeline() {
  const total = pipeline.length * W + (pipeline.length - 1) * GAP
  const mid = H / 2 + 8

  return (
    <figure className="pipeline" aria-label="Serverless audit pipeline diagram">
      <svg viewBox={`0 0 ${total} ${H + 40}`} role="img">
        <title>Client to API Gateway to Lambda to browser workers to DynamoDB and S3</title>
        {pipeline.map((node, i) => {
          const x = i * (W + GAP)
          const next = i < pipeline.length - 1
          return (
            <g key={node.id}>
              <rect className="node" x={x} y={8} width={W} height={H} rx={10} />
              <text className="node-label" x={x + W / 2} y={mid - 2} textAnchor="middle">
                {node.label}
              </text>
              <text className="node-sub" x={x + W / 2} y={mid + 16} textAnchor="middle">
                {node.sub}
              </text>
              {next && (
                <>
                  <line className="edge" x1={x + W} y1={mid} x2={x + W + GAP} y2={mid} />
                  <circle className="packet" r={3.5} cy={mid} style={{ animationDelay: `${i * 0.5}s` }}>
                    <animate
                      attributeName="cx"
                      from={x + W}
                      to={x + W + GAP}
                      dur="2s"
                      begin={`${i * 0.5}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </>
              )}
            </g>
          )
        })}
      </svg>
      <figcaption>
        The shape of the audit workflow I built: request in, serverless orchestration, headless browsers, durable results.
      </figcaption>
    </figure>
  )
}
