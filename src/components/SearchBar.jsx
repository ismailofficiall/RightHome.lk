import React from "react";
// 1. Import the Widget and its CSS
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// FIX: Go up one level to find App.css
import "../App.css"; 

function SearchBar({ filters, setFilters }) {
  
  // Standard handler for text/number inputs
  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // 2. Special handler for the Date Widget
  // The widget returns a Date object, but App.js expects a string "YYYY-MM-DD"
  const handleDateChange = (field, date) => {
    if (!date) {
      handleChange(field, ""); // Handle clearing the date
    } else {
      // Convert Date object to "YYYY-MM-DD" string to match properties.json format
      const dateString = date.toISOString().split('T')[0];
      handleChange(field, dateString);
    }
  };

  return (
    <div className="search-bar">
      <h3>Search Properties</h3>
      
      <div className="search-grid">
        {/* TYPE */}
        <div className="filter-group">
          <label>Type:</label>
          <select
            value={filters.type}
            onChange={(e) => handleChange("type", e.target.value)}
          >
            <option value="any">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        {/* POSTCODE */}
        <div className="filter-group">
          <label>Postcode Area:</label>
          <input
            type="text"
            value={filters.postcode}
            onChange={(e) => handleChange("postcode", e.target.value)}
            placeholder="e.g. Kandy"
          />
        </div>

        {/* PRICE RANGE */}
        <div className="filter-group">
          <label>Min Price (Rs.):</label>
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => handleChange("minPrice", e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>Max Price (Rs.):</label>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => handleChange("maxPrice", e.target.value)}
          />
        </div>

        {/* BEDROOMS */}
        <div className="filter-group">
          <label>Min Beds:</label>
          <input
            type="number"
            min="0"
            value={filters.minBedrooms}
            onChange={(e) => handleChange("minBedrooms", e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>Max Beds:</label>
          <input
            type="number"
            max="10"
            value={filters.maxBedrooms}
            onChange={(e) => handleChange("maxBedrooms", e.target.value)}
          />
        </div>

        {/* --- REACT WIDGETS IMPLEMENTATION --- */}
        
        {/* DATE ADDED AFTER */}
        <div className="filter-group">
          <label>Added After:</label>
          <DatePicker
            selected={filters.dateAfter ? new Date(filters.dateAfter) : null}
            onChange={(date) => handleDateChange("dateAfter", date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select start date"
            className="date-picker-input" 
            isClearable
          />
        </div>

        {/* DATE ADDED BEFORE */}
        <div className="filter-group">
          <label>Added Before:</label>
          <DatePicker
            selected={filters.dateBefore ? new Date(filters.dateBefore) : null}
            onChange={(date) => handleDateChange("dateBefore", date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select end date"
            className="date-picker-input"
            isClearable
          />
        </div>
        
      </div>
    </div>
  );
}

export default SearchBar;