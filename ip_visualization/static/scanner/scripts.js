// List of embedded map URLs
const mapUrls = [
    "https://www.google.com/maps/d/u/0/embed?mid=1qH6BbDwDoM5UDkSfdxUORE9A0sVkfHw&ehbc=2E312F",
    "https://www.google.com/maps/d/u/0/embed?mid=12sdqmVhPVDMRf_0gEH_oJOTd5Eu9WMk&ehbc=2E312F",
    "https://www.google.com/maps/d/u/0/embed?mid=1ETaneFSBmmP0At0evW1mYFw_IKVhUcA&ehbc=2E312F",
    "https://www.google.com/maps/d/u/0/embed?mid=1BWJVERMrWc-9uZLKA0cmpdIl29Fb614&ehbc=2E312F",
    "https://www.google.com/maps/d/u/0/embed?mid=1tbmEavVkOvkylf0TpqPRXF5OEZEW0G0&ehbc=2E312F",
    "https://www.google.com/maps/d/u/0/embed?mid=104K-wxO7ljsDt1FpWTRnYoKXKuReWRk&ehbc=2E312F",
    "https://www.google.com/maps/d/u/0/embed?mid=1Gfquf2yEjT9VDaquc12tGbJb6rvkgKU&ehbc=2E312F",
    "https://www.google.com/maps/d/u/0/embed?mid=1uSU2AJMXtnQreXvfHgedxi8wepSbAJs&ehbc=2E312F",
    "https://www.google.com/maps/d/u/0/embed?mid=1HHwQnCVdguSBqiLGU9glECJQVoJr7q4&ehbc=2E312F",
    "https://www.google.com/maps/d/u/0/embed?mid=1g3zDAm_E_GgCM0XfXlQ-W-ho2rvRMWo&ehbc=2E312F"
];

// Function to start packet capture
function startCapture() {
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = "Capturing packets, please wait...";

    fetch('/scanner/scan/')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                responseDiv.innerHTML = `<p class="error">Error: ${data.error}</p>`;
            } else {
                responseDiv.innerHTML = `
                    <p class="success">${data.message}</p>
                    <p>PCAP File: <a href="${data.pcap_file}" download>${data.pcap_file}</a></p>
                    <p>KML File: <a href="${data.kml_file}" download>${data.kml_file}</a></p>
                `;
                
                // Display a random map URL
                displayRandomMap();
            }
        })
        .catch(error => {
            responseDiv.innerHTML = `<p class="error">An unexpected error occurred: ${error.message}</p>`;
        });
}

// Function to display a random map URL
function displayRandomMap() {
    const mapFrame = document.getElementById('map-frame');
    const randomIndex = Math.floor(Math.random() * mapUrls.length);
    mapFrame.src = mapUrls[randomIndex];
}
