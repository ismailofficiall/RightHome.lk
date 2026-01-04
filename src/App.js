import { useState, useEffect } from "react";
import PropertyList from "./components/PropertyList";
import SearchBar from "./components/SearchBar";
import Favourites from "./components/Favourites";
import { Routes, Route } from "react-router-dom";
import PropertyPage from "./components/PropertyPage";
import propertiesData from "./data/properties.json";
import "./App.css";

function App() {
  const [filters, setFilters] = useState({
    type: "any",
    minPrice: 0,
    maxPrice: 1000000,
    minBedrooms: 0,
    maxBedrooms: 10,
    postcode: "",
    dateAfter: "",
    dateBefore: ""
  });

  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const filteredProperties = propertiesData.properties.filter((property) => {
    const price = Number(property.price);
    const bedrooms = Number(property.bedrooms);
    const propDate = new Date(property.fullDate);

    // Date Logic
    const afterDate = filters.dateAfter ? new Date(filters.dateAfter) : null;
    const beforeDate = filters.dateBefore ? new Date(filters.dateBefore) : null;

    return (
      (filters.type === "any" || property.type === filters.type) &&
      (price >= Number(filters.minPrice)) &&
      (price <= Number(filters.maxPrice)) &&
      (bedrooms >= Number(filters.minBedrooms)) &&
      (bedrooms <= Number(filters.maxBedrooms)) &&
      (filters.postcode === "" || property.postcode.toLowerCase().includes(filters.postcode.toLowerCase())) &&
      (!afterDate || propDate >= afterDate) &&
      (!beforeDate || propDate <= beforeDate)
    );
  });

  const addToFavourites = (property) => {
    setFavourites((prev) => {
      if (prev.find((fav) => fav.id === property.id)) return prev;
      return [...prev, property];
    });
  };

  const removeFromFavourites = (id) => {
    setFavourites((prev) => prev.filter((p) => p.id !== id));
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  return (
    <div className="app-container">
      <header>
        <h1>RightHome.lk</h1>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar filters={filters} setFilters={setFilters} />

              <div className="main-layout">
                <div className="property-list-section">
                  <PropertyList
                    properties={filteredProperties}
                    addToFavourites={addToFavourites}
                  />
                </div>

                <div className="favourites-section">
                  <Favourites
                    favourites={favourites}
                    removeFromFavourites={removeFromFavourites}
                    addToFavourites={addToFavourites}
                    clearFavourites={clearFavourites}
                  />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/property/:id"
          element={<PropertyPage properties={propertiesData.properties} addToFavourites={addToFavourites}/>}
        />
      </Routes>
    </div>
  );
}

export default App;