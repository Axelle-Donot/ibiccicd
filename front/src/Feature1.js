import { useEffect, useState } from "react";

const Feature1 = () => {
  const [stations, setStations] = useState([]);
  const [city, setCity] = useState("Alès"); // Ville par défaut
  const [loading, setLoading] = useState(false); // Indicateur de chargement

  // Fonction pour récupérer les stations en fonction de la ville
  const fetchStationsByCity = (cityName) => {
    const API_URL = `http://localhost:5000/feature1/${cityName}`;

    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const stationsData = data.results.map((station) => ({
          id: station.id,
          adresse: station.adresse,
          ville: station.ville,
          prix: station.prix_valeur
            ? `${station.prix_valeur} € (${station.prix_nom})`
            : "Prix non disponible",
        }));
        setStations(stationsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur de chargement:", error);
        setLoading(false);
      });
  };

  // Charger les stations pour la ville par défaut au démarrage
  useEffect(() => {
    fetchStationsByCity(city);
  }, []);

  // Gestion de la soumission du formulaire de recherche
  const handleSearch = (e) => {
    e.preventDefault();
    fetchStationsByCity(city);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Liste des Stations-Service</h2>

      {/* Formulaire de recherche */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Entrez une ville"
          style={{ padding: "5px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "5px 10px" }}>
          Rechercher
        </button>
      </form>

      {/* Message d'information sous l'input */}
      <small style={{ display: "block", marginTop: "5px", color: "#888" }}>
        Pas Paris, Lyon, Marseille
      </small>

      {/* Affichage des stations sous forme de tableau */}
      <div
        style={{
          width: "80%",
          margin: "20px auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {loading ? (
          <p>Chargement des stations...</p>
        ) : stations.length > 0 ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr >
                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
                  Adresse
                </th>
                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
                  Ville
                </th>
                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
                  Prix du Carburant
                </th>
              </tr>
            </thead>
            <tbody>
              {stations.map((station) => (
                <tr key={station.id}>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    {station.adresse}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    {station.ville}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    {station.prix}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucune station trouvée pour cette ville.</p>
        )}
      </div>
    </div>
  );
};

export default Feature1;