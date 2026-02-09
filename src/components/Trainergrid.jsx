import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios"
let url = "http://localhost:3000/admin/registration/2"

const columns = [
  // { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", flex: 1, minWidth: 180 },
  { field: "email", headerName: "Email", flex: 1.2, minWidth: 220 },
  { field: "techStack", headerName: "Tech Stack", flex: 1, minWidth: 160 },
  { field: "experience", headerName: "Experience", flex: 1, minWidth: 140 },
  { field: "phone", headerName: "Phone", flex: 1, minWidth: 140 },
];



function Trainergrid() {
  let [trainer,setTrainer]=useState([])
  // let fetchtrainers = async()=>{
  //   let data = await axios.get(url)
  //   setTrainer(data?.data?.data?.map((item,index)=>{
  //           return {...item,id:index +1}
  //       }) || [])
  // }
  
  // useEffect(()=>{fetchtrainers()},[])

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
