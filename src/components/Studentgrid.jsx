import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import api from "../api";
let url = "admin/registration/1"

const columns = [
  // { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First Name", flex: 1, minWidth: 140 },
  { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 140 },
  { field: "email", headerName: "Email", flex: 1.2, minWidth: 200 },
  { field: "support", headerName: "Support", flex: 1, minWidth: 140 },
  { field: "phoneNumber", headerName: "Phone", flex: 1, minWidth: 140 },
];


function Studentgrid() {
  let [student,setStudent]=useState([])
  useEffect(() => {
  let ignore = false;

  const fetchstudents = async () => {
    try {
      const { data } = await api.get(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

      if (!ignore) {
        setStudent(
          data?.data?.map((item, index) => ({
            ...item,
            id: index + 1,
          })) || []
        );
      }
    } catch (err) {
      if (!ignore) {
        console.error(err);
      }
    }
  };

  fetchstudents();

  return () => {
    ignore = true;
  };
}, []);

  return (
    <div style={{ background: "#fff", padding: 16, borderRadius: 10 }}>
      <h2 style={{ marginTop: 0 }}>Student</h2>
      <div style={{ height: 420, width: "100%" }}>
        <DataGrid
          rows={student}
          columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
}

export default Studentgrid;
