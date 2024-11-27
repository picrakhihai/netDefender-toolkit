let liveOutput = ""; // Variable to store the live scan output

// Enable custom command input
document.getElementById("custom").addEventListener("change", () => {
  document.getElementById("custom-command").disabled = false;
});
document.getElementById("basic").addEventListener("change", () => {
  document.getElementById("custom-command").disabled = true;
});
document.getElementById("intermediate").addEventListener("change", () => {
  document.getElementById("custom-command").disabled = true;
});

// Start scan
async function startScan() {
  const form = document.getElementById("scan-form");
  const formData = new FormData(form);
  const terminal = document.getElementById("terminal");
  terminal.innerHTML = ""; // Clear previous output
  liveOutput = ""; // Reset live output

  // Prepare POST data
  const data = {
    scan_type: formData.get("scan_type"),
    custom_command: formData.get("custom_command"),
  };

  try {
    const response = await fetch("/nmap/scan/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken(),
      },
      body: JSON.stringify(data),
    });

    if (!response.body) throw new Error("No response body");
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Decode and append output to the terminal and liveOutput variable
      const text = decoder.decode(value);
      liveOutput += text; // Store output for downloading
      terminal.innerHTML += text;
      terminal.scrollTop = terminal.scrollHeight;
    }
  } catch (err) {
    console.error(err);
    terminal.innerHTML = "Error: Unable to complete the scan.";
  }
}

// Download live output
function downloadOutput() {
  if (!liveOutput) {
    alert("No output to download. Please start a scan first.");
    return;
  }

  // Get the current timestamp
  const now = new Date();
  const timestamp = `${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}_${now.getDate()}${now.getMonth() + 1}${now.getFullYear()}`;

  // Create the filename with timestamp
  const filename = `scan_output_${timestamp}.txt`;

  // Create a Blob and trigger the download
  const blob = new Blob([liveOutput], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Helper function to get CSRF token
function getCSRFToken() {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === "csrftoken") return value;
  }
  return null;
}
