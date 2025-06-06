document.getElementById('calculateBtn').addEventListener('click', calculateTimes);

function calculateTimes() {
    const timeInput = document.getElementById('timeInput');
    const distanceSelect = document.getElementById('distanceSelect').value;
    const resultsDiv = document.getElementById('results');

    // Handle single number input by adding :00
    let processedTime = timeInput.value;
    if (/^\d+$/.test(processedTime)) {
        processedTime = processedTime + ':00';
        timeInput.value = processedTime; // Update the input field
    }

    // Validate input format
    if (!processedTime.match(/^\d{1,2}:\d{2}$/)) {
        resultsDiv.innerHTML = '<p class="error">Please enter time in MM:SS format</p>';
        return;
    }

    // Parse input time
    const [minutes, seconds] = processedTime.split(':').map(Number);
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
        
        // Calculate predicted finish time using the rounded-down split time
        const fullDistance = distanceSelect === '10K' ? 10 : 5;
        const splitTimeInSeconds = resultMinutes * 60 + resultSeconds;
        const predictedTime = splitTimeInSeconds * (fullDistance / d.length);
        const predictedMinutes = Math.floor(predictedTime / 60);
        const predictedSeconds = Math.round(predictedTime % 60);
        const predictedTimeStr = `${predictedMinutes}:${predictedSeconds.toString().padStart(2, '0')}`;
        
        return `<div class="result-row">
            <span class="distance">${d.name}</span>
            <span class="time" title="Predicted finish time: ${predictedTimeStr}">${resultMinutes}:${resultSeconds.toString().padStart(2, '0')}</span>
        </div>`;
    });

    // Display results
    resultsDiv.innerHTML = results.join('');
} 