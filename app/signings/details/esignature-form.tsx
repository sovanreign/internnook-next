// components/DigitalSignatureForm.tsx

import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

// Define a type for each signer
interface Signer {
  name: string;
  email: string;
}

// Define a type for the docuSeal API response (adjust fields as needed)
interface DocuSealResponse {
  id: string;
  status: string;
  // Add other properties that the API returns if necessary
}

const DigitalSignatureForm: React.FC = () => {
  const [documentId, setDocumentId] = useState<string>("");
  const [signers, setSigners] = useState<Signer[]>([{ name: "", email: "" }]);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<DocuSealResponse | null>(null);
  const [error, setError] = useState<string>("");

  // Handler to add another signer
  const handleAddSigner = (): void => {
    setSigners((prev) => [...prev, { name: "", email: "" }]);
  };

  // Handler for updating signer information
  const handleSignerChange = (
    index: number,
    field: keyof Signer,
    value: string
  ): void => {
    const updatedSigners = [...signers];
    updatedSigners[index][field] = value;
    setSigners(updatedSigners);
  };

  // Handle form submission and call the docuSeal API directly from the client
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    const payload = {
      document_id: documentId,
      signers: signers.map((signer, index) => ({
        name: signer.name,
        email: signer.email,
        order: index + 1, // optional signing order for sequential signing
      })),
      callback_url: process.env.NEXT_PUBLIC_DOCUSEAL_CALLBACK_URL,
    };

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DOCUSEAL_API_KEY}`,
      };

      const response = await axios.post<DocuSealResponse>(
        `${process.env.NEXT_PUBLIC_DOCUSEAL_API_BASE_URL}/signatureRequests`,
        payload,
        { headers }
      );

      setResult(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("docuSeal API error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "600px", margin: "2rem auto" }}
    >
      <h2>Initiate Digital Signature Process</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="documentId">
          Document ID:
          <input
            id="documentId"
            type="text"
            value={documentId}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDocumentId(e.target.value)
            }
            required
            style={{ marginLeft: "0.5rem" }}
          />
        </label>
      </div>

      {signers.map((signer, index) => (
        <div
          key={index}
          style={{
            marginBottom: "1rem",
            border: "1px solid #ccc",
            padding: "1rem",
          }}
        >
          <h4>Signer {index + 1}</h4>
          <div style={{ marginBottom: "0.5rem" }}>
            <label htmlFor={`signer-name-${index}`}>
              Name:
              <input
                id={`signer-name-${index}`}
                type="text"
                value={signer.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSignerChange(index, "name", e.target.value)
                }
                required
                style={{ marginLeft: "0.5rem" }}
              />
            </label>
          </div>
          <div>
            <label htmlFor={`signer-email-${index}`}>
              Email:
              <input
                id={`signer-email-${index}`}
                type="email"
                value={signer.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSignerChange(index, "email", e.target.value)
                }
                required
                style={{ marginLeft: "0.5rem" }}
              />
            </label>
          </div>
        </div>
      ))}

      <div style={{ marginBottom: "1rem" }}>
        <button type="button" onClick={handleAddSigner}>
          Add Another Signer
        </button>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Send for Signature"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {result && (
        <div>
          <h3>Signature Process Initiated</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </form>
  );
};

export default DigitalSignatureForm;
