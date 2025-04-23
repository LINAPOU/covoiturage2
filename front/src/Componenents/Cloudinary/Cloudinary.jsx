import { useEffect, useState } from "react";

function Cloudinary({ uwConfig, setState }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Charger le script Cloudinary si nécessaire
    if (!loaded) {
      const script = document.createElement("script");
      script.setAttribute("async", "");
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.onload = () => setLoaded(true);
      document.body.appendChild(script);
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      const widget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result.event === "success") {
            console.log("Image uploaded: ", result.info);
            setState((prev) => [...prev, result.info.secure_url]);
          }
        }
      );
      widget.open();
    }
  };

  return (
    <button onClick={initializeCloudinaryWidget} disabled={!loaded}>
      {loaded ? "Upload Image" : "Loading..."}
    </button>
  );
}

export default Cloudinary;
