/*SUBHAJIT MASANTA 23BCE0292*/
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CipherInput from "./CipherInput"; function Decoder() {
    const location = useLocation();
    const [encoded, setEncoded] = useState(location.state?.encoded || "");
    const [cipher, setCipher] = useState(location.state?.cipher || { type: "caesar", shift: 3, secretWord: "SPY" });
    const [output, setOutput] = useState("");
    const [status, setStatus] = useState("Idle");

    function decodeMessage() {
        setStatus("Decoding...");
        let result = "";

        if (cipher.type === "caesar") {
            const shift = Number(cipher.shift) || 3;
            for (let i = 0; i < encoded.length; i++) {
                if (encoded[i].match(/[A-Z]/)) {
                    result += String.fromCharCode(((encoded.charCodeAt(i) - 65 - shift + 26) % 26) + 65);
                } else {
                    result += encoded[i];
                }                                   /*SUBHAJIT MASANTA 23BCE0292*/
            }
        } else if (cipher.type === "morse") {
            const morse = {
                ".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E", "..-.": "F", "--.": "G",
                "....": "H", "..": "I", ".---": "J", "-.-": "K", ".-..": "L", "--": "M", "-.": "N",
                "---": "O", ".--.": "P", "--.-": "Q", ".-.": "R", "...": "S", "-": "T", "..-": "U",
                "...-": "V", ".--": "W", "-..-": "X", "-.--": "Y", "--..": "Z", "/": " "
            };
            const words = encoded.split(" ");
            for (let i = 0; i < words.length; i++) {
                result += morse[words[i]] || words[i];
            }
        } else if (cipher.type === "base64") {
            try {
                result = atob(encoded);
            } catch (e) {
                result = "Error: Invalid Base64";
            }
        } else if (cipher.type === "secword") {
            const secretWord = cipher.secretWord ? cipher.secretWord.toUpperCase() : "";
            if (!secretWord) {
                result = "Error: Secret word cannot be empty";
            } else {
                for (let i = 0; i < encoded.length; i++) {
                    if (encoded[i].match(/[A-Z]/)) {
                        const encChar = encoded.charCodeAt(i) - 65; // 0-25
                        const secretChar = secretWord.charCodeAt(i % secretWord.length) - 65;
                        const decodedChar = (encChar - secretChar + 26) % 26;
                        result += String.fromCharCode(decodedChar + 65);
                    } else {
                        result += encoded[i];
                    }
                }
            }
        }
        setOutput(result);
        setTimeout(() => setStatus(result.startsWith("Error") ? "Decoding Failed" : "Decoding Complete"), 500);
    }

    return (
        <div className="page decoder">
            <h2>Message Decoder</h2>
            <p className="cipher-info">
                Crack encrypted transmissions: Caesar, Morse, Base64, or Secret Word.
            </p>
            <textarea
                value={encoded}
                onChange={(e) => setEncoded(e.target.value)}
                placeholder="Paste encoded message here..."
                className="input-field"
            />
            <CipherInput cipher={cipher} setCipher={setCipher} />
            <button onClick={decodeMessage} className="btn">Crack Code</button>
            <div className="output">{output || "Decoded message will appear here..."}</div>
            <p className="status">Status: {status}</p>
            <Link to="/encode">
                <button className="btn switch-btn">Back to Encoder</button>
            </Link>
        </div>
    );

} export default Decoder;
/*SUBHAJIT MASANTA 23BCE0292*/
