// A reusable SVG "metro line" with curved segments and stations.
// Now deterministic: points come from props or stations.x/y; otherwise a built-in default is used.

export default function MetroLine({
  stations = [],
  margin = { top: 60, right: 80, bottom: 40, left: 80 },
  stationColor = "#16a34a",
  stationSize = 8,
  strokeWidth = 6,
  // Provide your own coordinates. If omitted, we use stations' x/y or a default path.
  points: pointsProp = null,
  // Fixed sizing (non-responsive) by default
  width = 1000,
  height = 500,
  responsive = true,
  // If true, compute viewBox from point bounds (recommended for dynamic height)
  fitToPoints = true,
  // Allow passing custom CSS class for theming (e.g., to set CSS variables)
  containerClassName = "",
}) {
  // Default serpentine-like shape (logical coordinates)
  const DEFAULT_POINTS = [
    { x: 40, y: 40 },
    { x: 200, y: 40 },
    { x: 300, y: 160 },
    { x: 400, y: 280 },
    { x: 500, y: 400 },
    { x: 660, y: 400 },




  ];

  // Choose raw points source
  const stationsHaveXY = stations.length > 0 && stations.every(s => typeof s.x === 'number' && typeof s.y === 'number');
  const rawPoints = Array.isArray(pointsProp) && pointsProp.length > 0
    ? pointsProp
    : (stationsHaveXY ? stations.map(s => ({ x: s.x, y: s.y })) : DEFAULT_POINTS);

  // Compute bounds and fit to viewBox with margins
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of rawPoints) {
    if (typeof p?.x !== 'number' || typeof p?.y !== 'number') continue;
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }
  if (!isFinite(minX) || !isFinite(minY) || !isFinite(maxX) || !isFinite(maxY)) {
    return null;
  }

  const widthSpan = Math.max(1, maxX - minX);
  const heightSpan = Math.max(1, maxY - minY);
  const viewBoxWidth = fitToPoints
    ? (margin.left + margin.right + widthSpan)
    : width;
  const viewBoxHeight = fitToPoints
    ? (margin.top + margin.bottom + heightSpan)
    : height;
  const points = rawPoints.map(p => ({ x: (p.x - minX) + margin.left, y: (p.y - minY) + margin.top }));

  // Build a straight polyline path: M x0 y0 L x1 y1 L ...
  const toStraightPath = (pts) => {
    if (!pts || pts.length === 0) return "";
    if (pts.length === 1) {
      const p = pts[0];
      return `M ${p.x} ${p.y}`;
    }
    const head = `M ${pts[0].x} ${pts[0].y}`;
    const tail = pts.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ");
    return `${head} ${tail}`;
  };

  const pathD = toStraightPath(points);

  // Helper: place label offsets alternating sides to reduce overlap
  const labelOffset = (idx) => {
    const side = idx % 2 === 0 ? 1 : -1;
    return { dx: 14 * side, dy: idx % 4 === 0 ? -16 : 22 };
  };

  return (
    <div className={`metro-container ${containerClassName}`.trim()}>
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="metro-svg"
        {...(!responsive ? { width, height } : {})}
        role="img"
        aria-label="Mapa projektów w stylu metra"
      >
        <defs>
          <linearGradient id="metroLineGradient" className="metro-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" />
            <stop offset="100%" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* The main metro line path */}
        <path
          d={pathD}
          className="metro-line"
          strokeWidth={strokeWidth}
        />

        {/* Stations */}
        <g className="metro-stations">
          {points.map((pt, i) => {
            const station = stations[i] || { name: `Stacja ${i + 1}`, description: "", id: `s${i}` };
            const { dx, dy } = labelOffset(i);
            const dataId = station.id || `s${i}`;
            return (
              <g
                key={dataId}
                className="metro-station-group"
                data-station-id={dataId}
                data-station-index={i}
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={stationSize}
                  className="metro-station"
                >
                  <title>{station.name + (station.description ? ` — ${station.description}` : "")}</title>
                </circle>
                <text
                  x={pt.x + dx}
                  y={pt.y + dy}
                  className="metro-label"
                  textAnchor={dx > 0 ? "start" : "end"}
                  alignmentBaseline="middle"
                >
                  {station.name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
