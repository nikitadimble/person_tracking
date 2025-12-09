import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";
import 'boxicons/css/boxicons.min.css';

import {
  Card,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";

import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";

const policeStations = [
  { lat: 18.922, lng: 72.833, name: "Colaba Police Station" },
  { lat: 18.925, lng: 72.832, name: "Marine Drive Police Station" },
  { lat: 18.934, lng: 72.827, name: "Tardeo Police Station" },
  { lat: 19.045, lng: 72.865, name: "Ghatkopar Police Station" },
  { lat: 19.103, lng: 72.848, name: "Andheri Police Station" },
  { lat: 19.218, lng: 73.003, name: "Navi Mumbai Police Station" },
];

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 19.0760,
  lng: 72.8777,
};




const ReportPage = () => {
  document.title = "Police Duty Management | Dashboard";
  const [filterText, setFilterText] = useState("");

  // Inline styles
  const styles = `
    .police-dashboard {
      background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
      min-height: 100vh;
     
    }

    .dashboard-header {
      animation: fadeInDown 0.6s ease-out;
    }

    .dashboard-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: #2c3e50;
      letter-spacing: -0.5px;
    }

    .btn-icon {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1.25rem;
      border-radius: 8px;
      font-weight: 500;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .btn-icon:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .stat-card {
      position: relative;
      background: white;
      border-radius: 16px;
      padding: 0.75rem;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(0, 0, 0, 0.04);
      cursor: pointer;
      animation: fadeInUp 0.6s ease-out;
      animation-fill-mode: both;
      height: 100%;
    }

    .stat-card:nth-child(1) { animation-delay: 0.1s; }
    .stat-card:nth-child(2) { animation-delay: 0.2s; }
    .stat-card:nth-child(3) { animation-delay: 0.3s; }
    .stat-card:nth-child(4) { animation-delay: 0.4s; }

    .stat-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
    }

    .stat-card-overlay {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      opacity: 0.03;
      pointer-events: none;
      background: linear-gradient(135deg, transparent 40%, currentColor 100%);
    }

    .stat-card-icon {
      position: absolute;
      top: -10px;
      right: -10px;
      width: 90px;
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-size: 2.5rem;
      opacity: 0.15;
      transition: all 0.3s ease;
    }

    .stat-card:hover .stat-card-icon {
      transform: scale(1.1) rotate(10deg);
      opacity: 0.25;
    }

    .stat-card-primary .stat-card-icon { color: #0d6efd; }
    .stat-card-success .stat-card-icon { color: #198754; }
    .stat-card-danger .stat-card-icon { color: #dc3545; }
    .stat-card-warning .stat-card-icon { color: #ffc107; }

    .stat-card-content {
      position: relative;
      z-index: 2;
    }

    .stat-label {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #6c757d;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      line-height: 1;
    }

    .stat-card-primary .stat-value { color: #0d6efd; }
    .stat-card-success .stat-value { color: #198754; }
    .stat-card-danger .stat-value { color: #dc3545; }
    .stat-card-warning .stat-value { color: #ffc107; }

    .stat-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(0, 0, 0, 0.06);
    }

    .stat-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.35rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .badge-primary {
      background: rgba(13, 110, 253, 0.1);
      color: #0d6efd;
    }

    .badge-success {
      background: rgba(25, 135, 84, 0.1);
      color: #198754;
    }

    .badge-danger {
      background: rgba(220, 53, 69, 0.1);
      color: #dc3545;
    }

    .badge-warning {
      background: rgba(255, 193, 7, 0.1);
      color: #ffc107;
    }

    .stat-time {
      font-size: 0.75rem;
      color: #6c757d;
    }

    .stat-icon-pulse {
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.15; transform: scale(1); }
      50% { opacity: 0.3; transform: scale(1.05); }
    }

    /* Mini Stat Cards */
    .mini-stat-card {
      background: white;
      border-radius: 12px;
      padding: 1.25rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(0, 0, 0, 0.03);
      transition: all 0.3s ease;
      animation: fadeInUp 0.6s ease-out;
      animation-fill-mode: both;
    }

    .mini-stat-card:nth-child(1) { animation-delay: 0.5s; }
    .mini-stat-card:nth-child(2) { animation-delay: 0.6s; }
    .mini-stat-card:nth-child(3) { animation-delay: 0.7s; }
    .mini-stat-card:nth-child(4) { animation-delay: 0.8s; }

    .mini-stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    }

    .mini-stat-icon {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      font-size: 1.5rem;
    }
  .bar-cell {
    height: 18px;
    border-radius: 4px;
  }
  .total-bar { background-color: #4A8BF5; }   /* Blue */
  .present-bar { background-color: #FFB74D; } /* Orange */
  .absent-bar { background-color: #9E9E9E; }  /* Gray */

  .bar-wrapper {
    width: 100%;
    display: flex;
    gap: 3px;
  }
table td, table th {
  white-space: nowrap;
  font-size: 13px;
  padding: 6px;
}
    .bg-info-subtle { background: rgba(13, 202, 240, 0.1); }
    .bg-success-subtle { background: rgba(25, 135, 84, 0.1); }
    .bg-warning-subtle { background: rgba(255, 193, 7, 0.1); }
    .bg-danger-subtle { background: rgba(220, 53, 69, 0.1); }

    .mini-stat-arrow {
      font-size: 1.25rem;
    }

    /* Animations */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .stat-value {
        font-size: 2rem;
      }

      .dashboard-title {
        font-size: 1.5rem;
      }
    }
  `;
  // 🔵 Area Wise Attendance Chart Data
  const barData = {
    labels: ["Airport", "CST", "Andheri", "Bandra", "Borivali", "Juhu", "Antilia", "Dadar", "Chakala", "D.N. Nagar"],
    datasets: [
      {
        label: "Total Emp",
        backgroundColor: "#0d6efd",
        data: [500, 300, 100, 100, 400, 200, 100, 50, 25, 70],
      },
      {
        label: "Present",
        backgroundColor: "#198754",
        data: [480, 280, 90, 95, 395, 190, 90, 45, 25, 69],
      },
      {
        label: "Absent",
        backgroundColor: "#dc3545",
        data: [20, 20, 10, 5, 5, 10, 10, 5, 0, 1],
      },
    ],
  };

  // 🟢 Donut Chart Data
  const donutData = {
    labels: ["Present", "Absent", "Leave"],
    datasets: [
      {
        data: [99.8, 0.1, 0.1],
        backgroundColor: ["#198754", "#dc3545", "#ffc107"],
        hoverOffset: 10,
      },
    ],
  };

 const locations = [
  { name: "Airport", total: 500, present: 480, absent: 20 },
  { name: "CST", total: 300, present: 280, absent: 20 },
  { name: "Andheri Station", total: 100, present: 90, absent: 10 },
  { name: "Bandra", total: 100, present: 95, absent: 5 },
  { name: "Borivali", total: 400, present: 395, absent: 5 },
  { name: "Juhu", total: 200, present: 190, absent: 10 },
  { name: "Antilia", total: 100, present: 90, absent: 10 },
  { name: "Dadar Station", total: 50, present: 45, absent: 5 },
  { name: "Chakala", total: 25, present: 25, absent: 0 },
  { name: "D.N. Nagar", total: 70, present: 69, absent: 1 }
];

  const maxValue = 500;
  return (
    <React.Fragment>
      <style>{styles}</style>
      <UiContent />
      <div className="page-content police-dashboard">
        <Container fluid>
          <div className="dashboard-header mb-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div>
                <h3 className="dashboard-title mb-1">Welcome To Dashboard</h3>
                <p className="text-muted mb-0">Real-time duty management and monitoring</p>
              </div>

            </div>
          </div>

          <CardBody className="p-0">
            <div className="container-fluid">
              {/* Overview Cards */}
              <div className="row g-4 mb-4">

                {/* Total Employee Card */}
                <div className="col-xl-3 col-md-6">
                  <div className="stat-card stat-card-primary">
                    <div className="stat-card-icon">
                      <i className='bx bx-user-circle'></i>
                    </div>
                    <div className="stat-card-content">
                      <h6 className="stat-label">Total Employee</h6>
                      <h2 className="stat-value">10,600</h2>
                      <div className="stat-footer">
                        <span className="stat-badge badge-primary">
                          <i className="bx bx-trending-up"></i> Active Employee
                        </span>
                        <span className="stat-time">Updated Now</span>
                      </div>
                    </div>
                    <div className="stat-card-overlay"></div>
                  </div>
                </div>

                {/* Total Present Card */}
                <div className="col-xl-3 col-md-6">
                  <div className="stat-card stat-card-success">
                    <div className="stat-card-icon">
                      <i className='bx bx-shield'></i>
                    </div>
                    <div className="stat-card-content">
                      <h6 className="stat-label">Total Present</h6>
                      <h2 className="stat-value">5,945</h2>
                      <div className="stat-footer">
                        <span className="stat-badge badge-success">
                          <i className="bx bx-check-circle"></i> 56.1% Present
                        </span>
                        <span className="stat-time">Updated Now</span>
                      </div>
                    </div>
                    <div className="stat-card-overlay"></div>
                  </div>
                </div>

                {/* Total Absent Card */}
                <div className="col-xl-3 col-md-6">
                  <div className="stat-card stat-card-danger">
                    <div className="stat-card-icon">
                      <i className='bx bx-error'></i>
                    </div>
                    <div className="stat-card-content">
                      <h6 className="stat-label">Total Absent</h6>
                      <h2 className="stat-value">1,430</h2>
                      <div className="stat-footer">
                        <span className="stat-badge badge-danger">
                          <i className="bx bx-time"></i> 13.5% Absent
                        </span>
                        <span className="stat-time">Updated Now</span>
                      </div>
                    </div>
                    <div className="stat-card-overlay"></div>
                  </div>
                </div>

                {/* SOS Card */}
                <div className="col-xl-3 col-md-6">
                  <div className="stat-card stat-card-warning">
                    <div className="stat-card-icon stat-icon-pulse">
                      <i className='bx bx-bell'></i>
                    </div>
                    <div className="stat-card-content">
                      <h6 className="stat-label">Active Alerts</h6>
                      <h2 className="stat-value">24</h2>
                      <div className="stat-footer">
                        <span className="stat-badge badge-warning">
                          <i className="bx bx-notification"></i> SOS Signals
                        </span>
                        <span className="stat-time">Live</span>
                      </div>
                    </div>
                    <div className="stat-card-overlay"></div>
                  </div>
                </div>

              </div>

              {/* Charts Row */}
              <div className="row mt-4 mb-5">

                {/* Bar Chart */}
                <div className="col-xl-12 col-lg-7 mb-4">
                  <Card className="shadow-sm">
                    <CardBody>
                      <h5 className="fw-bold mb-3">Area Wise Attendance Report</h5>
                      <Bar data={barData} height={80} />
                      <table className="table table-bordered table-sm mt-3 text-center">
                        <tbody>
                          {/* Row 1: Location Names */}
                          <tr className="table-light">
                            <th></th>
                            {locations.map((loc, i) => (
                              <th key={i}>{loc.name}</th>
                            ))}
                          </tr>

                          {/* Row 2: Total Employees */}
                          <tr>
                            <td><strong>Total Emp</strong></td>
                            {locations.map((loc, i) => (
                              <td key={i}>{loc.total}</td>
                            ))}
                          </tr>

                          {/* Row 3: Present */}
                          <tr>
                            <td><strong>Present</strong></td>
                            {locations.map((loc, i) => (
                              <td key={i}>{loc.present}</td>
                            ))}
                          </tr>

                          {/* Row 4: Absent */}
                          <tr>
                            <td><strong>Absent</strong></td>
                            {locations.map((loc, i) => (
                              <td key={i}>{loc.absent}</td>
                            ))}
                          </tr>
                        </tbody>
                      </table>




                    </CardBody>
                  </Card>
                </div>

             

              </div>


            </div>
          </CardBody>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ReportPage;