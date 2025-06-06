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

    // Validate input format (HH:mm:ss or mm:ss)
    if (!processedTime.match(/^(\d{1,2}:)?\d{1,2}:\d{2}$/)) {
        resultsDiv.innerHTML = '<p class="error">Please enter time in HH:mm:ss or mm:ss format</p>';
        return;
    }

    // Parse input time
    const timeParts = processedTime.split(':');
    let hours = 0;
    let minutes, seconds;

    if (timeParts.length === 3) {
        [hours, minutes, seconds] = timeParts.map(Number);
    } else {
        [minutes, seconds] = timeParts.map(Number);
    }

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    // Get the full distance in kilometers
    const fullDistance = parseFloat(distanceSelect);

    // Calculate times for different distances
    const distances = [
        { name: '200m', length: 0.2 },
        { name: '400m', length: 0.4 },
        { name: '800m', length: 0.8 },
        { name: '1000m', length: 1 },
        { name: '1500m', length: 1.5 },
        { name: '2000m', length: 2 },
        { name: '3000m', length: 3 },
        { name: '5000m', length: 5 },
        { name: '10000m', length: 10 },
        { name: '15000m', length: 15 },
        { name: '20000m', length: 20 },
        { name: '25000m', length: 25 },
        { name: '30000m', length: 30 },
        { name: '35000m', length: 35 },
        { name: '40000m', length: 40 }
    ];

    // Filter out distances that are greater than or equal to the full distance
    const filteredDistances = distances.filter(d => 
        d.length < fullDistance
    );

    // Calculate and format results
    const results = filteredDistances.map(d => {
        const timeForDistance = Math.floor(totalSeconds * (d.length / fullDistance));
        const resultHours = Math.floor(timeForDistance / 3600);
        const resultMinutes = Math.floor((timeForDistance % 3600) / 60);
        const resultSeconds = timeForDistance % 60;
        
        // Calculate predicted finish time using the rounded-down split time
        const splitTimeInSeconds = timeForDistance;
        const predictedTime = splitTimeInSeconds * (fullDistance / d.length);
        const predictedHours = Math.floor(predictedTime / 3600);
        const predictedMinutes = Math.floor((predictedTime % 3600) / 60);
        const predictedSeconds = Math.round(predictedTime % 60);
        
        // Format the predicted time string
        let predictedTimeStr = '';
        if (predictedHours > 0) {
            predictedTimeStr = `${predictedHours}:${predictedMinutes.toString().padStart(2, '0')}:${predictedSeconds.toString().padStart(2, '0')}`;
        } else {
            predictedTimeStr = `${predictedMinutes}:${predictedSeconds.toString().padStart(2, '0')}`;
        }
        
        // Format the result time string
        let resultTimeStr = '';
        if (resultHours > 0) {
            resultTimeStr = `${resultHours}:${resultMinutes.toString().padStart(2, '0')}:${resultSeconds.toString().padStart(2, '0')}`;
        } else {
            resultTimeStr = `${resultMinutes}:${resultSeconds.toString().padStart(2, '0')}`;
        }
        
        return `<div class="result-row">
            <span class="distance">${d.name}</span>
            <span class="time" title="Predicted finish time: ${predictedTimeStr}">${resultTimeStr}</span>
        </div>`;
    });

    // Display results
    resultsDiv.innerHTML = results.join('');
} 