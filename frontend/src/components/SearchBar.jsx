function SearchBar({ city, setCity, onSearch, onLocation }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <div className="buttons">
        <button onClick={onSearch}>Search</button>
        <button onClick={onLocation}>Use My Location</button>
      </div>
    </div>
  );
}

export default SearchBar;
