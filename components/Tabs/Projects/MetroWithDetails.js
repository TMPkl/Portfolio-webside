import { useCallback, useState, useRef, useEffect } from "react";
import MetroLine from "../../MetroLine";

export default function MetroWithDetails({
  language = "pl",
  stations = [],
  points = null,
  // forward any MetroLine props
  ...metroProps
}) {
  const wrapperRef = useRef(null);
  const [popover, setPopover] = useState({
    visible: false,
    pinned: false,
    x: 0,
    y: 0,
    side: "right",
    station: null,
  });

  // Zamknij dymek przy zmianie języka, aby treść nie była „stara”
  useEffect(() => {
    setPopover({ visible: false, pinned: false, x: 0, y: 0, side: "right", station: null });
  }, [language]);

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const placeNear = (clientX, clientY) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0, side: "right" };

    // local coords inside wrapper (move with scroll)
    const localX = clientX - rect.left;
    const localY = clientY - rect.top;

    const side = localX > rect.width * 0.6 ? "left" : "right";
    const offset = 16;
    let x = localX + (side === "right" ? offset : -offset);
    let y = localY + 8;

    // keep inside wrapper bounds
    x = clamp(x, 8, rect.width - 8);
    y = clamp(y, 8, rect.height - 8);

    return { x, y, side };
  };

  const handleHover = useCallback(
    (payload) => {
      if (!payload) return;
      const { clientX, clientY, station } = payload;
      if (popover.pinned) return; // don't update while pinned
      if (typeof clientX !== "number" || typeof clientY !== "number") return;
      const p = placeNear(clientX, clientY);
      setPopover({ visible: true, pinned: false, x: p.x, y: p.y, side: p.side, station });
    },
    [popover.pinned]
  );

  const handleLeave = useCallback(() => {
    if (popover.pinned) return;
    setPopover((s) => ({ ...s, visible: false, station: null }));
  }, [popover.pinned]);

  const handleClick = useCallback(
    (payload) => {
      if (!payload) return;
      const { clientX, clientY, station } = payload;
      const p = placeNear(clientX, clientY);
      setPopover({ visible: true, pinned: true, x: p.x, y: p.y, side: p.side, station });
    },
    []
  );

  return (
    <div className="metro-details-wrapper" ref={wrapperRef}>
      <MetroLine
        stations={stations}
        points={points}
        onStationHover={handleHover}
        onStationLeave={handleLeave}
        onStationClick={handleClick}
        // Wymuś remount MetroLine przy zmianie języka (gdyby React coś kechował)
        key={`metroline-${language}`}
        {...metroProps}
      />

      {popover.visible && popover.station && (
        <div
          className={`metro-details ${popover.pinned ? "is-pinned" : ""} side-${popover.side}`}
          style={{ position: "absolute", left: popover.x, top: popover.y }}
          role="dialog"
          aria-label={`Szczegóły: ${popover.station.name}`}
        >
          <div className="metro-details__header">
            <strong className="metro-details__title">{popover.station.name}</strong>
            <button
              className="metro-details__close"
              onClick={() => setPopover({ visible: false, pinned: false, x: 0, y: 0, side: "right", station: null })}
              aria-label="Zamknij"
            >
              ×
            </button>
          </div>
          {popover.station.year && (
            <div className="metro-details__meta">
              <span className="metro-details__year">{popover.station.year}</span>
            </div>
          )}
          {popover.station.description && (
            <div className="metro-details__desc">{popover.station.description}</div>
          )}
          {popover.station.longDescription && (
            <div className="metro-details__long">{popover.station.longDescription}</div>
          )}
          {popover.station.href && (
            <div className="metro-details__links">
              <a href={popover.station.href} target="_blank" rel="noreferrer">
                Zobacz
              </a>
            </div>
          )}
          <span className="metro-details__arrow" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}