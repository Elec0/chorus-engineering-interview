import axios from 'axios';

// These tests expect the server to be running with a database that has been seeded with Pokémon data
// FUTURE: The tests should spin up their own test databases and seed them with test data.
describe('GET /api/pokemon', () => {
  it('should return a list of pokemon', async () => {
    const res = await axios.get(`/api/pokemon`);

    expect(res.status).toBe(200);
    expect(res.data.length).toBeGreaterThan(10);
  });
});
