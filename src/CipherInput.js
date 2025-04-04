/*SUBHAJIT MASANTA 23BCE0292*/
import React from "react"; function CipherInput({ cipher, setCipher }) {
  return (
    <div className="cipher-input">
      <select
        value={cipher.type}
        onChange={(e) => setCipher({ ...cipher, type: e.target.value })}
      >
        <option value="caesar">Caesar Cipher</option>
        <option value="morse">Morse Code</option>
        <option value="base64">Base64</option>
        <option value="secword">Secret Word</option>
      </select>
      {cipher.type === "caesar" && (
        <input
          type="number"
          className="shift-input"
          value={cipher.shift}
          onChange={(e) => setCipher({ ...cipher, shift: e.target.value })} /*SUBHAJIT MASANTA 23BCE0292*/
          placeholder="Shift"
          min="1"
          max="25"
        />
      )}
      {cipher.type === "secword" && (
        <input
          type="text"
          className="shift-input"
          value={cipher.secretWord}
          onChange={(e) => setCipher({ ...cipher, secretWord: e.target.value })}
          placeholder="Secret Word"
        />
      )}
    </div>
  );
} export default CipherInput;
/*SUBHAJIT MASANTA 23BCE0292*/
