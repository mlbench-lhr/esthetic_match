"use client";

import React from "react";
import { geoMercator, geoPath } from "d3-geo";
import { zoom } from "d3-zoom";
import { select } from "d3-selection";
import * as topojson from "topojson-client";

type ZoomEvt = { transform: { toString(): string } };

type CountryFeature = {
  id?: number | string;
  properties?: ({ name?: string } & Record<string, unknown>) | undefined;
} & Record<string, unknown>;

interface TopologyLike {
  objects?: { countries?: unknown };
}

type Marker = {
  latLng: [number, number];
  name: string;
  style?: {
    fill?: string;
    borderWidth?: number;
    borderColor?: string;
    stroke?: string;
    strokeOpacity?: number;
    r?: number;
  };
};

interface CountryMapProps {
  mapColor?: string;
  markers?: Marker[];
  height?: number;
  disableWheelZoom?: boolean;
}

const DEFAULT_MARKERS: Marker[] = [
  {
    latLng: [37.2580397, -104.657039],
    name: "United States",
    style: {
      fill: "#465FFF",
      borderWidth: 1,
      borderColor: "white",
      stroke: "#383f47",
    },
  },
  {
    latLng: [20.7504374, 73.7276105],
    name: "India",
    style: { fill: "#465FFF", borderWidth: 1, borderColor: "white" },
  },
  {
    latLng: [53.613, -11.6368],
    name: "United Kingdom",
    style: { fill: "#465FFF", borderWidth: 1, borderColor: "white" },
  },
  {
    latLng: [-25.0304388, 115.2092761],
    name: "Sweden",
    style: {
      fill: "#465FFF",
      borderWidth: 1,
      borderColor: "white",
      strokeOpacity: 0,
    },
  },
];

const WorldMap: React.FC<CountryMapProps> = ({
  mapColor,
  markers,
  height = 420,
  disableWheelZoom,
}) => {
  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const gRef = React.useRef<SVGGElement | null>(null);

  const [features, setFeatures] = React.useState<CountryFeature[]>([]);
  const [hoveredId, setHoveredId] = React.useState<number | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(
          "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`Failed to load map: ${res.status}`);
        const ct = res.headers.get("content-type") || "";
        if (!ct.includes("application/json")) {
          throw new Error("Invalid content type for map data");
        }
        const topo = (await res.json()) as unknown as TopologyLike;
        const countriesObj = topo.objects?.countries;
        if (!countriesObj) throw new Error("Invalid topojson structure");
        const geojson = topojson.feature(
          topo as Parameters<typeof topojson.feature>[0],
          countriesObj as Parameters<typeof topojson.feature>[1]
        ) as unknown as { features?: CountryFeature[] };
        if (!cancelled) setFeatures(geojson.features || []);
      } catch (err: unknown) {
        const isAbort =
          typeof err === "object" &&
          err !== null &&
          (err as { name?: string }).name === "AbortError";
        if (cancelled || isAbort) return;
        console.error("World map load error:", err);
        if (!cancelled) setFeatures([]);
      }
    })();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  React.useEffect(() => {
    if (!svgRef.current || !gRef.current) return;

    const svgSel = select(svgRef.current);
    const gSel = select(gRef.current);

    const z = zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 12])
      .on("zoom", (event: ZoomEvt) => {
        gSel.attr("transform", event.transform.toString());
      });

    svgSel.call(z as unknown as (sel: typeof svgSel) => void);

    if (disableWheelZoom) {
      svgSel.on("wheel.zoom", null);
      svgSel.on("wheel.prevent", null);
    } else {
      svgSel.on("wheel.prevent", (e: WheelEvent) => e.preventDefault());
    }

    return () => {
      svgSel.on(".zoom", null);
    };
  }, [features.length, disableWheelZoom]);

  const width = 960;
  const proj = React.useMemo(
    () =>
      geoMercator()
        .translate([width / 2, height / 2])
        .scale((width / (2 * Math.PI)) * 1.3),
    [height]
  );
  const pathGen = React.useMemo(() => geoPath(proj), [proj]);

  const data = (markers?.length ? markers : DEFAULT_MARKERS).map((m) => ({
    ...m,
    coords: [m.latLng[1], m.latLng[0]] as [number, number],
  }));

  return (
    <div className="w-full" style={{ lineHeight: 0 }}>
      <svg
        ref={svgRef}
        role="img"
        aria-label="World map"
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: "100%", height }}
      >
        <g ref={gRef}>
          {features.map((feat, idx) => {
            const id = feat.id as number | undefined;
            const isHovered = hoveredId !== null && id === hoveredId;
            const props = feat.properties as
              | Record<string, unknown>
              | undefined;
            const name =
              typeof props?.name === "string"
                ? (props.name as string)
                : undefined;
            const key =
              (typeof id !== "undefined" ? String(id) : name) ?? String(idx);
            return (
              <path
                key={key}
                d={
                  (pathGen as unknown as (o: unknown) => string | null)(feat) ||
                  ""
                }
                fill={isHovered ? "#465fff" : mapColor || "#D0D5DD"}
                fillOpacity={isHovered ? 0.7 : 1}
                stroke="none"
                onMouseEnter={() => id != null && setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ cursor: "pointer" }}
              />
            );
          })}

          {data.map((m, i) => {
            const [x, y] = proj(m.coords) || [0, 0];
            const r = m.style?.r ?? 4;
            return (
              <g key={`${m.name}-${i}`} transform={`translate(${x},${y})`}>
                <title>{m.name}</title>
                <circle
                  r={r}
                  fill={m.style?.fill ?? "#465FFF"}
                  stroke={m.style?.stroke ?? m.style?.borderColor ?? "#ffffff"}
                  strokeWidth={m.style?.borderWidth ?? 1}
                  {...(m.style?.strokeOpacity != null
                    ? { strokeOpacity: m.style.strokeOpacity }
                    : {})}
                />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default WorldMap;
