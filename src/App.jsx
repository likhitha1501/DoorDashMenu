import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [transcribing, setTranscribing] = useState(false);
  const [transcribed, setTranscribed] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

  const menuData = [
    {
      id: 1,
      category: "Starters",
      name: "Classic Bruschetta",
      description: "Tomato, basil, garlic and toasted bread",
      price: "$8.00",
    },
    {
      id: 2,
      category: "Starters",
      name: "Garlic Bread",
      description: "Fresh bread with garlic butter and herbs",
      price: "$6.00",
    },
    {
      id: 3,
      category: "Main Course",
      name: "Margherita Pizza",
      description: "Tomato, mozzarella, basil and olive oil",
      price: "$14.00",
    },
    {
      id: 4,
      category: "Main Course",
      name: "Grilled Chicken Pasta",
      description: "Grilled chicken, pasta and creamy herb sauce",
      price: "$17.00",
    },
  ];

  // Load saved items
  useEffect(() => {
    const data = localStorage.getItem("savedMenuItems");

    if (data) {
      setSavedItems(JSON.parse(data));
    }
  }, []);

  // Upload image
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Check image
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    setFileName(file.name);
    setImage(URL.createObjectURL(file));

    setTranscribed(false);
    setTranscribing(false);
    setSelectedItems([]);
  };

  // Remove uploaded image
  const handleRemoveImage = () => {
    setImage(null);
    setFileName("");
    setTranscribed(false);
    setTranscribing(false);
    setSelectedItems([]);
  };

  // Transcribe
  const handleTranscribe = () => {
    if (!image) {
      alert("Please upload a menu image first.");
      return;
    }

    setTranscribing(true);

    setTimeout(() => {
      setTranscribing(false);
      setTranscribed(true);
    }, 1500);
  };

  // Select item
  const handleSelectItem = (item) => {
    setSelectedItems((previous) => {
      const exists = previous.some(
        (selected) => selected.id === item.id
      );

      if (exists) {
        return previous.filter(
          (selected) => selected.id !== item.id
        );
      }

      return [...previous, item];
    });
  };

  // Select all
  const handleSelectAll = () => {
    if (selectedItems.length === menuData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(menuData);
    }
  };

  // Save selected items
  const handleSaveData = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one menu item.");
      return;
    }

    const newItems = selectedItems.filter(
      (item) =>
        !savedItems.some(
          (saved) => saved.id === item.id
        )
    );

    const updatedItems = [
      ...savedItems,
      ...newItems,
    ];

    setSavedItems(updatedItems);

    localStorage.setItem(
      "savedMenuItems",
      JSON.stringify(updatedItems)
    );

    setSelectedItems([]);

    alert("Selected menu items saved successfully!");
  };

  // Remove saved item
  const handleRemoveSavedItem = (id) => {
    const updatedItems = savedItems.filter(
      (item) => item.id !== id
    );

    setSavedItems(updatedItems);

    localStorage.setItem(
      "savedMenuItems",
      JSON.stringify(updatedItems)
    );
  };

  // Clear saved data
  const handleClearSavedData = () => {
    if (
      window.confirm(
        "Are you sure you want to delete all saved data?"
      )
    ) {
      setSavedItems([]);
      localStorage.removeItem("savedMenuItems");
    }
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div className="brand">
          <div className="logo">D</div>

          <div>
            <h1>DoorDash</h1>
            <span>Ops Product Details</span>
          </div>
        </div>

        <div className="technology">
          <span>Technology</span>
          <strong>Generative AI & LLM</strong>
        </div>
      </header>

      <main className="container">

        {/* HERO */}
        <section className="hero">
          <div className="tag">
            OPS PRODUCT DETAILS
          </div>

          <h2>
            Using LLM to Transcribe Restaurant Menu Photos
          </h2>

          <p>
            Upload a restaurant menu image and convert
            the content into structured text using
            Generative AI and Large Language Models.
          </p>
        </section>

        {/* WORKSPACE */}
        <section className="workspace">

          {/* UPLOAD CARD */}
          <div className="card upload-card">

            <div className="card-header">
              <div>
                <h3>Restaurant Menu</h3>
                <p>
                  Upload a menu photo to begin transcription.
                </p>
              </div>

              <span className="status">
                AI TRANSCRIPTION
              </span>
            </div>

            {/* NO IMAGE */}
            {!image ? (

              <label className="upload-area">

                <div className="upload-icon">
                  ⬆
                </div>

                <h4>
                  Upload menu image
                </h4>

                <p>
                  Click the button below to choose
                  a menu photo from your computer.
                </p>

                <span className="file-types">
                  JPG, JPEG, PNG or WEBP
                </span>

                {/* UPLOAD BUTTON */}
                <span className="upload-button">
                  📷 Upload Image
                </span>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  hidden
                />

              </label>

            ) : (

              /* IMAGE PREVIEW */
              <div className="preview-area">

                <div className="image-preview">
                  <img
                    src={image}
                    alt="Uploaded restaurant menu"
                  />
                </div>

                <div className="file-info">

                  <strong>
                    {fileName}
                  </strong>

                  <span>
                    Image uploaded successfully
                  </span>

                </div>

                <div className="upload-actions">

                  <label className="another-image-button">
                    📷 Upload Another Image

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleFileChange}
                      hidden
                    />
                  </label>

                  <button
                    className="remove-image-button"
                    onClick={handleRemoveImage}
                  >
                    Remove Image
                  </button>

                  <button
                    className="transcribe-button"
                    onClick={handleTranscribe}
                    disabled={transcribing}
                  >
                    {transcribing
                      ? "Transcribing..."
                      : "Transcribe Menu"}
                  </button>

                </div>

              </div>
            )}

          </div>

          {/* TRANSCRIPTION RESULT */}
          <div className="card result-card">

            <div className="card-header">

              <div>
                <h3>
                  Transcription Output
                </h3>

                <p>
                  Structured content generated from
                  the uploaded menu image.
                </p>
              </div>

              {transcribed && (
                <span className="success">
                  COMPLETED
                </span>
              )}

            </div>

            {!transcribed ? (

              <div className="empty-state">

                <div className="document-icon">
                  ▤
                </div>

                <h4>
                  No transcription yet
                </h4>

                <p>
                  Upload a restaurant menu image
                  and click
                  <strong> Transcribe Menu</strong>.
                </p>

              </div>

            ) : (

              <div className="transcription">

                {/* SELECT ALL */}
                <div className="selection-toolbar">

                  <label>
                    <input
                      type="checkbox"
                      checked={
                        selectedItems.length ===
                        menuData.length
                      }
                      onChange={handleSelectAll}
                    />

                    Select All
                  </label>

                  <span>
                    {selectedItems.length} selected
                  </span>

                </div>

                {/* STARTERS */}
                <div className="output-section">

                  <h4>Starters</h4>

                  {menuData
                    .filter(
                      (item) =>
                        item.category === "Starters"
                    )
                    .map((item) => (

                      <div
                        className="menu-item"
                        key={item.id}
                      >

                        <input
                          type="checkbox"
                          checked={selectedItems.some(
                            (selected) =>
                              selected.id === item.id
                          )}
                          onChange={() =>
                            handleSelectItem(item)
                          }
                        />

                        <div className="menu-content">

                          <strong>
                            {item.name}
                          </strong>

                          <p>
                            {item.description}
                          </p>

                        </div>

                        <span>
                          {item.price}
                        </span>

                      </div>
                    ))}
                </div>

                {/* MAIN COURSE */}
                <div className="output-section">

                  <h4>Main Course</h4>

                  {menuData
                    .filter(
                      (item) =>
                        item.category ===
                        "Main Course"
                    )
                    .map((item) => (

                      <div
                        className="menu-item"
                        key={item.id}
                      >

                        <input
                          type="checkbox"
                          checked={selectedItems.some(
                            (selected) =>
                              selected.id === item.id
                          )}
                          onChange={() =>
                            handleSelectItem(item)
                          }
                        />

                        <div className="menu-content">

                          <strong>
                            {item.name}
                          </strong>

                          <p>
                            {item.description}
                          </p>

                        </div>

                        <span>
                          {item.price}
                        </span>

                      </div>
                    ))}
                </div>

                {/* SAVE */}
                <button
                  className="save-button"
                  onClick={handleSaveData}
                >
                  💾 Save Selected Data
                </button>

                <div className="ai-note">

                  <strong>
                    LLM processing complete
                  </strong>

                  <span>
                    Menu content has been converted
                    into structured text.
                  </span>

                </div>

              </div>
            )}

          </div>

        </section>

        {/* SAVED DATA */}
        <section className="saved-card">

          <div className="saved-header">

            <div>
              <h3>
                Saved Menu Data
              </h3>

              <p>
                Your selected menu information
              </p>
            </div>

            {savedItems.length > 0 && (
              <button
                className="clear-button"
                onClick={handleClearSavedData}
              >
                Clear All
              </button>
            )}

          </div>

          {savedItems.length === 0 ? (

            <div className="no-saved-data">

              <h4>
                No saved data
              </h4>

              <p>
                Select menu items and click
                "Save Selected Data".
              </p>

            </div>

          ) : (

            <div className="saved-table-container">

              <table className="saved-table">

                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Item</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {savedItems.map((item) => (

                    <tr key={item.id}>

                      <td>
                        {item.category}
                      </td>

                      <td>
                        <strong>
                          {item.name}
                        </strong>
                      </td>

                      <td>
                        {item.description}
                      </td>

                      <td>
                        {item.price}
                      </td>

                      <td>
                        <button
                          className="remove-button"
                          onClick={() =>
                            handleRemoveSavedItem(
                              item.id
                            )
                          }
                        >
                          Remove
                        </button>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </section>

        {/* INFO */}
        <section className="info-grid">

          <div className="info-card">
            <span>COMPANY</span>
            <strong>DoorDash</strong>
          </div>

          <div className="info-card">
            <span>INDUSTRY</span>
            <strong>
              Delivery & Mobility
            </strong>
          </div>

          <div className="info-card">
            <span>TECHNOLOGY</span>
            <strong>
              Generative AI & LLM
            </strong>
          </div>

          <div className="info-card">
            <span>USE CASE</span>
            <strong>
              Menu Transcription
            </strong>
          </div>

        </section>

      </main>
    </div>
  );
}

export default App;