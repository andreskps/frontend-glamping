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

const MapView = ({handleLocation}) => {
  const getLocation = useLocationStore((state) => state.location);
  const defaultCenter = [6.25184, -75.56359]; // Medellín
  const [location, setLocation] = useState([
    getLocation.lat ? getLocation.lat : defaultCenter[0],
    getLocation.lon ? getLocation.lon : defaultCenter[1],
  ]);
  const [locationSelected, setLocationSelected] = useState({
    displayName: "",
    lat: "",
    lon: "",
  });

  const ChangeView = ({ center }) => {
    const map = useMap();
    map.setView(center);
    return null;
  };

  const handleLocationSelect = async (result) => {
    
    const newLocationSelected = {
      displayName: result.display_name,
      lat: result.lat,
      lon: result.lon,
    }

    await handleLocation(newLocationSelected);
    setLocationSelected(result);   
    setLocation([result.lat, result.lon]);

};

  const onMarkerDragEnd = async (e) => {
    const newLat = e.target.getLatLng().lat;
    const newLng = e.target.getLatLng().lng;
   

    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLat}&lon=${newLng}`
    );

     const newLocation = {
      displayName: response.data.display_name,
      lat: newLat,
      lon: newLng,
    };

  
    setLocationSelected(newLocation);

    await handleLocation(newLocation);

  };


  const handleSearchLocation = async (inputValue) => {

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
    <div className="">
      {/* Buscador */}
      <div className="relative z-10">
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
      <div className="w-full mt-10 relative z-0">
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

      {/* Información */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Información</h3>
        <div className="flex flex-col">
          <p>
            <span className="font-semibold">Dirección:</span>{" "}
            {locationSelected.display_name}
          </p>
          <p>
            <span className="font-semibold">Latitud:</span> {locationSelected.lat}
          </p>
          <p>
            <span className="font-semibold">Longitud:</span> {locationSelected.lon}
          </p>
        </div>
        </div>
    </div>
  );
};

export default MapView;
