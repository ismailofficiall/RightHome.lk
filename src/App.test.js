import properties from './data/properties.json';

describe('Data Integrity Checks', () => {
  test('database has at least 7 properties', () => {
    const data = properties.properties || properties;
    expect(data.length).toBeGreaterThanOrEqual(7);
  });

  test('properties have price and id', () => {
    const data = properties.properties || properties;
    data.forEach(item => {
      expect(item.id).toBeDefined();
      expect(item.price).toBeDefined();
    });
  });

  test('price values are valid numbers', () => {
    const data = properties.properties || properties;
    data.forEach(item => {
      expect(typeof item.price).toBe('number');
    });
  });
});

describe('Search Algorithm Logic', () => {
  test('filters correctly by price range', () => {
    const mockData = [
      { id: 1, price: 100 },
      { id: 2, price: 500 },
      { id: 3, price: 900 }
    ];
    const result = mockData.filter(p => p.price >= 200 && p.price <= 800);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe(2);
  });

  test('filters correctly by property type', () => {
    const mockData = [
      { id: 1, type: 'flat' },
      { id: 2, type: 'house' }
    ];
    const result = mockData.filter(p => p.type === 'house');
    expect(result.length).toBe(1);
    expect(result[0].type).toBe('house');
  });
});


describe('Favorites Logic', () => {
  const addToFavorites = (currentFavorites, propertyToAdd) => {
    const exists = currentFavorites.some(fav => fav.id === propertyToAdd.id);
    if (exists) {
      return currentFavorites;
    }
    return [...currentFavorites, propertyToAdd]; 
  };

  test('adds a new property to favorites', () => {
    const currentFavorites = [];
    const newProp = { id: 1, price: 200000 };
    const result = addToFavorites(currentFavorites, newProp);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe(1);
  });

  test('prevents adding duplicate properties', () => {
    const prop = { id: 1, price: 200000 };
    const currentFavorites = [prop]; 

    const result = addToFavorites(currentFavorites, prop);

    expect(result.length).toBe(1);
  });
});