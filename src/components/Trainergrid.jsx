import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import api from "../api";
let url = "admin/registration/2";

const columns = [
  // { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", flex: 1, minWidth: 180 },
  { field: "email", headerName: "Email", flex: 1.2, minWidth: 220 },
  { field: "techStack", headerName: "Tech Stack", flex: 1, minWidth: 160 },
  { field: "experience", headerName: "Experience", flex: 1, minWidth: 140 },
  { field: "phone", headerName: "Phone", flex: 1, minWidth: 140 },
];

function Trainergrid() {
  let [trainer, setTrainer] = useState([]);

  useEffect(() => {
  let ignore = false;

  const fetchtrainers = async () => {
    try {
      const { data } = await api.get(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

      if (!ignore) {
        setTrainer(
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

  fetchtrainers();

  return () => {
    ignore = true; // prevents second strict render update
  };
}, []);

  

  return (
    <div style={{ background: "#fff", padding: 16, borderRadius: 10 }}>
      <h2 style={{ marginTop: 0 }}>Trainer</h2>
      <div style={{ height: 420, width: "100%" }}>
        <DataGrid
          rows={trainer}
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

export default Trainergrid;
