import React, { useEffect, useState, useCallback } from "react";

import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";

function App() {
  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDPqxrAUFjDn6DzsPHUClqWmedf0IF-7fo",
  });

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  const handleActiveMarker = (marker) => {
    if (marker == activeMarker) return;
    setActiveMarker(marker);
  };


  return (
    <div className="App">
      <header className="App-header">
        Google map
      </header>
      <div>
        {isLoaded && (
          <div className="mt-6">

            <GoogleMap
              mapContainerStyle={{
                height: "100vh",
                width: "100%",
              }}
              onUnmount={onUnmount}
              //   onLoad={onLoad}
              zoom={1}
              center={{
                lat: 25.800732,
                lng: -80.199004,
              }}>

              <MarkerF

                onClick={() => {
                  return handleActiveMarker(1);
                }}
                position={{
                  lat: 25.800732,
                  lng: -80.199004,

                }}
                style={{ width: 600, height: 500 }}>
                {activeMarker === 1 && (
                  <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                    <div>
                      Testing
                    </div>
                  </InfoWindowF>
                )}
              </MarkerF>
              <MarkerF
                icon={{
                  path: "https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png",
                  fillColor: "#EBOOFF",
                  scale: 7
                }}
                onClick={() => {
                  return handleActiveMarker(2);
                }}
                position={{
                  lat: 20.5937,
                  lng: 78.9629,

                }}
                style={{ width: 600, height: 500 }}>
                {activeMarker === 2 && (
                  <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                    <div>
                      Testing 2
                    </div>
                  </InfoWindowF>
                )}
              </MarkerF>
            </GoogleMap>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
