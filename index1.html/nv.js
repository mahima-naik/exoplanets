// Knowledge base containing information about exoplanets
const exoplanetKnowledge = {
    "what is an exoplanet": "An exoplanet is a planet that orbits a star outside our solar system.",
    "how are exoplanets different from planets in our solar system": "Exoplanets orbit stars other than our Sun. They can have a wide range of sizes, compositions, and conditions.",
    "why are exoplanets important for scientific research": "Studying exoplanets helps scientists understand planetary formation, the diversity of planets, and the potential for life beyond Earth.",
    "when was the first exoplanet discovered": "The first confirmed exoplanet, 51 Pegasi b, was discovered in 1995 by Michel Mayor and Didier Queloz.",
    "who discovered the first exoplanet": "Michel Mayor and Didier Queloz discovered the first exoplanet.",
    "what were some early theories about planets outside our solar system": "Early theories speculated that planets existed around other stars, but the technology to confirm their existence wasn’t available until the 20th century.",
    "how do scientists find exoplanets": "Scientists use several methods to detect exoplanets including the transit method, radial velocity, direct imaging, gravitational microlensing, and astrometry.",
    "what is the transit method": "The transit method detects exoplanets by measuring the dimming of a star’s light as a planet crosses in front of it.",
    "what is the radial velocity method": "The radial velocity method detects tiny shifts in a star’s light spectrum caused by the gravitational tug of an orbiting planet.",
    "what are gas giants": "Gas giants are large planets composed mainly of hydrogen and helium, like Jupiter and Saturn.",
    "what are terrestrial exoplanets": "Terrestrial exoplanets are rocky planets similar to Earth, with solid surfaces and potentially Earth-like conditions.",
    "what are hot jupiters": "Hot Jupiters are gas giants that orbit very close to their stars, making them extremely hot.",
    "what are super-earths": "Super-Earths are exoplanets larger than Earth but smaller than gas giants, potentially with Earth-like characteristics.",
    "what is the habitable zone": "The habitable zone is the region around a star where conditions might allow liquid water to exist, making it possible for life.",
    "can exoplanets support life": "Scientists are interested in exoplanets in the habitable zone, where liquid water could exist. However, other factors like atmosphere and climate are important too.",
    "how do scientists assess the habitability of exoplanets": "Scientists assess habitability by studying a planet’s atmosphere, surface temperature, and location in the habitable zone.",
    "what is proxima centauri b": "Proxima Centauri b is the closest known exoplanet to Earth, orbiting the star Proxima Centauri. It is located in the habitable zone.",
    "what is kepler-186f": "Kepler-186f is an Earth-sized exoplanet in the habitable zone of its star, raising interest in its potential for life.",
    "what is 51 pegasi b": "51 Pegasi b is the first confirmed exoplanet, a hot Jupiter orbiting the star 51 Pegasi.",
    "how do scientists study exoplanet atmospheres": "Scientists analyze the light passing through or reflecting off exoplanet atmospheres during transits to identify gases and other components.",
    "what gases are common in exoplanet atmospheres": "Common gases include hydrogen, helium, water vapor, carbon dioxide, and methane.",
    "what is the significance of finding water vapor on exoplanets": "Finding water vapor suggests that an exoplanet might have conditions favorable for life, as water is essential for life as we know it.",
    "how do scientists search for life on exoplanets": "Scientists search for life by looking for biosignatures, such as specific gases in the atmosphere, and studying the planet’s surface conditions.",
    "what is biosignature detection": "Biosignature detection involves identifying chemical or physical markers, like oxygen or methane, that may indicate the presence of life.",
    "what would be a sign of life on an exoplanet": "A sign of life could include finding specific ratios of gases like oxygen and methane in the atmosphere, which are difficult to sustain without biological processes.",
    "what was the kepler mission": "The Kepler Space Telescope was launched by NASA to find Earth-sized exoplanets using the transit method and has discovered thousands of exoplanets.",
    "how does the james webb space telescope help in studying exoplanets": "The James Webb Space Telescope studies exoplanet atmospheres and provides detailed information about their composition and potential habitability.",
    "what role does the tess mission play in discovering exoplanets": "The TESS mission searches for exoplanets around nearby stars by monitoring large areas of the sky for planetary transits.",
    "what are the biggest challenges in exoplanet research": "Challenges include detecting small, Earth-like planets, studying exoplanet atmospheres, and confirming signs of life due to the vast distances involved.",
    "why is it hard to directly image exoplanets": "Direct imaging is difficult because exoplanets are faint and close to bright stars, making it hard to separate the planet’s light from the star’s glare.",
    "what technological advances are needed to improve exoplanet detection": "Advances in space telescopes, spectroscopy, and methods like adaptive optics will improve exoplanet detection and study of their atmospheres."
};

// Function to calculate similarity between two strings
function similarity(s1, s2) {
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    let longerLength = longer.length;
    if (longerLength === 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

// Function to calculate the Levenshtein Distance (edit distance)
function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    const costs = [];
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i === 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1[i - 1] !== s2[j - 1])
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

// Function to search the knowledge base for the closest matching answer
function getBotResponse(userInput) {
    let input = userInput.toLowerCase().trim();

    // Set a threshold for similarity (0.6 = 60% similar)
    let threshold = 0.6;
    let closestMatch = null;
    let highestSimilarity = 0;

    // Find the closest matching question
    for (let question in exoplanetKnowledge) {
        let similarityScore = similarity(input, question);
        if (similarityScore > highestSimilarity && similarityScore > threshold) {
            closestMatch = question;
            highestSimilarity = similarityScore;
        }
    }

    // Return the best match or default response
    if (closestMatch) {
        return exoplanetKnowledge[closestMatch];
    } else {
        return "I'm not sure about that. Try asking me about exoplanets or space exploration!";
    }
}

function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    document.getElementById("userInput").value = ""; // clear input after sending

    let chatOutput = document.getElementById("chat-output");

    if (userInput) {
        // Add user's message to the chatbox
        let userMessage = document.createElement("div");
        userMessage.innerHTML = `<strong>You:</strong> ${userInput}`;
        chatOutput.appendChild(userMessage);

        // Get bot's response from the knowledge base
        let botMessage = document.createElement("div");
        botMessage.innerHTML = `<strong>Bot:</strong> ${getBotResponse(userInput)}`;

        // Add the bot's response to the chatbox
        chatOutput.appendChild(botMessage);

        // Auto scroll to the bottom after new messages
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
}