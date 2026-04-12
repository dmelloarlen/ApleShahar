import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const LocationMarker = ({ position, setPosition }) => {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  React.useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
};

const MapUpdater = ({ center }) => {
  const map = useMapEvents({});
  React.useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
};

const ReportComplainDetails = () => {
  const [position, setPosition] = useState(null);
  const [selectedWard, setSelectedWard] = useState('');
  const [mapCenter, setMapCenter] = useState([18.5204, 73.8567]);
  const [photo, setPhoto] = useState(null);
  
  const wards = [
    { id: 'W-01', name: 'Pune Central', coordinates: [18.5204, 73.8567] },
    { id: 'W-02', name: 'Kothrud', coordinates: [18.5074, 73.8077] },
    { id: 'W-03', name: 'Viman Nagar', coordinates: [18.5679, 73.9143] },
    { id: 'W-04', name: 'Baner', coordinates: [18.559, 73.7868] },
    { id: 'W-05', name: 'Hadapsar', coordinates: [18.4966, 73.9416] }
  ];

  const handleWardChange = (e) => {
    const wardId = e.target.value;
    setSelectedWard(wardId);
    const ward = wards.find(w => w.id === wardId);
    if (ward) {
      setMapCenter(ward.coordinates);
    }
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !selectedWard) {
      alert('Please select a ward and pin a location on the map first.');
      return;
    }

    alert('Complaint successfully registered!');
    setPosition(null);
    setSelectedWard('');
    setPhoto(null);
    e.target.reset();
  };

  return (
    <div>
        <h2 className="text-3xl font-bold mb-6">Report an Infrastructure Issue</h2>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Issue Title</label>
            <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g. Broken Streetlight" required />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
            <textarea rows="4" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Describe the issue in detail..." required></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Upload Geotagged Photo</label>
            <input 
              type="file" 
              accept="image/*" 
              capture="environment"
              onChange={handlePhotoChange}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition" 
              required 
            />
            {photo && <p className="text-xs text-green-600 mt-1 font-medium">✓ Photo successfully attached</p>}
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-slate-700">Pin Location on Map</label>
              <select 
                value={selectedWard} 
                onChange={handleWardChange}
                className="px-3 py-1 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Filter by Ward...</option>
                {wards.map(w => (
                  <option key={w.id} value={w.id}>{w.name}</option>
                ))}
              </select>
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-300 mb-2 relative z-0" style={{ height: '400px' }}>
              <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapUpdater center={mapCenter} />
                <LocationMarker position={position} setPosition={setPosition} />
              </MapContainer>
            </div>
            {position ? (
              <p className="text-sm text-green-600 font-medium tracking-tight">Location selected: {position.lat.toFixed(4)}, {position.lng.toFixed(4)}</p>
            ) : (
              <p className="text-sm text-slate-500">Click on the map to pin the exact location.</p>
            )}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
            Submit Complaint
          </button>
        </form>
    </div>
  );
};

export default ReportComplainDetails;
