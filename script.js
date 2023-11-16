// Declare a variable to store the search term
let term = '';

// Function to update the search term when the user enters it
const updateTerm = () => {
    // Get the value of the search input element with the id 'searchTerm'
    term = document.getElementById('searchTerm').value;

    // Check if the search term is empty or consists of only spaces
    if (!term || term.trim() === '') {
        alert('Please enter a search term');
    } else {
        // Construct the URL for the iTunes API search
        const url = `https://itunes.apple.com/search?term=${term}`;
        
        // Get the container where the search results will be displayed
        const songContainer = document.getElementById('songs');

        // Clear previous search results from the container
        while (songContainer.firstChild) {
            songContainer.removeChild(songContainer.firstChild);
        }

        // Fetch data from the iTunes API
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Extract the array of results from the API response
                const audioResults = data.results;

                // Iterate through each result and create HTML elements to display them
                audioResults.forEach(result => {
                    // Create HTML elements for the result
                    const article = document.createElement('article'),
                        artistParagraph = document.createElement('p'),
                        songHeading = document.createElement('h4'),
                        img = document.createElement('img'),
                        audio = document.createElement('audio'),
                        audioSource = document.createElement('source');

                    // Populate the content of the HTML elements
                    artistParagraph.innerHTML = result.artistName;
                    songHeading.innerHTML = result.trackName;
                    img.src = result.artworkUrl100;
                    audioSource.src = result.previewUrl;
                    audio.controls = true;

                    // Append the HTML elements to the article
                    article.appendChild(img);
                    article.appendChild(artistParagraph);
                    article.appendChild(songHeading);
                    article.appendChild(audio);
                    audio.appendChild(audioSource);

                    // Append the article to the container
                    songContainer.appendChild(article);
                });
            })
            .catch(error => console.error('Request failed:', error));
    }
};

// Get the search button element and add a click event listener to trigger the updateTerm function
const searchBtn = document.getElementById('searchTermBtn');
searchBtn.addEventListener('click', updateTerm);

// Pause other audio elements when one is played
document.addEventListener('play', event => {
    const audioElements = document.getElementsByTagName('audio');
    for (let i = 0; i < audioElements.length; i++) {
        if (audioElements[i] !== event.target) {
            audioElements[i].pause();
        }
    }
}, true);
