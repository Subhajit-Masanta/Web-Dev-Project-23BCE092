import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Landing() {
    const [lastTransmission, setLastTransmission] = useState(null);
    const [agentStatus, setAgentStatus] = useState("Active");

    useEffect(() => {
        const previousLogin = localStorage.getItem("lastLoginDate");
        if (previousLogin) {
            setLastTransmission(previousLogin);
        }
        const today = new Date();
        const formattedDate = today.toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short"
        });
        localStorage.setItem("lastLoginDate", formattedDate);

        const statusTimer = setTimeout(() => {
            setAgentStatus("On Mission");
        }, 5000);
        return () => clearTimeout(statusTimer);
    }, []);

    return (
        <div className="page landing-page">
            <header className="app-header">
                <div className="header-content">
                    <span className="spy-icon">🕵️‍♂️</span>
                    <h1>Agent Portal</h1>
                </div>
            </header>
            <div className="landing-container">
                <div className="landing-header animate-header">
                    <h2>Agent Command Center</h2>
                    <div className="status-indicator">
                        <span className={`status-dot ${agentStatus.toLowerCase().replace(" ", "-")}`}></span>
                        <span>Agent Status: {agentStatus}</span>
                    </div>
                </div>

                <div className="mission-box animate-section">
                    <h3>CLASSIFIED: Operation Enigma</h3>
                    <p>
                        Welcome, Agent 007. Your current directive is to secure sensitive communications using state-of-the-art cipher technology. Intelligence reports indicate heightened enemy activity. Proceed with utmost caution and efficiency. This message will not self-destruct, but your discretion is paramount.
                    </p>
                </div>

                <div className="divider animate-section">--- Classified Intelligence ---</div>

                <div className="agent-stats animate-section">
                    <h4>Agent Profile</h4>
                    <div className="stats-grid">
                        <p><strong>Dirctor:</strong> Subhajit Masanta</p>
                        <p><strong>Code Name:</strong> Agent 007</p>
                        <p><strong>Clearance Level:</strong> Top Secret</p>
                        <p><strong>Missions Completed:</strong> 292</p>
                        <p><strong>Active Operations:</strong> 3</p>
                        {lastTransmission && (
                            <p><strong>Last Transmission:</strong> {lastTransmission}</p>
                        )}
                    </div>
                </div>

                <div className="options animate-section">
                    <Link to="/encode">
                        <button className="btn encode-btn animate-btn">Encode Transmission</button>
                    </Link>
                    <Link to="/decode">
                        <button className="btn decode-btn animate-btn">Decode Intelligence</button>
                    </Link>
                </div>

                <div className="security-notice animate-section">
                    <h4>Security Protocol</h4>
                    <p>All actions are monitored. Unauthorized access will trigger immediate lockdown. Report to HQ upon mission completion.</p>
                </div>

                <div className="divider animate-section">--- End of Transmission ---</div>
            </div>
            <div className="scanline"></div>
        </div>
    );
}

export default Landing;