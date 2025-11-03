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
  const MIN_SPEED = 0.5; // ≈1.1 mph — tweak as you like

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

// helper unchanged
const haversine = (a, b) => {
  const R = 6371000;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
};
