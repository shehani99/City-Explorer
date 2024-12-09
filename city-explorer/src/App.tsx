import React, { useState, useEffect } from "react";
import ListGroup from "./ListGroup";

// Type definition for a city
interface City {
  name: string;
  description: string;
}

const App: React.FC = () => {
  // Initial cities with name and description
  const initialCities: City[] = [
    { name: "Colombo", description: "The commercial capital of Sri Lanka." },
    { name: "Kandy", description: "Known for the Temple of the Tooth Relic." },
    { name: "Galle", description: "Famous for its Dutch Fort and scenic views." },
  ];

  // Load cities from Local Storage if available
  const loadCitiesFromLocalStorage = (): City[] => {
    const storedCities = localStorage.getItem("cities");
    return storedCities ? JSON.parse(storedCities) : initialCities;
  };

  // State for managing cities, search query, selected city, and new city input
  const [cities, setCities] = useState<City[]>(loadCitiesFromLocalStorage());
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Set state for selected city and new city form input
  const [selectedCity, setSelectedCity] = useState<number | null>(null);
  const [newCityName, setNewCityName] = useState<string>("");
  const [newCityDescription, setNewCityDescription] = useState<string>("");

  // Save cities to Local Storage whenever cities state changes
  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  // Filter cities based on search query
  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle city click event to set the selected city
  const handleCityClick = (index: number): void => {
    setSelectedCity(index);
  };

  // Handle adding a new city to the list
  const handleAddCity = (): void => {
    if (newCityName && newCityDescription) {
      const newCity: City = {
        name: newCityName,
        description: newCityDescription,
      };
      setCities((prevCities) => [...prevCities, newCity]); // Add new city
      setNewCityName(""); // Clear input fields after adding
      setNewCityDescription("");
    }
  };

  // Handle resetting the selected city
  const handleResetSelection = (): void => {
    setSelectedCity(null);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">City Explorer</h1>

      {/* Search Bar */}
      <div className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          placeholder="Search for a city"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          className="form-control w-50"
        />
      </div>

      {/* List of Cities */}
      <ListGroup
        items={filteredCities}
        heading="Available Cities"
        onItemClick={(index) => handleCityClick(index)} // Click to select city
        selectedIndex={selectedCity} // Correctly highlights the selected city
      />

      {/* City Description */}
      {selectedCity !== null && (
        <div className="mt-3">
          <h4>Description</h4>
          <p>{filteredCities[selectedCity].description}</p> {/* Display description based on filtered list */}
        </div>
      )}

      {/* Add New City Form */}
      <div className="card mt-4 p-3">
        <h3>Add a New City</h3>
        <div className="mb-3">
          <input
            type="text"
            placeholder="City Name"
            value={newCityName}
            onChange={(e) => setNewCityName(e.target.value)}
            className="form-control w-50"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="City Description"
            value={newCityDescription}
            onChange={(e) => setNewCityDescription(e.target.value)}
            className="form-control w-50"
          />
        </div>
      </div>

      {/* Add City Button Outside the Form */}
      <div className="d-flex justify-content-center mb-3">
        <button
          onClick={handleAddCity}
          className="btn btn-success"
          style={{
            padding: "0.5rem 1rem", // Adjust padding for consistency
            display: "inline-block",
            margin:"12px",
            width: "auto", // Set button width to auto so it fits content
          }}
        >
          Add City
        </button>
      </div>

      {/* Reset Selection Button */}
      <div className="d-flex justify-content-center mb-3">
        <button
          onClick={handleResetSelection}
          className="btn btn-danger"
          style={{
            padding: "0.5rem 1rem", // Set padding to make it look consistent
            display: "inline-block",
            width: "auto", // Set width to auto for proper fit
          }}
        >
          Reset City Selection
        </button>
      </div>
    </div>
  );
};

export default App;
