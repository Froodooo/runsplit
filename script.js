document.getElementById('calculateBtn').addEventListener('click', calculateTimes);

function calculateTimes() {
    const timeInput = document.getElementById('timeInput').value;
    const distanceSelect = document.getElementById('distanceSelect').value;
    const resultsDiv = document.getElementById('results');

    // Validate input format
    if (!timeInput.match(/^\d{1,2}:\d{2}$/)) {
        resultsDiv.innerHTML = '<p class="error">Please enter time in MM:SS format</p>';
        return;
    }

    // Parse input time
    const [minutes, seconds] = timeInput.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds;

    // Calculate times for different distances
    const distances = [
        { name: '200m', length: 0.2 },
        { name: '400m', length: 0.4 },
        { name: '1000m', length: 1 },
        { name: '5000m', length: 5 }
    ];

    // Filter out 5000m if 5K is selected
    const filteredDistances = distances.filter(d => 
        distanceSelect === '10K' || d.length < 5
    );

    // Calculate and format results
    const results = filteredDistances.map(d => {
        const timeForDistance = Math.floor(totalSeconds * (d.length / (distanceSelect === '10K' ? 10 : 5)));
        const resultMinutes = Math.floor(timeForDistance / 60);
        const resultSeconds = timeForDistance % 60;
        return `${d.name}: ${resultMinutes}:${resultSeconds.toString().padStart(2, '0')}`;
    });

    // Display results
    resultsDiv.innerHTML = results.map(result => `<p>${result}</p>`).join('');
} 