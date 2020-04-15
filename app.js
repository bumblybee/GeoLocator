const locationForm = document.getElementById("location-form");

locationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Grab value of input
  const location = document.getElementById("location-input").value;

  // Grab radio buttons
  const addressRadio = document.getElementById("address-radio");
  const coordsRadio = document.getElementById("coords-radio");

  // If address radio button checked, pass address into fetch url
  if (addressRadio.checked) {
    geocode(`address=${location}`)
      .then((data) => {
        console.log(data);
        const formattedAddress = data.results[0].formatted_address;
        const formattedAddressOutput = `
          <ul class="list-group">
            <li class="list-group-item">${formattedAddress}</li>
            </ul>`;

        const addressComponents = data.results[0].address_components;
        let addressComponentsOutput = `<ul class="list-group">`;

        // Create li for each component
        addressComponents.forEach((component) => {
          addressComponentsOutput += `
                <li class="list-group-item"><strong>${component.types[0]}</strong>: ${component.long_name}</li>`;
        });

        addressComponentsOutput += `</ul>`;

        const lat = data.results[0].geometry.location.lat;
        const long = data.results[0].geometry.location.lng;

        let geometryOutput = `<ul class="list-group">
            <li class="list-group-item"><strong>Latitude:</strong> ${lat}</li>
            <li class="list-group-item"><strong>Longitude:</strong> ${long}</li>
            </ul> `;

        // Display in DOM
        document.getElementById(
          "formatted-address"
        ).innerHTML = formattedAddressOutput;

        document.getElementById(
          "address-components"
        ).innerHTML = addressComponentsOutput;

        document.getElementById("geometry").innerHTML = geometryOutput;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // If coords radio button checked, pass latlng into fetch url
  if (coordsRadio.checked) {
    geocode(`latlng=${location}`)
      .then((data) => {
        console.log(data);
        const formattedAddress = data.results[0].formatted_address;
        const formattedAddressOutput = `
          <ul class="list-group">
            <li class="list-group-item">${formattedAddress}</li>
            </ul>`;

        const addressComponents = data.results[0].address_components;
        let addressComponentsOutput = `<ul class="list-group">`;

        addressComponents.forEach((address) => {
          addressComponentsOutput += `
                <li class="list-group-item"><strong>${address.types[0]}</strong>: ${address.long_name}</li>`;
        });
        addressComponentsOutput += `</ul>`;

        const lat = data.results[0].geometry.location.lat;
        const long = data.results[0].geometry.location.lng;

        let geometryOutput = `<ul class="list-group">
            <li class="list-group-item"><strong>Latitude:</strong> ${lat}</li>
            <li class="list-group-item"><strong>Longitude:</strong> ${long}</li>
            </ul> `;

        document.getElementById(
          "formatted-address"
        ).innerHTML = formattedAddressOutput;

        document.getElementById(
          "address-components"
        ).innerHTML = addressComponentsOutput;

        document.getElementById("geometry").innerHTML = geometryOutput;
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

//Fetch Google Geocode data
async function geocode(params) {
  const url = "https://maps.googleapis.com/maps/api/geocode/json?";

  const key = "YOUR_API_KEY";

  const res = await fetch(url + params + "&key=" + key);

  const data = await res.json();
  return data;
}
