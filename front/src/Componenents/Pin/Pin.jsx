import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "/pin1.jpg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function Pin({ item }) {
  if (!item.latitude || !item.longitude) return null;

  return (
    <Marker position={[item.latitude, item.longitude]} icon={customIcon}>
      <Popup>{item.title}</Popup>
    </Marker>
  );
}

export default Pin;
