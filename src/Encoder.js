/*SUBHAJIT MASANTA 23BCE0292*/
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CipherInput from "./CipherInput"; function Encoder() {
    const [message, setMessage] = useState("");
    const [cipher, setCipher] = useState({ type: "caesar", shift: 3, secretWord: "SPY" });
    const [output, setOutput] = useState("");
    const [status, setStatus] = useState("Idle");

    function encodeMessage() {
        setStatus("Transmitting...");
        const text = message.toUpperCase();
        let result = "";

        if (cipher.type === "caesar") {
            const shift = Number(cipher.shift) || 3;
            for (let i = 0; i < text.length; i++) {
                if (text[i].match(/[A-Z]/)) {
                    result += String.fromCharCode(((text.charCodeAt(i) - 65 + shift) % 26) + 65);
                } else {
                    result += text[i];
                }
            }
        } else if (cipher.type === "morse") {
            const morse = {
                A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.",
                H: "....", I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.",
                O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-",
                V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..", " ": "/"
            };
            for (let i = 0; i < text.length; i++) {
                result += (morse[text[i]] || text[i]) + " ";
            }
            result = result.trim();
        } else if (cipher.type === "base64") {
            result = btoa(text);
        } else if (cipher.type === "secword") {
            const secretWord = cipher.secretWord ? cipher.secretWord.toUpperCase() : "";
            if (!secretWord) {
                result = "Error: Secret word cannot be empty";
            } else {
                for (let i = 0; i < text.length; i++) {
                    if (text[i].match(/[A-Z]/)) {
                        const msgChar = text.charCodeAt(i) - 65; /*SUBHAJIT MASANTA 23BCE0292*/
                        const secretChar = secretWord.charCodeAt(i % secretWord.length) - 65;
                        const encodedChar = (msgChar + secretChar) % 26;
                        result += String.fromCharCode(encodedChar + 65);
                    } else {
                        result += text[i];
                    }
                }
            }
        }
        setOutput(result);
        setTimeout(() => setStatus(result.startsWith("Error") ? "Transmission Failed" : "Transmission Complete"), 500);
    }

    return (
        <div className="page encoder">
            <h2>Message Encoder</h2>
            <p className="cipher-info">
                Secure your message with advanced ciphers: Caesar, Morse, Base64, or Secret Word.
            </p>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your secret message..."
                className="input-field"
            />
            <CipherInput cipher={cipher} setCipher={setCipher} />
            <button onClick={encodeMessage} className="btn">Transmit</button>
            <div className="output">{output || "Here is your secret message..."}</div>
            <p className="status">Status: {status}</p>
            <Link to="/decode" state={{ encoded: output, cipher }}>
                <button className="btn switch-btn" disabled={output.startsWith("Error")}>Go to Decoder</button>
            </Link>
        </div>
    );

} export default Encoder;
/*SUBHAJIT MASANTA 23BCE0292*/
