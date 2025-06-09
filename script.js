function loadAdhanTimings() {
  const locationDisplay = document.getElementById('location');

  if (!navigator.geolocation) {
    locationDisplay.textContent = 'Geolocation not supported by this browser.';
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    locationDisplay.textContent = `Your Location: ${lat.toFixed(2)}, ${lon.toFixed(2)}`;

    try {
      const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`);
      const data = await res.json();
      const timings = data.data.timings;

      document.getElementById('fajr').textContent = timings.Fajr;
      document.getElementById('dhuhr').textContent = timings.Dhuhr;
      document.getElementById('asr').textContent = timings.Asr;
      document.getElementById('maghrib').textContent = timings.Maghrib;
      document.getElementById('isha').textContent = timings.Isha;

    } catch (err) {
      console.error('Error fetching data:', err);
      locationDisplay.textContent = 'Failed to load prayer times.';
    }
  }, () => {
    locationDisplay.textContent = 'Location access denied.';
  });
}

window.onload = loadAdhanTimings;