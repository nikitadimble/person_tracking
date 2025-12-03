import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { MapPin, Clock, Navigation, User, AlertCircle, CheckCircle } from 'lucide-react';

export default function SingleParoleeTracking() {
    // Single parolee information
    const parolee = {
        name: 'John Smith',
        id: 'PR-2024-001',
        officer: 'Officer Sarah Johnson',
        status: 'Compliant',
        startDate: 'Jan 15, 2024',
        violations: 0,
        checkIns: 45,
        restrictedZoneEntries: 0
    };

    // Location visit summary
    const locationVisitData = [
        { location: 'Home', visits: 30, hours: 240 },
        { location: 'Work Site', visits: 25, hours: 200 },
        { location: 'Grocery Store', visits: 12, hours: 18 },
        { location: 'Gym', visits: 15, hours: 22 },
        { location: 'Community Center', visits: 8, hours: 16 },
        { location: 'Church', visits: 10, hours: 15 }
    ];

    // Time distribution by category
    const timeDistributionData = [
        { name: 'Home', value: 240, color: '#22c55e' },
        { name: 'Work', value: 200, color: '#3b82f6' },
        { name: 'Essential', value: 18, color: '#fbbf24' },
        { name: 'Recreation', value: 53, color: '#a855f7' }
    ];

    // Location categories breakdown
    const locationCategoryData = [
        { name: 'Residence', value: 30, color: '#22c55e' },
        { name: 'Work', value: 25, color: '#3b82f6' },
        { name: 'Essential Services', value: 12, color: '#fbbf24' },
        { name: 'Recreation', value: 15, color: '#a855f7' },
        { name: 'Religious', value: 10, color: '#ec4899' },
        { name: 'Social', value: 8, color: '#f97316' }
    ];

    // Detailed location tracking records
    const locationRecords = [
        { id: 1, location: 'Home', longitude: '411018', latitude: '122234', entryTime: '10:00 PM', exitTime: '07:00 AM', duration: '9h 0m', date: 'Mon 1 Dec 2024', category: 'Residence', status: 'Compliant' },
        { id: 2, location: 'Construction Site - Phase 2', longitude: '411018', latitude: '122234', entryTime: '08:00 AM', exitTime: '05:00 PM', duration: '9h 0m', date: 'Mon 1 Dec 2024', category: 'Work', status: 'Compliant' },
        { id: 3, location: 'BigMart Supermarket', longitude: '411018', latitude: '122234', entryTime: '06:00 PM', exitTime: '07:15 PM', duration: '1h 15m', date: 'Mon 1 Dec 2024', category: 'Essential', status: 'Compliant' },
        { id: 4, location: 'Home', longitude: '411018', latitude: '122234', entryTime: '08:00 PM', exitTime: '06:30 AM', duration: '10h 30m', date: 'Mon 1 Dec 2024', category: 'Residence', status: 'Compliant' },

        { id: 5, location: 'Fitness First Gym', longitude: '411018', latitude: '122234', entryTime: '06:30 AM', exitTime: '07:45 AM', duration: '1h 15m', date: 'Tue 2 Dec 2024', category: 'Recreation', status: 'Compliant' },
        { id: 6, location: 'Construction Site - Phase 2', longitude: '411018', latitude: '122234', entryTime: '09:00 AM', exitTime: '06:00 PM', duration: '9h 0m', date: 'Tue 2 Dec 2024', category: 'Work', status: 'Compliant' },
        { id: 7, location: 'Community Center', longitude: '411018', latitude: '122234', entryTime: '07:00 PM', exitTime: '09:00 PM', duration: '2h 0m', date: 'Tue 2 Dec 2024', category: 'Social', status: 'Compliant' },
        { id: 8, location: 'Home', longitude: '411018', latitude: '122234', entryTime: '09:30 PM', exitTime: '07:00 AM', duration: '9h 30m', date: 'Tue 2 Dec 2024', category: 'Residence', status: 'Compliant' },


    ];

    const totalLocations = locationVisitData.length;
    const totalVisits = locationVisitData.reduce((sum, loc) => sum + loc.visits, 0);
    const totalHours = locationVisitData.reduce((sum, loc) => sum + loc.hours, 0);
    const [keyword, setKeyword] = useState("");
    const [fromDate, setFromDate] = useState("");  // e.g. "2024-12-02"
    const [toDate, setToDate] = useState("");      // e.g. "2024-12-05"
    const [fromTime, setFromTime] = useState("");  // e.g. "08:00"
    const [toTime, setToTime] = useState("");      // e.g. "18:00"



    const getCategoryColor = (category) => {
        switch (category) {
            case 'Work': return '#dbeafe';
            case 'Residence': return '#d1fae5';
            case 'Recreation': return '#fef3c7';
            case 'Essential': return '#e0e7ff';
            case 'Religious': return '#fce7f3';
            case 'Social': return '#fed7aa';
            case 'Restricted': return '#fecaca';
            default: return '#f3f4f6';
        }
    };

    const filteredLogs = locationRecords.filter(item => {
        const matchesKeyword = item.location.toLowerCase().includes(keyword.toLowerCase());

        // Parse date strings correctly by removing weekday name
        const itemDate = new Date(item.date.replace(/^\w+\s/, ''));
        const fromD = fromDate ? new Date(fromDate) : null;
        const toD = toDate ? new Date(toDate) : null;

        const afterFromDate = fromD ? itemDate >= fromD : true;
        const beforeToDate = toD ? itemDate <= toD : true;

        // Time filtering logic (same as before)
        function timeToMinutes(t) {
            if (!t) return null;
            const [time, modifier] = t.split(' ');
            let [hours, minutes] = time.split(':').map(Number);
            if (modifier) {
                if (modifier.toUpperCase() === 'PM' && hours < 12) hours += 12;
                if (modifier.toUpperCase() === 'AM' && hours === 12) hours = 0;
            }
            return hours * 60 + minutes;
        }

        function timeHMToMinutes(t) {
            if (!t) return null;
            const [hours, minutes] = t.split(':').map(Number);
            return hours * 60 + minutes;
        }

        const itemTime = timeToMinutes(item.entryTime);
        const fromT = timeHMToMinutes(fromTime);
        const toT = timeHMToMinutes(toTime);

        const afterFromTime = fromT !== null ? itemTime >= fromT : true;
        const beforeToTime = toT !== null ? itemTime <= toT : true;

        return matchesKeyword && afterFromDate && beforeToDate && afterFromTime && beforeToTime;
    });


    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#334155', padding: '24px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ maxWidth: '1800px', margin: '0 auto' }}>

                {/* Header - Parolee Profile */}
                <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', marginBottom: '24px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '24px' }}>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'start' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                backgroundColor: '#3b82f6',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <User color="white" size={40} />
                            </div>
                            <div>
                                <h1 style={{ color: 'white', fontSize: '28px', fontWeight: 'bold', margin: '0 0 8px 0' }}>{parolee.name}</h1>
                                <div style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '12px' }}>
                                    <div>Parolee ID: <span style={{ color: 'white', fontWeight: '500' }}>{parolee.id}</span></div>
                                    <div>Parole Officer: <span style={{ color: 'white', fontWeight: '500' }}>{parolee.officer}</span></div>
                                    <div>Start Date: <span style={{ color: 'white', fontWeight: '500' }}>{parolee.startDate}</span></div>
                                </div>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '6px 16px',
                                    borderRadius: '6px',
                                    backgroundColor: '#22c55e',
                                    color: 'white',
                                    fontSize: '14px',
                                    fontWeight: '600'
                                }}>
                                    <CheckCircle size={18} />
                                    {parolee.status}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                            <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '8px', textAlign: 'center', minWidth: '140px' }}>
                                <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Total Check-ins</div>
                                <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>{parolee.checkIns}</div>
                            </div>
                            <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '8px', textAlign: 'center', minWidth: '140px' }}>
                                <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Violations</div>
                                <div style={{ color: '#22c55e', fontSize: '24px', fontWeight: 'bold' }}>{parolee.violations}</div>
                            </div>
                            <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '8px', textAlign: 'center', minWidth: '140px' }}>
                                <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Restricted Zones</div>
                                <div style={{ color: '#22c55e', fontSize: '24px', fontWeight: 'bold' }}>{parolee.restrictedZoneEntries}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <MapPin color="#3b82f6" size={28} />
                            <span style={{ color: '#94a3b8', fontSize: '13px' }}>Total Locations</span>
                        </div>
                        <div style={{ color: 'white', fontSize: '36px', fontWeight: 'bold' }}>{totalLocations}</div>
                        <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>Unique places visited</div>
                    </div>

                    <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <Navigation color="#22c55e" size={28} />
                            <span style={{ color: '#94a3b8', fontSize: '13px' }}>Total Visits</span>
                        </div>
                        <div style={{ color: 'white', fontSize: '36px', fontWeight: 'bold' }}>{totalVisits}</div>
                        <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>Location entries logged</div>
                    </div>

                    <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <Clock color="#fbbf24" size={28} />
                            <span style={{ color: '#94a3b8', fontSize: '13px' }}>Total Hours</span>
                        </div>
                        <div style={{ color: 'white', fontSize: '36px', fontWeight: 'bold' }}>{totalHours}h</div>
                        <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>Time tracked at locations</div>
                    </div>

                    <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <AlertCircle color="#22c55e" size={28} />
                            <span style={{ color: '#94a3b8', fontSize: '13px' }}>Compliance Rate</span>
                        </div>
                        <div style={{ color: '#22c55e', fontSize: '36px', fontWeight: 'bold' }}>100%</div>
                        <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>All rules followed</div>
                    </div>
                </div>

                {/* Charts Section */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '24px' }}>

                    {/* Location Visits Chart */}
                    <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                        <div style={{ backgroundColor: '#f97316', color: 'white', padding: '8px 16px', borderRadius: '6px', display: 'inline-block', marginBottom: '16px', fontSize: '14px', fontWeight: '600' }}>
                            Visits & Hours by Location
                        </div>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={locationVisitData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                                <XAxis dataKey="location" stroke="#94a3b8" style={{ fontSize: '10px' }} angle={-45} textAnchor="end" height={80} />
                                <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', fontSize: '12px' }} />
                                <Legend wrapperStyle={{ fontSize: '11px' }} />
                                <Bar dataKey="visits" fill="#3b82f6" name="Visits" />
                                <Bar dataKey="hours" fill="#22c55e" name="Hours" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Time Distribution */}
                    <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                        <div style={{ backgroundColor: '#f97316', color: 'white', padding: '8px 16px', borderRadius: '6px', display: 'inline-block', marginBottom: '16px', fontSize: '14px', fontWeight: '600' }}>
                            Time Distribution
                        </div>
                        <ResponsiveContainer width="100%" height={220}>
                            <PieChart>
                                <Pie
                                    data={timeDistributionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={85}
                                    paddingAngle={2}
                                    dataKey="value"
                                    label={({ name, value }) => `${name}: ${value}h`}
                                    labelStyle={{ fontSize: '11px', fontWeight: '600' }}
                                >
                                    {timeDistributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Location Categories */}
                    <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                        <div style={{ backgroundColor: '#f97316', color: 'white', padding: '8px 16px', borderRadius: '6px', display: 'inline-block', marginBottom: '16px', fontSize: '14px', fontWeight: '600' }}>
                            Location Categories
                        </div>
                        <ResponsiveContainer width="100%" height={220}>
                            <PieChart>
                                <Pie
                                    data={locationCategoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={85}
                                    paddingAngle={2}
                                    dataKey="value"
                                    label={({ name, value }) => `${value}`}
                                    labelStyle={{ fontSize: '12px', fontWeight: '600' }}
                                >
                                    {locationCategoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ color: 'white', fontSize: '11px', marginTop: '8px', textAlign: 'center', lineHeight: '1.6' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                                {locationCategoryData.map((cat, idx) => (
                                    <div key={idx}>
                                        <span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: cat.color, marginRight: '4px', borderRadius: '2px' }}></span>
                                        {cat.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Location Tracking Table */}


                <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                    <div style={{ backgroundColor: '#f97316', color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: '18px', fontWeight: '600' }}>Complete Location Tracking History</div>
                            <div style={{ fontSize: '13px', marginTop: '4px', opacity: 0.9 }}>All location visits with entry/exit times and duration</div>
                        </div>
                        <div style={{ fontSize: '14px', backgroundColor: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '6px' }}>
                            Total Records: {locationRecords.length}
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            gap: '12px',
                            marginBottom: '10px',
                            marginTop: '10px',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Search keyword..."
                            value={keyword}
                            onChange={e => setKeyword(e.target.value)}
                            style={{
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                fontSize: '14px',
                                minWidth: '180px',
                                flexGrow: 1,
                            }}
                        />
                        <input
                            type="date"
                            value={fromDate}
                            onChange={e => setFromDate(e.target.value)}
                            style={{
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                fontSize: '14px',
                                minWidth: '150px',
                            }}
                        />
                        <input
                            type="date"
                            value={toDate}
                            onChange={e => setToDate(e.target.value)}
                            style={{
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                fontSize: '14px',
                                minWidth: '150px',
                            }}
                        />
                        <input
                            type="time"
                            value={fromTime}
                            onChange={e => setFromTime(e.target.value)}
                            style={{
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                fontSize: '14px',
                                minWidth: '110px',
                            }}
                        />
                        <input
                            type="time"
                            value={toTime}
                            onChange={e => setToTime(e.target.value)}
                            style={{
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                fontSize: '14px',
                                minWidth: '110px',
                            }}
                        />
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#334155', color: 'white' }}>
                                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600', fontSize: '12px' }}>Location Name</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600', fontSize: '12px' }}>Longitude</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600', fontSize: '12px' }}>latitude</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600', fontSize: '12px' }}>Entry Time</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600', fontSize: '12px' }}>Exit Time</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600', fontSize: '12px' }}>Time Spent</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600', fontSize: '12px' }}>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLogs.map((location) => (
                                    <tr key={location.id} style={{ backgroundColor: getCategoryColor(location.category), borderBottom: '1px solid #475569' }}>
                                        <td style={{ padding: '12px 16px', fontWeight: '600', fontSize: '13px' }}>{location.location}</td>
                                        <td style={{ padding: '12px 16px', fontSize: '12px' }}>{location.longitude}</td>
                                        <td style={{ padding: '12px 16px', fontSize: '12px' }}>{location.latitude}</td>
                                        <td style={{ padding: '12px 16px', fontWeight: '500' }}>{location.entryTime}</td>
                                        <td style={{ padding: '12px 16px', fontWeight: '500' }}>{location.exitTime}</td>
                                        <td style={{ padding: '12px 16px', fontWeight: '700', color: '#059669', fontSize: '13px' }}>{location.duration}</td>
                                        <td style={{ padding: '12px 16px', fontSize: '12px' }}>{location.date}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}