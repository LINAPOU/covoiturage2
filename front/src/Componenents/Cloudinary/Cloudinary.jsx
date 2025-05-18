import { useEffect, useState } from "react";

function Cloudinary({ uwConfig, setState }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!window.cloudinary) {
      const script = document.createElement("script");
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.async = true;
      script.onload = () => setLoaded(true);
      document.body.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  const initializeCloudinaryWidget = () => {
    if (loaded && window.cloudinary) {
      const widget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result.event === "success") {
            console.log("Image uploaded: ", result.info.secure_url);
            setState((prev) => [...prev, result.info.secure_url]);
          } else if (error) {
            console.error("Cloudinary Upload Error:", error);
          }
        }
      );
      widget.open();
    }
  };

  return (
    <button onClick={initializeCloudinaryWidget} disabled={!loaded}>
      {loaded ? "Upload Image" : "Chargement..."}
    </button>
  );
}

export default Cloudinary;
