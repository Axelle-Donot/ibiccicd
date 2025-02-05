test('GET /feature2/suzuki should return valid JSON', async () => {
    const brand = 'suzuki';
    const apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/${brand}?format=json`;
  
    const response = await fetch(apiUrl);
    const data = await response.json();
  
    expect(data).toHaveProperty('Results');
    expect(Array.isArray(data.Results)).toBe(true);
  });
  