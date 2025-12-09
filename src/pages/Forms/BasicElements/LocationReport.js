// import React, { useEffect } from "react";
// import axios from "axios";
// import $ from 'jquery';
// import 'datatables.net-dt/js/dataTables.dataTables';
// import 'datatables.net-dt/css/jquery.dataTables.min.css';

// import 'datatables.net-buttons/js/dataTables.buttons.js';
// import 'datatables.net-buttons/js/buttons.html5.js';
// import 'datatables.net-buttons/js/buttons.print.js';
// import 'datatables.net-buttons-dt/css/buttons.dataTables.min.css';

// import jszip from "jszip";
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";


// function LocationReport() {
//   useEffect(() => {
//     axios
//       .get("http://localhost/Police_Duty_Managemment/Controller/getall_location.php")
//       .then((res) => {
//         if (res.data.status === true) {
//           const tableData = res.data.data.map((item) => [
//             item.id,
//             item.location_name,
//             item.location_type,
//             item.address,
//             item.radius,
//             item.status
//           ]);

//           $("#locationTable").DataTable({
//             data: tableData,
//             columns: [
//               { title: "ID" },
//               { title: "Location Name" },
//               { title: "Type" },
//               { title: "Address" },
//               { title: "Radius" },
//               { title: "Status" }
//             ],
//             destroy: true,
//             dom: "Bfrtip",
//             buttons: ["copy", "csv", "excel", "pdf", "print"]
//           });
//         }
//       });
//   }, []);

//   return (
//     <div className="container mt-4">
//       <h3>📍 Location Report</h3>
//       <table id="locationTable" className="display" width="100%"></table>
//     </div>
//   );
// }

// export default LocationReport;
