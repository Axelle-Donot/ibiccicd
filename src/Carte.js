import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react"
import L from "leaflet"

const FranceMap = () => {
  const [stations, setStations] = useState([])
  const [city, setCity] = useState("Alès") // Ville par défaut
  const [loading, setLoading] = useState(false) // Indicateur de chargement

  // Fonction pour récupérer les stations en fonction de la ville
  const fetchStationsByCity = (cityName: string) => {
    const API_URL = `https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-carburants-quotidien/records?limit=100&refine=com_arm_name%3A%22${cityName}%22`

    setLoading(true)
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const stationsData = data.results.map((station) => ({
          id: station.id,
          position: [station.geom.lat, station.geom.lon], // Coordonnées de la station
          adresse: station.adresse,
          ville: station.ville,
          prix: station.prix_valeur
            ? `${station.prix_valeur} € (${station.prix_nom})`
            : "Prix non disponible",
        }))
        setStations(stationsData)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Erreur de chargement:", error)
        setLoading(false)
      })
  }

  // Effect pour charger les stations initiales (ville par défaut)
  useEffect(() => {
    fetchStationsByCity(city)
  }, [city])

  // Définition d'un point rouge personnalisé
  const redDotIcon = L.divIcon({
    className: "custom-marker",
    html: '<div style="width: 10px; height: 10px; background-color: red; border-radius: 50%;"></div>',
    iconSize: [10, 10],
  })

  // Gestion de la soumission du formulaire de recherche
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchStationsByCity(city)
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Carte des Stations-Service</h2>

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
        Paris, Lyon et Marseille non disponible
      </small>

      {/* Affichage de la carte */}
      <div
        style={{
          width: "300px",
          height: "400px",
          margin: "10px auto 0",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <MapContainer
          center={[46.603354, 1.888334]}
          zoom={6}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {stations.map((station) => (
            <Marker
              key={station.id}
              position={station.position}
              icon={redDotIcon}
            >
              <Popup>
                <strong>{station.adresse}</strong> <br />
                {station.ville} <br />⛽ {station.prix}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}

export default FranceMap
