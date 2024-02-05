import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import iconsvg from "../../assets/icons/marker.svg";
import axios from "axios";
import AsyncSelect from 'react-select/async';
import { useState, useEffect } from "react";
import { useLocationStore } from "../../store/locationStore";

const houseIcon = new Icon({
  iconUrl: iconsvg,
  iconSize: [25, 25],
});

const MapView = () => {
  const getLocation = useLocationStore((state) => state.location);
  const defaultCenter = [6.25184, -75.56359]; // Medellín
  const [location, setLocation] = useState([
    getLocation.lat ? getLocation.lat : defaultCenter[0],
    getLocation.lon ? getLocation.lon : defaultCenter[1],
  ]);
  const [locationSelected, setLocationSelected] = useState({
    display_name: "",
    lat: "",
    lon: "",
  });

  const ChangeView = ({ center }) => {
    const map = useMap();
    map.setView(center);
    return null;
  };

  const handleLocationSelect = async (result) => {
    
    const newLocationSelected = result;
    setLocationSelected(newLocationSelected);   
    setLocation([result.lat, result.lon]);

};

  const onMarkerDragEnd = async (e) => {
    const newLat = e.target.getLatLng().lat;
    const newLng = e.target.getLatLng().lng;
    console.log(newLat, newLng);

    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLat}&lon=${newLng}`
    );

     const newLocation = {
      display_name: response.data.display_name,
      lat: newLat,
      lon: newLng,
    };

  
    setLocationSelected(newLocation);

    console.log(locationSelected)
  };


  const handleSearchLocation = async (inputValue) => {
    console.log(inputValue)
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${inputValue}`
      );
    
      return response.data.map((result) => ({
        label: result.display_name,
        value: result,
      }));
      
    } catch (error) {
      console.log(error);
    }
   
  }



  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
      {/* Buscador */}
      <div className="w-full lg:w-1/3 relative">
        <AsyncSelect
          loadOptions={handleSearchLocation}
          onChange={(e) => handleLocationSelect(e.value)}
          placeholder="Buscar lugar"
          noOptionsMessage={() => "No hay resultados"}
          className="w-full"
          cacheOptions={true}
          defaultOptions={true}
        />
      </div>

      {/* Mapa */}
      <div className="w-full lg:w-2/3">
        <MapContainer
          center={location}
          style={{ height: "400px", width: "100%" }}
          zoom={13}
        >
          <ChangeView center={location} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={location}
            draggable={true}
            icon={houseIcon}
            eventHandlers={{
              dragend: (e) => {
                onMarkerDragEnd(e);
              },
            }}
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
