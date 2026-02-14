import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import api from "../api";

let url = "admin/registration/2";



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
            data?.data?.map((item) => ({
              ...item,
              id: item.id, // ✅ Use real backend ID (IMPORTANT)
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
      ignore = true;
    };
  }, []);

  // ✅ Delete Handler
  const handleDelete = async (row) => {
    try {
      await api.delete(`admin/registration/${row.id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      // Remove deleted row from UI
      setTrainer((prev) => prev.filter((item) => item.id !== row.id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // ✅ Columns (Delete Column Added)
  const columns = [
    { field: "firstName", headerName: "First Name", flex: 1, minWidth: 180 },
    { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 180 },
    { field: "email", headerName: "Email", flex: 1.2, minWidth: 220 },
    { field: "techStack", headerName: "Tech Stack", flex: 1, minWidth: 160 },
    { field: "experience", headerName: "Experience", flex: 1, minWidth: 140 },
    { field: "phoneNumber", headerName: "Phone", flex: 1, minWidth: 140 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleDelete(params.row)}
        >
          Delete
        </Button>
      ),
    },
  ];

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
