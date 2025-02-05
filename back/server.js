const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware CORS pour autoriser le frontend à communiquer avec le backend
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Backend!');
});

app.get('/feature2/:brand', async (req,res) =>{
  const { brand } = req.params;
  const apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/${brand}?format=json`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data); // Renvoie la réponse de l'API externe
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'appel à l'API externe" });
  }
});
app.get('/feature1/:cityName', async (req,res) =>{
  const { cityName } = req.params;

  const apiUrl = `https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-carburants-quotidien/records?limit=100&refine=com_arm_name%3A%22${cityName}%22`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data); // Renvoie la réponse de l'API externe
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'appel à l'API externe" });
  }
});


app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});
