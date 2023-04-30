import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <form action="/upload" method="POST" enctype="multipart/form-data">
          <input type="file" name="image" />
          <button type="submit">Upload</button>
        </form>
      </header>
    </div>
  );
}

export default App;
