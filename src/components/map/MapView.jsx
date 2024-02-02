import { MapContainer, TileLayer, Marker,useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import iconsvg from '../../assets/icons/marker.svg';
import axios from 'axios';
import { useState, useEffect } from "react";

const houseIcon = new Icon({
  iconUrl: iconsvg,
  iconSize: [25, 25],
});

const MapView = () => {
  const defaultCenter = [6.25184, -75.56359]; // Medellín
  const [location, setLocation] = useState(defaultCenter);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [locationSelected, setLocationSelected] = useState();


  const ChangeView = ({center}) => {
    const map = useMap();
    map.setView(center);
    return null;
  }


  const handleLocationSelect = (result) => {
    setLocation([result.lat, result.lon]);
    setLocationSelected(result);
    setSearchResults([]);
  };

  const onMarkerDragEnd = async (e) => {
    const newLat = e.target.getLatLng().lat;
    const newLng = e.target.getLatLng().lng;

    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLat}&lon=${newLng}`);

    console.log(response.data);

    // Lógica para actualizar el estado con la nueva ubicación
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${searchTerm}`);
      setSearchResults(response.data);
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
      {/* Buscador */}
      <div className="w-full lg:w-1/3 relative">
        <input
          type="text"
          placeholder="Buscar lugar"
          className="w-full border rounded py-2 px-4"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {searchResults.length > 0 && (
          <ul className="absolute top-full bg-white w-full border rounded mt-1">
            {searchResults.map((result) => (
              <li
                key={result.place_id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleLocationSelect(result)}
              >
                {result.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Mapa */}
      <div className="w-full lg:w-2/3">
        <MapContainer center={location} style={{ height: '400px', width: '100%' }} zoom={13}>
          <ChangeView center={location} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={location} draggable={true} icon={houseIcon} onDragend={onMarkerDragEnd} />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
