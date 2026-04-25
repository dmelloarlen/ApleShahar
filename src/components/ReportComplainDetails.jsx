import React, { useState, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Leaf, MapPin, Camera, Navigation, X } from 'lucide-react';
import { getStoredUser, submitComplaint } from '../lib/api';

// Fix for default leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Constants
const DEFAULT_CENTER = [18.5204, 73.8567];
const WARDS = [
  { id: 'W-01', name: 'Pune Central', coordinates: [18.5204, 73.8567] },
  { id: 'W-02', name: 'Kothrud', coordinates: [18.5074, 73.8077] },
  { id: 'W-03', name: 'Viman Nagar', coordinates: [18.5679, 73.9143] },
  { id: 'W-04', name: 'Baner', coordinates: [18.559, 73.7868] },
  { id: 'W-05', name: 'Hadapsar', coordinates: [18.4966, 73.9416] }
];

// Helper Components
const LocationMarker = ({ position, setPosition }) => {
  const map = useMapEvents({
    click(e) { setPosition(e.latlng); },
  });

  React.useEffect(() => {
    setTimeout(() => map.invalidateSize(), 100);
  }, [map]);

  return position ? <Marker position={position} /> : null;
};

const MapUpdater = ({ center }) => {
  const map = useMapEvents({});
  React.useEffect(() => {
    if (center) map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

// Helper Functions
const getWardFromCoordinates = (lat, lng) => {
  if (lat > 18.55 && lng > 73.85) return 'W-03'; // Viman Nagar
  if (lat < 18.51 && lng < 73.82) return 'W-02'; // Kothrud
  if (lat < 18.50 && lng > 73.90) return 'W-05'; // Hadapsar
  return 'W-01'; // Default: Pune Central
};

const setWardAndPosition = (wardId, setSelectedWard, setMapCenter, setPosition) => {
  setSelectedWard(wardId);
  const ward = WARDS.find(w => w.id === wardId);
  if (ward) {
    setMapCenter(ward.coordinates);
    setPosition({ lat: ward.coordinates[0], lng: ward.coordinates[1] });
  }
};

const ReportComplainDetails = () => {
  const user = getStoredUser();

  // State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    selectedWard: '',
    position: null,
    photo: null,
    mapCenter: DEFAULT_CENTER,
    isAutoDetecting: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  // Event Handlers
  const handleInputChange = useCallback((field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  }, []);

  const handleWardChange = useCallback((e) => {
    const wardId = e.target.value;
    setFormData(prev => ({ ...prev, selectedWard: wardId }));
    const ward = WARDS.find(w => w.id === wardId);
    if (ward) {
      setFormData(prev => ({
        ...prev,
        mapCenter: ward.coordinates,
        position: { lat: ward.coordinates[0], lng: ward.coordinates[1] }
      }));
    }
  }, []);

  const autoDetectWard = useCallback(() => {
    setFormData(prev => ({ ...prev, isAutoDetecting: true }));

    const handleGeolocationSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      const detectedWard = getWardFromCoordinates(latitude, longitude);
      setWardAndPosition(
        detectedWard,
        (ward) => setFormData(prev => ({ ...prev, selectedWard: ward })),
        (center) => setFormData(prev => ({ ...prev, mapCenter: center })),
        (pos) => setFormData(prev => ({ ...prev, position: pos, isAutoDetecting: false }))
      );
    };

    const handleGeolocationError = () => {
      const randomWard = WARDS[Math.floor(Math.random() * WARDS.length)];
      setWardAndPosition(
        randomWard.id,
        (ward) => setFormData(prev => ({ ...prev, selectedWard: ward })),
        (center) => setFormData(prev => ({ ...prev, mapCenter: center })),
        (pos) => setFormData(prev => ({ ...prev, position: pos, isAutoDetecting: false }))
      );
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleGeolocationSuccess,
        handleGeolocationError,
        { timeout: 10000 }
      );
    } else {
      handleGeolocationError();
    }
  }, []);

  const handlePhotoChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const removePhoto = useCallback(() => {
    setFormData(prev => ({ ...prev, photo: null }));
    fileInputRef.current?.value && (fileInputRef.current.value = '');
  }, []);

  const validateForm = () => {
    if (!formData.title.trim()) {
      alert('Please enter a title for your complaint.');
      return false;
    }
    if (!formData.description.trim()) {
      alert('Please describe the problem in detail.');
      return false;
    }
    if (!formData.selectedWard) {
      alert('Please select or auto-detect your ward.');
      return false;
    }
    if (!formData.position) {
      alert('Please pin the location on the map.');
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      selectedWard: '',
      position: null,
      photo: null,
      mapCenter: DEFAULT_CENTER,
      isAutoDetecting: false
    });
    fileInputRef.current?.value && (fileInputRef.current.value = '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!validateForm()) return;

    const wardName = WARDS.find(w => w.id === formData.selectedWard)?.name || 'Unknown';
    const complaintPayload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      ward_no: formData.selectedWard,
      ward: formData.selectedWard,
      location: {
        latitude: formData.position.lat,
        longitude: formData.position.lng,
      },
      latitude: formData.position.lat,
      longitude: formData.position.lng,
      photo: formData.photo || null,
      ward_name: wardName,
      contact: user?.contact || user?.user_metadata?.contact || null,
    };

    setSubmitting(true);
    submitComplaint(complaintPayload)
      .then(() => {
        setSuccess('Complaint submitted successfully.');
        resetForm();
      })
      .catch((err) => {
        setError(err?.payload?.error || err?.message || 'Unable to submit complaint.');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            Report a Problem
          </h1>
          <p className="text-slate-600 text-sm md:text-base">
            Help us improve our community by reporting issues
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-6 md:p-8 space-y-6">

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {success}
              </div>
            )}

            {/* Title Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Complaint Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={handleInputChange('title')}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 focus:outline-none transition-all text-slate-700 placeholder:text-slate-400"
                placeholder="e.g., Broken street light on Main Road"
                required
              />
            </div>

            {/* Problem Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Problem Description *
              </label>
              <textarea
                rows="4"
                value={formData.description}
                onChange={handleInputChange('description')}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 focus:outline-none transition-all text-slate-700 placeholder:text-slate-400 resize-none"
                placeholder="Please describe the problem in detail..."
                required
              />
            </div>

            {/* Ward Number with Auto-detect */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Ward Number *
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <select
                    value={formData.selectedWard}
                    onChange={handleWardChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 focus:outline-none transition-all text-slate-700 bg-white"
                  >
                    <option value="">Select Ward Manually</option>
                    {WARDS.map(w => (
                      <option key={w.id} value={w.id}>{w.id} - {w.name}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={autoDetectWard}
                  disabled={formData.isAutoDetecting}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {formData.isAutoDetecting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Detecting...
                    </>
                  ) : (
                    <>
                      <Navigation className="w-4 h-4" />
                      Auto-detect
                    </>
                  )}
                </button>
              </div>
              {formData.selectedWard && (
                <p className="text-sm text-emerald-600 mt-2 font-medium">
                  ✓ Ward {formData.selectedWard} selected
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Attach Photo (Optional)
              </label>
              <div className="space-y-3">
                {!formData.photo ? (
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-emerald-400 transition-colors">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handlePhotoChange}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="cursor-pointer flex flex-col items-center gap-3"
                    >
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Camera className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-slate-700 font-medium">Take or upload photo</p>
                        <p className="text-slate-500 text-sm">Tap to capture or select from gallery</p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={formData.photo}
                      alt="Captured"
                      className="w-full h-48 object-cover rounded-xl border-2 border-emerald-200"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <p className="text-sm text-emerald-600 mt-2 font-medium text-center">
                      ✓ Photo attached successfully
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Location/Map */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500" />
                Pin Location on Map *
              </label>
              <div className="rounded-2xl overflow-hidden border-2 border-slate-200 shadow-inner" style={{ height: '300px' }}>
                <MapContainer center={formData.mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
                  <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                  <MapUpdater center={formData.mapCenter} />
                  <LocationMarker
                    position={formData.position}
                    setPosition={(pos) => setFormData(prev => ({ ...prev, position: pos }))}
                  />
                </MapContainer>
              </div>
              {formData.position ? (
                <p className="text-sm text-emerald-600 mt-3 font-medium text-center">
                  ✓ Location pinned: {formData.position.lat.toFixed(4)}, {formData.position.lng.toFixed(4)}
                </p>
              ) : (
                <p className="text-sm text-slate-500 mt-3 text-center">
                  Tap on the map to drop a pin at the problem location
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-emerald-600 text-white font-semibold text-lg py-4 rounded-xl hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-200 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {submitting ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportComplainDetails;
