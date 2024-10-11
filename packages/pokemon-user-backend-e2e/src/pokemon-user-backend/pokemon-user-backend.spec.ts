import axios from 'axios';

// These tests expect the server to be running with a database that has been seeded with Pokémon data
// FUTURE: The tests should spin up their own test databases and seed them with test data.
describe('GET /api/pokemon', () => {
  it('should return a list of pokemon', async () => {
    const res = await axios.get(`/api/pokemon`);

    expect(res.status).toBe(200);
    expect(res.data.length).toBeGreaterThan(10);
  });

  it('should return a specific pokemon', async () => {
    const res = await axios.get(`/api/pokemon/1`);
    // res should be an array with a single pokemon object
    expect(res.status).toBe(200);
    expect(res.data.length).toBe(1);
    expect(res.data[0].id).toBe(1);
    expect(res.data[0].name).toBe('bulbasaur');
    
  });
});
