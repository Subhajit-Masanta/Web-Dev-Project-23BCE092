/*SUBHAJIT MASANTA 23BCE0292*/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showForgot, setShowForgot] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [forgotName, setForgotName] = useState("");
    const [createName, setCreateName] = useState("");
    const [forgotResult, setForgotResult] = useState("");
    const [createResult, setCreateResult] = useState("");
    const [agentCredentials, setAgentCredentials] = useState(() => {
        const savedCredentials = localStorage.getItem("agentCredentials");
        return savedCredentials
            ? JSON.parse(savedCredentials)
            : { "agent007": "secretmission" };
    });
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("agentCredentials", JSON.stringify(agentCredentials));
    }, [agentCredentials]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (agentCredentials[username] === password) {
            setIsAuthenticated(true);
            setError("");
            navigate("/", { replace: true });
        } else {
            setError("Access Denied: Invalid credentials");
        }
    };

    const handleForgot = () => {
        const trimmedName = forgotName.trim().toUpperCase();
        if (!trimmedName) {
            setForgotResult("Please enter your name");
            return;
        }
        if (trimmedName === "SUBHAJIT" || trimmedName === "SIVA") {
            setForgotResult(
                "Credentials found:\nUsername: agent007\nPassword: secretmission"
            );
        } else {
            setForgotResult("Access Denied: Unauthorized Agent");
        }
        setForgotName("");
    };

    const handleCreateAccount = () => {
        const trimmedName = createName.trim();
        if (!trimmedName) {
            setCreateResult("Please enter your name");
            return;
        }
        const newUsername = `agent${trimmedName.toLowerCase()}`;
        const newPassword = `spy${trimmedName.toLowerCase()}007`;

        if (agentCredentials[newUsername]) {
            setCreateResult("Agent ID already exists! Please try a different name.");
            return;
        }

        setAgentCredentials(prev => ({
            ...prev,
            [newUsername]: newPassword
        }));

        setCreateResult(
            `Agent Registered Successfully!\nUsername: ${newUsername}\nPassword: ${newPassword}`
        );
        setCreateName("");
    };

    return (
        <div className="page login">
            <div className="login-header-box animate-header">
                <span className="spy-icon">🕵️‍♂️</span>
                <h2>Agent Login</h2>
            </div>
            <p className="tagline animate-text">Enter your spy credentials to access the system.</p>

            <div className="login-mission-box animate-section">
                <h3>CLASSIFIED: Mission Briefing</h3>
                <p>Agent, your mission, should you choose to accept it, involves infiltrating the system to secure critical intelligence. Authentication required.</p>
            </div>

            <form onSubmit={handleLogin} className="login-form-box animate-form">
                <div className="input-group">
                    <label className="input-label">Agent ID</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        className="input-field animate-input"
                    />
                </div>
                <div className="input-group">
                    <label className="input-label">Access Code</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="input-field animate-input"
                    />
                </div>
                <button type="submit" className="btn animate-btn">Authenticate</button>
            </form>
            {error && <p className="error animate-error">{error}</p>}

            <div className="login-options-box animate-section">
                <button
                    className="btn forgot-btn animate-btn"
                    onClick={() => {
                        setShowForgot(!showForgot);
                        setShowCreate(false);
                    }}
                >
                    {showForgot ? "Hide Forgot Option" : "Forgot ID and Password?"}
                </button>
                <button
                    className="btn create-btn animate-btn"
                    onClick={() => {
                        setShowCreate(!showCreate);
                        setShowForgot(false);
                    }}/*SUBHAJIT MASANTA 23BCE0292*/
                >
                    {showCreate ? "Hide Create Option" : "Create New Agent"}
                </button>
            </div>

            {showForgot && (
                <div className="login-forgot-box animate-section">
                    <div className="input-group">
                        <label className="input-label">Enter Your Name</label>
                        <input
                            type="text"
                            value={forgotName}
                            onChange={(e) => setForgotName(e.target.value)}
                            placeholder="e.g., Subhajit or Siva"
                            className="input-field animate-input"
                        />
                        <button onClick={handleForgot} className="btn generate-btn animate-btn">
                            Retrieve Credentials
                        </button>
                    </div>
                    {forgotResult && (
                        <div className="forgot-result animate-result">
                            <pre>{forgotResult}</pre>
                        </div>
                    )}
                </div>
            )}

            {showCreate && (
                <div className="login-create-box animate-section">
                    <div className="input-group">
                        <label className="input-label">Enter Agent Name</label>
                        <input
                            type="text"
                            value={createName}
                            onChange={(e) => setCreateName(e.target.value)}
                            placeholder="Enter your name"
                            className="input-field animate-input"
                        />
                        <button onClick={handleCreateAccount} className="btn generate-btn animate-btn">
                            Register Agent
                        </button>
                    </div>
                    {createResult && (
                        <div className="create-result animate-result">
                            <pre>{createResult}</pre>
                        </div>
                    )}
                </div>
            )}

            <div className="login-security-box animate-section">
                <h4>Security Clearance</h4>
                <p>Level: TOP SECRET</p>
                <p>Dirctor: Subhajit Masanta</p>
            </div>

            <div className="scanline"></div>
            <div className="texture-overlay"></div>
        </div>
    );
}

export default Login;
/*SUBHAJIT MASANTA 23BCE0292*/