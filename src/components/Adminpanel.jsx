import React, { useState } from "react";
import "./Adminpanel.css";
import StudentGrid from "./Studentgrid";
import TrainerGrid from "./Trainergrid";

function Adminpanel() {
  const [activeTab, setActiveTab] = useState("student"); // ✅ default Student

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">Admin Panel</div>

        <button
          className={`admin-link ${activeTab === "student" ? "active" : ""}`}
          onClick={() => setActiveTab("student")}
        >
          Student
        </button>

        <button
          className={`admin-link ${activeTab === "trainer" ? "active" : ""}`}
          onClick={() => setActiveTab("trainer")}
        >
          Trainer
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        {activeTab === "student" ? <StudentGrid /> : <TrainerGrid />}
      </main>
    </div>
  );
}

export default Adminpanel;
