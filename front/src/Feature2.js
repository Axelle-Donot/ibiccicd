import React, { useState } from "react";

const Feature2 = () => {
  const [make, setMake] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVehicleTypes = async () => {
    if (!make) {
      setError("Veuillez entrer une marque.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/${make}?format=json`
      );

      if (!response.ok) throw new Error("Erreur lors de la récupération des données");

      const result = await response.json();
      setData(result.Results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Types de véhicules par marque</h2>
      <input
        type="text"
        value={make}
        onChange={(e) => setMake(e.target.value)}
        placeholder="Entrez une marque (ex: Mercedes)"
      />
      <button onClick={fetchVehicleTypes} disabled={!make}>
        Rechercher
      </button>

      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div>
          <h3>Résultats pour "{make}" :</h3>
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                <strong>{item.VehicleTypeName}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Feature2;
