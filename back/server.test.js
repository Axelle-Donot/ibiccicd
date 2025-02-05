test('GET /feature2/suzuki should return valid JSON', async () => {
    const brand = 'suzuki';
    const apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/${brand}?format=json`;
  
    const response = await fetch(apiUrl);
    const data = await response.json();
  
    expect(data).toHaveProperty('Results');
    expect(Array.isArray(data.Results)).toBe(true);
  });

  test('GET /feature1/Leucate should return valid JSON', async () => {
    const cityName = 'Leucate';
    const apiUrl = `https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-carburants-quotidien/records?limit=100&refine=com_arm_name%3A%22${cityName}%22`;
  
    const response = await fetch(apiUrl);
    const data = await response.json();
  
    expect(data).toHaveProperty('results');  // changed to 'results'
  expect(Array.isArray(data.results)).toBe(true);  // changed to 'results'
  });
  