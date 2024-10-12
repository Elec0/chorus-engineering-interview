import axios from 'axios';

// These tests expect the server to be running with a database that has been seeded with Pokémon data
// FUTURE: The tests should spin up their own test databases and seed them with test data.
describe('GET /api/profiles', () => {
  it('should return all profiles', async () => {
    const res = await axios.get(`/api/profiles`);

    expect(res.status).toBe(200);
    // expect(res.data.length).toBeGreaterThan(0);
  });

  describe('GET /api/profiles/:id', () => {
    it('should return a specific profile', async () => {
      // Create a new profile
      const createRes = await axios.post(`/api/profiles`, {
        name: 'Ash Ketchum',
      });

      expect(createRes.status).toBe(201);
      expect(createRes.data.name).toBe('Ash Ketchum');

      // Get the profile by ID
      const res = await axios.get(`/api/profiles/${createRes.data.id}`);

      expect(res.status).toBe(200);
      expect(res.data.name).toBe('Ash Ketchum');

      // Delete the profile
      const deleteRes = await axios.delete(
        `/api/profiles/${createRes.data.id}`
      );

      expect(deleteRes.status).toBe(200);
    });

    it('should return a 404 for a profile that does not exist', async () => {
      let res = null;
      try {
        res = await axios.get(`/api/profiles/99999999`);
      } catch (error) {
        res = error.response;
      } finally {
        expect(res.status).toBe(404);
      }
    });

    describe('GET /api/profiles/:id/pokemon', () => {
      it('should return all Pokémon associated with a profile', async () => {
        // Create a new profile
        const createRes = await axios.post(`/api/profiles`, {
          name: 'Ash Ketchum',
        });

        expect(createRes.status).toBe(201);
        expect(createRes.data.name).toBe('Ash Ketchum');

        // Get all Pokémon associated with the profile
        const pokemonRes = await axios.get(
          `/api/profiles/${createRes.data.id}/pokemon`
        );

        expect(pokemonRes.status).toBe(200);
        expect(pokemonRes.data.length).toBe(0);

        // Delete the profile
        const deleteRes = await axios.delete(
          `/api/profiles/${createRes.data.id}`
        );

        expect(deleteRes.status).toBe(200);
      });

      it('should return a 404 for a profile that does not exist', async () => {
        let res = null;
        try {
          res = await axios.get(`/api/profiles/99999999/pokemon`);
        } catch (error) {
          res = error.response;
        } finally {
          expect(res).not.toBeNull();
          expect(res.status).toBe(404);
        }
      });
    });
  });
});

describe('POST /api/profiles', () => {
  it('should create a new profile, then delete it', async () => {
    // Create a new profile, name is in the request body
    const res = await axios.post(`/api/profiles`, { name: 'Test Profile' });

    console.log(res);
    console.log(res.data);
    expect(res.status).toBe(201);
    expect(res.data.name).toBe('Test Profile');

    // Delete the profile
    const deleteRes = await axios.delete(`/api/profiles/${res.data.id}`);

    console.log(deleteRes);
    expect(deleteRes.status).toBe(200);

    // Check that the profile was deleted
    let getRes = null;
    try {
      getRes = await axios.get(`/api/profiles/${res.data.id}`);
    } catch (error) {
      getRes = error.response;
    } finally {
      expect(getRes.status).toBe(404);
    }
  });
});

describe('PUT /api/profiles/:id/pokemon', () => {
  it('should assign Pokémon to a profile, then delete profile', async () => {
    // Create a new profile
    const createRes = await axios.post(`/api/profiles`, {
      name: 'Test Profile',
    });

    expect(createRes.status).toBe(201);
    expect(createRes.data.name).toBe('Test Profile');

    // Get all Pokémon
    const pokemonRes = await axios.get(`/api/pokemon`);

    expect(pokemonRes.status).toBe(200);
    expect(pokemonRes.data.length).toBeGreaterThan(0);

    // Assign the first 3 Pokémon to the new profile
    const pokemonIds = pokemonRes.data.slice(0, 3).map((pokemon) => pokemon.id);
    const assignRes = await axios.put(
      `/api/profiles/${createRes.data.id}/pokemon`,
      pokemonIds
    );

    expect(assignRes.status).toBe(200);
    expect(assignRes.data.pokemon.length).toBe(3);

    // Delete the profile
    const deleteRes = await axios.delete(`/api/profiles/${createRes.data.id}`);

    expect(deleteRes.status).toBe(200);
  });

  it('should assign Pokémon to a profile, then remove one of the pokemon, then delete the profile', async () => {
    // Create a new profile
    const createRes = await axios.post(`/api/profiles`, {
      name: 'Test Profile',
    });

    expect(createRes.status).toBe(201);
    expect(createRes.data.name).toBe('Test Profile');

    // Get all Pokémon
    const pokemonRes = await axios.get(`/api/pokemon`);

    expect(pokemonRes.status).toBe(200);
    expect(pokemonRes.data.length).toBeGreaterThan(0);

    // Assign the first 3 Pokémon to the new profile
    const pokemonIds = pokemonRes.data.slice(0, 3).map((pokemon) => pokemon.id);
    const assignRes = await axios.put(
      `/api/profiles/${createRes.data.id}/pokemon`,
      pokemonIds
    );

    expect(assignRes.status).toBe(200);
    expect(assignRes.data.pokemon.length).toBe(3);

    // Remove the first Pokémon from the profile
    const removeRes = await axios.put(
      `/api/profiles/${createRes.data.id}/pokemon`,
      pokemonIds.slice(1)
    );

    expect(removeRes.status).toBe(200);
    expect(removeRes.data.pokemon.length).toBe(2);

    // Delete the profile
    const deleteRes = await axios.delete(`/api/profiles/${createRes.data.id}`);

    expect(deleteRes.status).toBe(200);
  });

  it('should not allow more than 6 Pokémon to be assigned to a profile', async () => {
    // Create a new profile
    const createRes = await axios.post(`/api/profiles`, {
      name: 'Test Profile',
    });

    expect(createRes.status).toBe(201);
    expect(createRes.data.name).toBe('Test Profile');

    // Get all Pokémon
    const pokemonRes = await axios.get(`/api/pokemon`);

    expect(pokemonRes.status).toBe(200);
    expect(pokemonRes.data.length).toBeGreaterThan(0);

    // Assign the first 6 Pokémon to the new profile
    const pokemonIds = pokemonRes.data.slice(0, 6).map((pokemon) => pokemon.id);
    const assignRes = await axios.put(
      `/api/profiles/${createRes.data.id}/pokemon`,
      pokemonIds
    );

    expect(assignRes.status).toBe(200);
    expect(assignRes.data.pokemon.length).toBe(6);

    // Try to assign a 7th Pokémon to the profile
    let assign7thRes = null;
    try {
      assign7thRes = await axios.put(`/api/profiles/${createRes.data.id}/pokemon`, [
        pokemonRes.data[6].id,
      ]);
    } catch (error) {
      assign7thRes = error.response;
    } finally {
      console.log(`assign7thRes: ${assign7thRes.status}`);
      expect(assign7thRes.status).not.toBe(200);
      expect(assign7thRes.status).not.toBe(201);
    }

    // Delete the profile
    const deleteRes = await axios.delete(`/api/profiles/${createRes.data.id}`);

    expect(deleteRes.status).toBe(200);
  });
});
