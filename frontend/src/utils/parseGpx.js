import { haversine } from "./haversine";

export const parseGpx = async (file) => {
  const text = await file.text();
  const xml = new DOMParser().parseFromString(text, "text/xml");
  const pts = xml.getElementsByTagName("trkpt");

  if (!pts.length) return {};

  let totalDist = 0;
  let movingTime = 0;
  const route = [];
  let prev = null;

  // speed threshold in m/s to consider "moving"
  const MIN_SPEED = 1; // ≈2.2 mph 

  for (let i = 0; i < pts.length; i++) {
    const lat = +pts[i].getAttribute("lat");
    const lon = +pts[i].getAttribute("lon");
    const timeNode = pts[i].getElementsByTagName("time")[0];
    const currentTime = timeNode
      ? new Date(timeNode.textContent).getTime()
      : null;

    const pt = { lat, lon, time: currentTime };
    if (prev?.time && pt.time) {
      const dist = haversine(prev, pt);
      const dt = (pt.time - prev.time) / 1000; // sec
      const speed = dist / dt; // m/s

      totalDist += dist;
      if (speed > MIN_SPEED) movingTime += dt;
    }

    route.push(pt);
    prev = pt;
  }

  const distanceMi = totalDist * 0.000621371;
  const elapsedTime =
    prev.time && route[0].time ? (prev.time - route[0].time) / 1000 : null;
  const date = prev.time
    ? new Date(prev.time).toISOString().split("T")[0]
    : null;

  return { distanceMi, movingTime, elapsedTime, date, route };
};