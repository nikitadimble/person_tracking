import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, LoadScript, Circle, Polyline, InfoWindow } from "@react-google-maps/api";

export default function Tracking() {

    const [currentLocation, setCurrentLocation] = useState(null);
    const [path, setPath] = useState([]);
    const [insideArea, setInsideArea] = useState(true);
    const [alert, setAlert] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const trackingPoints = [
        { lat: 18.6275, lng: 73.8001 },
        { lat: 18.6280, lng: 73.8010 },
        { lat: 18.6290, lng: 73.8020 },
        { lat: 18.6300, lng: 73.8030 },
        { lat: 18.6310, lng: 73.8040 },
        { lat: 18.6320, lng: 73.8050 },
        { lat: 18.6330, lng: 73.8060 },
        { lat: 18.6340, lng: 73.8070 }
    ];

    const centerRadius = { lat: 18.6275, lng: 73.8001 };
    const GEO_RADIUS = 300;

    const locationRecords = [
        { 
            id: 1, 
            location: "Home", 
            latitude: 18.6275, 
            longitude: 73.8001, 
            entryTime: "10:00 PM", 
            exitTime: "07:00 AM", 
            duration: "9h 0m", 
            category: "Residence",
            address: "123 Oak Street, Pimpri, Maharashtra 411018",
            personName: "John Smith",
            personId: "PR-2024-001",
            status: "Compliant"
        },
        { 
            id: 2, 
            location: "Worksite", 
            latitude: 18.6289, 
            longitude: 73.8019, 
            entryTime: "09:00 AM", 
            exitTime: "05:00 PM", 
            duration: "8h 0m", 
            category: "Work",
            address: "456 Industrial Area, Mumbai, Maharashtra 400001",
            personName: "John Smith",
            personId: "PR-2024-001",
            status: "Compliant"
        },
        { 
            id: 3, 
            location: "Grocery Market", 
            latitude: 18.6301, 
            longitude: 73.8032, 
            entryTime: "06:00 PM", 
            exitTime: "06:30 PM", 
            duration: "30m", 
            category: "Essential",
            address: "789 Market Road, Pimpri-Chinchwad, Maharashtra 411033",
            personName: "John Smith",
            personId: "PR-2024-001",
            status: "Compliant"
        },
        { 
            id: 4, 
            location: "Medical Store", 
            latitude: 18.6314, 
            longitude: 73.8045, 
            entryTime: "01:00 PM", 
            exitTime: "01:20 PM", 
            duration: "20m", 
            category: "Essential",
            address: "890 Hospital Road, Pune, Maharashtra 411001",
            personName: "John Smith",
            personId: "PR-2024-001",
            status: "Compliant"
        }
    ];

    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371e3;
        const φ1 = lat1 * (Math.PI / 180);
        const φ2 = lat2 * (Math.PI / 180);
        const Δφ = (lat2 - lat1) * (Math.PI / 180);
        const Δλ = (lon2 - lon1) * (Math.PI / 180);

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            const newPoint = trackingPoints[index];
            setCurrentLocation(newPoint);
            setPath(prev => [...prev, newPoint]);

            const distance = getDistance(
                newPoint.lat, newPoint.lng,
                centerRadius.lat, centerRadius.lng
            );

            if (distance > GEO_RADIUS) {
                setInsideArea(false);
                setAlert(true);
                // Play alert sound or show notification
                if (window.Notification && Notification.permission === "granted") {
                    new Notification("⚠️ Geofence Alert", {
                        body: "Person has moved outside the safe zone!",
                        icon: "🚨"
                    });
                }
            } else {
                setInsideArea(true);
                setAlert(false);
            }

            index++;
            if (index >= trackingPoints.length) index = 0;
        }, 3000);

        // Request notification permission
        if (window.Notification && Notification.permission === "default") {
            Notification.requestPermission();
        }

        return () => clearInterval(interval);
    }, []);

    const handleLocationClick = (location) => {
        setSelectedLocation(location);
        // Center map on selected location
        setCurrentLocation({ lat: location.latitude, lng: location.longitude });
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Residence': return '#22c55e';
            case 'Work': return '#3b82f6';
            case 'Essential': return '#fbbf24';
            case 'Recreation': return '#a855f7';
            default: return '#94a3b8';
        }
    };

   return (
    <div style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden"
    }}>
        
        {/* COLLAPSIBLE LEFT SIDEBAR */}
        <div style={{
            position: "absolute",
            top: 0,
            left: sidebarOpen ? 0 : "-400px",
            width: "400px",
            height: "100%",
            overflowY: "auto",
            backgroundColor: "#0f172a",
            padding: "20px",
            zIndex: 1000,
            transition: "left 0.3s ease-in-out",
            boxShadow: "2px 0 10px rgba(0,0,0,0.3)"
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ color: "white", fontSize: "20px", margin: 0, fontWeight: "bold" }}>
                    📍 Location History
                </h2>
                <button 
                    onClick={() => setSidebarOpen(false)}
                    style={{
                        background: "none",
                        border: "none",
                        color: "white",
                        fontSize: "28px",
                        cursor: "pointer",
                        padding: "4px 8px",
                        lineHeight: "1"
                    }}
                >
                    ×
                </button>
            </div>

            {/* Person Info Card */}
            <div style={{
                backgroundColor: "#1e293b",
                padding: "16px",
                borderRadius: "12px",
                marginBottom: "16px",
                border: "2px solid #3b82f6"
            }}>
                <h3 style={{ color: "white", fontSize: "18px", marginBottom: "8px", fontWeight: "bold" }}>
                    👤 {locationRecords[0].personName}
                </h3>
                <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "4px" }}>
                    ID: <span style={{ color: "white", fontWeight: "500" }}>{locationRecords[0].personId}</span>
                </p>
                <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "4px" }}>
                    Status: <span style={{ color: "#22c55e", fontWeight: "600" }}>✓ {locationRecords[0].status}</span>
                </p>
                <p style={{ color: "#94a3b8", fontSize: "13px" }}>
                    Locations: <span style={{ color: "white", fontWeight: "500" }}>{locationRecords.length} visited</span>
                </p>
            </div>

            {locationRecords.map((record) => (
                <div 
                    key={record.id} 
                    onClick={() => handleLocationClick(record)}
                    style={{
                        backgroundColor: selectedLocation?.id === record.id ? "#1e40af" : "#1e293b",
                        padding: "16px",
                        borderRadius: "12px",
                        marginBottom: "16px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        border: selectedLocation?.id === record.id ? "2px solid #60a5fa" : "2px solid transparent",
                        transform: selectedLocation?.id === record.id ? "scale(1.02)" : "scale(1)"
                    }}
                    onMouseEnter={(e) => {
                        if (selectedLocation?.id !== record.id) {
                            e.currentTarget.style.backgroundColor = "#334155";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (selectedLocation?.id !== record.id) {
                            e.currentTarget.style.backgroundColor = "#1e293b";
                        }
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "8px" }}>
                        <h3 style={{ color: "white", fontSize: "16px", margin: 0, fontWeight: "600" }}>
                            📌 {record.location}
                        </h3>
                        <span style={{
                            backgroundColor: getCategoryColor(record.category),
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "11px",
                            fontWeight: "600"
                        }}>
                            {record.category}
                        </span>
                    </div>

                    <p style={{ color: "#94a3b8", fontSize: "12px", marginBottom: "8px" }}>
                        📍 {record.address}
                    </p>

                    <p style={{ color: "#cbd5e1", fontSize: "12px", marginBottom: "4px" }}>
                        🌐 Lat: {record.latitude}, Lng: {record.longitude}
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "8px" }}>
                        <div>
                            <p style={{ color: "#94a3b8", fontSize: "11px", marginBottom: "2px" }}>⏰ Entry</p>
                            <p style={{ color: "white", fontWeight: "500", fontSize: "12px" }}>{record.entryTime}</p>
                        </div>
                        <div>
                            <p style={{ color: "#94a3b8", fontSize: "11px", marginBottom: "2px" }}>⏰ Exit</p>
                            <p style={{ color: "white", fontWeight: "500", fontSize: "12px" }}>{record.exitTime}</p>
                        </div>
                    </div>

                    <p style={{ color: "#94a3b8", fontSize: "12px", marginTop: "8px" }}>
                        ⏱️ Duration: <span style={{ color: "#22c55e", fontWeight: "600" }}>{record.duration}</span>
                    </p>
                </div>
            ))}
        </div>

        {/* TOGGLE BUTTON - Show when sidebar is closed */}
        {!sidebarOpen && (
            <button 
                onClick={() => setSidebarOpen(true)}
                style={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    zIndex: 1000,
                    backgroundColor: "#0f172a",
                    color: "white",
                    border: "2px solid #3b82f6",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                }}
            >
                ☰ Show Location History
            </button>
        )}

        {/* GOOGLE MAP - FULL PAGE */}
        <div style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}>
            <LoadScript googleMapsApiKey="AIzaSyAxeaJsOGOLUTF-ZczawSFyGutYDXu4BkQ">
                <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={selectedLocation ? { lat: selectedLocation.latitude, lng: selectedLocation.longitude } : (currentLocation || centerRadius)}
                    zoom={15}
                >
                    <Circle
                        center={centerRadius}
                        radius={GEO_RADIUS}
                        options={{
                            strokeColor: insideArea ? "#1e40af" : "#dc2626",
                            strokeOpacity: 0.8,
                            strokeWeight: 3,
                            fillColor: insideArea ? "#3b82f6" : "#ef4444",
                            fillOpacity: 0.2,
                        }}
                    />

                    {/* Current Location Marker */}
                    {currentLocation && (
                        <Marker 
                            position={currentLocation}
                            icon={{
                                path: window.google?.maps?.SymbolPath?.CIRCLE || 0,
                                scale: 10,
                                fillColor: insideArea ? "#22c55e" : "#ef4444",
                                fillOpacity: 1,
                                strokeColor: "white",
                                strokeWeight: 3
                            }}
                        />
                    )}

                    {/* Location Record Markers */}
                    {locationRecords.map((record) => (
                        <Marker
                            key={record.id}
                            position={{ lat: record.latitude, lng: record.longitude }}
                            onClick={() => handleLocationClick(record)}
                            icon={{
                                path: window.google?.maps?.SymbolPath?.CIRCLE || 0,
                                scale: 8,
                                fillColor: getCategoryColor(record.category),
                                fillOpacity: 0.9,
                                strokeColor: "white",
                                strokeWeight: 2
                            }}
                        />
                    ))}

                    {/* Info Window for Selected Location */}
                    {selectedLocation && (
                        <InfoWindow
                            position={{ lat: selectedLocation.latitude, lng: selectedLocation.longitude }}
                            onCloseClick={() => setSelectedLocation(null)}
                        >
                            <div style={{ padding: "8px", minWidth: "200px" }}>
                                <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: "bold", color: "#1e293b" }}>
                                    {selectedLocation.location}
                                </h3>
                                <p style={{ margin: "4px 0", fontSize: "12px", color: "#64748b" }}>
                                    <strong>Person:</strong> {selectedLocation.personName}
                                </p>
                                <p style={{ margin: "4px 0", fontSize: "12px", color: "#64748b" }}>
                                    <strong>Address:</strong> {selectedLocation.address}
                                </p>
                                <p style={{ margin: "4px 0", fontSize: "12px", color: "#64748b" }}>
                                    <strong>Entry:</strong> {selectedLocation.entryTime}
                                </p>
                                <p style={{ margin: "4px 0", fontSize: "12px", color: "#64748b" }}>
                                    <strong>Exit:</strong> {selectedLocation.exitTime}
                                </p>
                                <p style={{ margin: "4px 0", fontSize: "12px", color: "#64748b" }}>
                                    <strong>Duration:</strong> {selectedLocation.duration}
                                </p>
                                <p style={{ margin: "8px 0 0 0" }}>
                                    <span style={{
                                        backgroundColor: getCategoryColor(selectedLocation.category),
                                        color: "white",
                                        padding: "4px 8px",
                                        borderRadius: "4px",
                                        fontSize: "11px",
                                        fontWeight: "600"
                                    }}>
                                        {selectedLocation.category}
                                    </span>
                                </p>
                            </div>
                        </InfoWindow>
                    )}

                    <Polyline 
                        path={path} 
                        options={{ 
                            strokeColor: insideArea ? "#3b82f6" : "#ef4444", 
                            strokeWeight: 4,
                            strokeOpacity: 0.8
                        }} 
                    />
                </GoogleMap>
            </LoadScript>

            {/* ALERT BANNER - Only shows when outside circle */}
            {alert && !insideArea && (
                <div style={{
                    position: "absolute",
                    top: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#ef4444",
                    padding: "16px 32px",
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(239,68,68,0.5)",
                    zIndex: 999,
                    animation: "pulse 2s infinite",
                    border: "3px solid white"
                }}>
                    <div style={{ fontSize: "24px", marginBottom: "4px" }}>🚨 ALERT 🚨</div>
                    <div style={{ fontSize: "16px" }}>Person has moved outside the safe zone!</div>
                    <div style={{ fontSize: "13px", marginTop: "4px", opacity: 0.9 }}>
                        Distance: {Math.round(getDistance(
                            currentLocation.lat, currentLocation.lng,
                            centerRadius.lat, centerRadius.lng
                        ))}m from center
                    </div>
                </div>
            )}

            {/* Status Indicator */}
            <div style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
                backgroundColor: "white",
                padding: "12px 20px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                zIndex: 999
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: insideArea ? "#22c55e" : "#ef4444",
                        animation: "pulse 2s infinite"
                    }}></div>
                    <span style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b" }}>
                        {insideArea ? "Inside Safe Zone" : "Outside Safe Zone"}
                    </span>
                </div>
            </div>
        </div>

        <style>
            {`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
            `}
        </style>
    </div>
);

}