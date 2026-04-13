import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Leaf, MapPin } from 'lucide-react';

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
      alert('We need to know where this is! Please select a ward and pin it on the map.');
      return;
    }

    alert('Thank you! Your issue has been shared with the community helpers.');
    setPosition(null);
    setSelectedWard('');
    setPhoto(null);
    e.target.reset();
  };

  return (
    <div className="animate-fade-in-right">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600"><Leaf className="w-5 h-5"/></div>
        <h2 className="text-3xl font-black text-stone-800">Notice something broken?</h2>
      </div>
      <p className="text-stone-500 mb-8 font-medium">Let us know what's wrong, and we'll get it fixed together.</p>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 max-w-4xl">
        <div className="mb-6">
          <label className="block text-sm font-bold text-stone-600 mb-2 pl-2">What happened?</label>
          <input type="text" className="w-full px-5 py-4 border-2 border-stone-100 bg-stone-50 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-300 focus:outline-none transition-all placeholder:text-stone-300 font-medium" placeholder="Briefly describe the issue (e.g. Tree branch blocking road)" required />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-bold text-stone-600 mb-2 pl-2">Share more details with us</label>
          <textarea rows="4" className="w-full px-5 py-4 border-2 border-stone-100 bg-stone-50 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-300 focus:outline-none transition-all placeholder:text-stone-300 font-medium" placeholder="The more details, the better we can help..." required></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold text-stone-600 mb-2 pl-2">Upload a photo to help us find it</label>
          <input 
            type="file" 
            accept="image/*" 
            capture="environment"
            onChange={handlePhotoChange}
            className="block w-full text-sm text-stone-500 file:mr-4 file:py-3 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-all cursor-pointer" 
            required 
          />
          {photo && <p className="text-sm text-emerald-600 mt-3 font-bold flex items-center gap-1 pl-2">✓ Photo attached beautifully!</p>}
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 px-2 gap-2">
            <label className="block text-sm font-bold text-stone-600 flex items-center gap-2"><MapPin className="text-rose-500 w-4 h-4"/> Pin it on the map</label>
            <select 
              value={selectedWard} 
              onChange={handleWardChange}
              className="w-full sm:w-auto px-4 py-2 bg-stone-50 border-2 border-stone-100 rounded-xl text-sm font-bold text-stone-600 focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-300 transition-all cursor-pointer"
            >
              <option value="">Jump to Neighborhood...</option>
              {wards.map(w => (
                <option key={w.id} value={w.id}>{w.name}</option>
              ))}
            </select>
          </div>
          <div className="rounded-[2rem] overflow-hidden border-4 border-stone-50 shadow-inner mb-3 relative z-0" style={{ height: '400px' }}>
            <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
              <MapUpdater center={mapCenter} />
              <LocationMarker position={position} setPosition={setPosition} />
            </MapContainer>
          </div>
          {position ? (
            <p className="text-sm text-emerald-600 font-bold tracking-tight pl-2">Location pinned: {position.lat.toFixed(4)}, {position.lng.toFixed(4)}</p>
          ) : (
            <p className="text-sm text-stone-400 font-medium pl-2">Tap on the map to drop a pin.</p>
          )}
        </div>

        <button type="submit" className="w-full bg-emerald-500 text-white font-black text-lg py-5 rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200 hover:-translate-y-1">
          Share with Community
        </button>
      </form>
    </div>
  );
};

export default ReportComplainDetails;
