// A reusable SVG "metro line" with curved segments and stations.
// Now deterministic: points come from props or stations' x/y; otherwise a built-in default is used.

import { useRef, useState, useCallback } from "react";

export default function MetroLine({
  stations = [],
  margin,
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
  showCursorHalo = true,
  haloRadius = 40,
  haloDistance = 90,
  onStationHover,
  onStationLeave,
  onStationClick,
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

  const DEFAULT_MARGIN = { top: 60, right: "auto", bottom: 40, left: "auto" };
  const mergedMargin = { ...DEFAULT_MARGIN, ...(margin || {}) };

  // Choose raw points source
  const stationsHaveXY =
    stations.length > 0 &&
    stations.every((s) => typeof s.x === "number" && typeof s.y === "number");
  const rawPoints = Array.isArray(pointsProp) && pointsProp.length > 0
    ? pointsProp
    : stationsHaveXY
    ? stations.map((s) => ({ x: s.x, y: s.y }))
    : DEFAULT_POINTS;

  // Compute bounds and fit to viewBox with margins
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const p of rawPoints) {
    if (typeof p?.x !== "number" || typeof p?.y !== "number") continue;
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
  const sideSpaceFraction = 0.075;
  const autoSideMargin = fitToPoints
    ? (widthSpan * sideSpaceFraction) / (1 - 2 * sideSpaceFraction)
    : 0;

  const resolvedTopMargin =
    typeof mergedMargin.top === "number" ? mergedMargin.top : DEFAULT_MARGIN.top;
  const resolvedBottomMargin =
    typeof mergedMargin.bottom === "number"
      ? mergedMargin.bottom
      : DEFAULT_MARGIN.bottom;
  const resolvedLeftMargin =
    typeof mergedMargin.left === "number" ? mergedMargin.left : autoSideMargin;
  const resolvedRightMargin =
    typeof mergedMargin.right === "number" ? mergedMargin.right : autoSideMargin;

  const extraHaloSpace = showCursorHalo ? Math.max(haloRadius, haloDistance) : 0;
  const effectiveMargin = {
    top: resolvedTopMargin,
    right: resolvedRightMargin,
    bottom: resolvedBottomMargin + extraHaloSpace,
    left: resolvedLeftMargin,
  };

  const viewBoxWidth = fitToPoints
    ? effectiveMargin.left + effectiveMargin.right + widthSpan
    : width;
  const viewBoxHeight = fitToPoints
    ? effectiveMargin.top + effectiveMargin.bottom + heightSpan
    : height;
  const points = rawPoints.map((p) => ({
    x: (p.x - minX) + effectiveMargin.left,
    y: (p.y - minY) + effectiveMargin.top,
  }));

  // Build a straight polyline path: M x0 y0 L x1 y1 L ...
  const toStraightPath = (pts) => {
    if (!pts || pts.length === 0) return "";
    if (pts.length === 1) {
      const p = pts[0];
      return `M ${p.x} ${p.y}`;
    }
    const head = `M ${pts[0].x} ${pts[0].y}`;
    const tail = pts.slice(1).map((p) => `L ${p.x} ${p.y}`).join(" ");
    return `${head} ${tail}`;
  };

  const pathD = toStraightPath(points);

  // Helper: place label offsets alternating sides to reduce overlap
  const labelOffset = () => ({ dx: 0, dy: stationSize + 18 });

  // SVG ref + cursor state
  const svgRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false, brightness: 0 });

  // Distance from point P to segment AB
  const distPointToSeg = (px, py, ax, ay, bx, by) => {
    const ABx = bx - ax, ABy = by - ay;
    const APx = px - ax, APy = py - ay;
    const ab2 = ABx * ABx + ABy * ABy || 1e-6;
    let t = (APx * ABx + APy * ABy) / ab2;
    if (t < 0) t = 0;
    else if (t > 1) t = 1;
    const cx = ax + t * ABx, cy = ay + t * ABy;
    const dx = px - cx, dy = py - cy;
    return Math.hypot(dx, dy);
  };

  const minDistToPolyline = useCallback((px, py, pts) => {
    if (!pts || pts.length < 2) return Infinity;
    let minD = Infinity;
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      const d = distPointToSeg(px, py, a.x, a.y, b.x, b.y);
      if (d < minD) minD = d;
    }
    return minD;
  }, []);

  const toSvgCoords = useCallback((evt) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const pt = svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    const inv = svg.getScreenCTM() && svg.getScreenCTM().inverse();
    if (!inv) return null;
    const loc = pt.matrixTransform(inv);
    return { x: loc.x, y: loc.y };
  }, []);

  const handleMouseMove = useCallback((e) => {
    const p = toSvgCoords(e);
    if (!p) return;
    const d = minDistToPolyline(p.x, p.y, points);
    const isActive = d <= haloDistance;
    // Calculate brightness based on distance - closer = brighter
    const brightness = isActive ? Math.max(0.2, 1 - (d / haloDistance)) : 0;
    setCursor({ x: p.x, y: p.y, active: isActive, brightness });
  }, [minDistToPolyline, points, haloDistance, toSvgCoords]);

  const handleMouseLeave = useCallback(() => {
    setCursor((c) => ({ ...c, active: false, brightness: 0 }));
  }, []);

  // Helper: SVG point -> client (viewport) coords
  const svgPointToClient = useCallback((x, y) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const pt = svg.createSVGPoint();
    pt.x = x; pt.y = y;
    const m = svg.getScreenCTM?.();
    if (!m) return null;
    const c = pt.matrixTransform(m);
    return { clientX: c.x, clientY: c.y };
  }, []);

  const emitStationEvt = useCallback((type, payload) => {
    if (type === "hover" && typeof onStationHover === "function") onStationHover(payload);
    if (type === "leave" && typeof onStationLeave === "function") onStationLeave(payload);
    if (type === "click" && typeof onStationClick === "function") onStationClick(payload);
  }, [onStationHover, onStationLeave, onStationClick]);

  return (
    <div className={`metro-container ${containerClassName}`.trim()}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="metro-svg"
        {...(!responsive ? { width, height } : {})}
        role="img"
        aria-label="Mapa projektów w stylu metra"
        onMouseMove={showCursorHalo ? handleMouseMove : undefined}
        onMouseLeave={showCursorHalo ? handleMouseLeave : undefined}
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

        {/* Halo layer (rendered under the line) */}
        {showCursorHalo && cursor.active && (
          <g className="metro-cursor-halo-layer" pointerEvents="none">
            <circle
              className="metro-cursor-halo"
              cx={cursor.x}
              cy={cursor.y}
              r={haloRadius}
              style={{ opacity: cursor.brightness }}
            />
          </g>
        )}

        {/* The main metro line path */}
        <path
          d={pathD}
          className="metro-line"
          strokeWidth={strokeWidth}
        />

        {/* Stations */}
        <g className="metro-stations">
          {points.map((pt, i) => {
            const station = stations[i];
            if (!station) return null;
            const { dx, dy } = labelOffset();
            const dataId = station.id || `s${i}`;

            // Prepare payload for events
            const mkPayload = () => {
              const client = svgPointToClient(pt.x, pt.y) || {};
              return {
                station,
                index: i,
                svgX: pt.x,
                svgY: pt.y,
                clientX: client.clientX,
                clientY: client.clientY,
                labelOffset: { dx, dy },
              };
            };

            return (
              <g
                key={dataId}
                className="metro-station-group"
                data-station-id={dataId}
                data-station-index={i}
                onMouseEnter={() => emitStationEvt("hover", mkPayload())}
                onMouseLeave={() => emitStationEvt("leave", mkPayload())}
                onClick={() => emitStationEvt("click", mkPayload())}
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={stationSize}
                  className="metro-station"
                  aria-label={
                    station.description
                      ? `${station.name} — ${station.description}`
                      : station.name
                  }
                >
                </circle>
                <text
                  x={pt.x + dx}
                  y={pt.y + dy}
                  className="metro-label"
                  textAnchor="middle"
                  alignmentBaseline="hanging"
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
