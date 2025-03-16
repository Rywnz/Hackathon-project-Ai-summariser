document.getElementById("summarizeBtn").addEventListener("click", function() {
    const inputText = document.getElementById("inputText").value;

    console.log("Button clicked! Input Text: ", inputText);  

    if (!inputText) {
        alert("Please enter some text.");
        return;
    }

    const API_KEY = "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";  // Keep this secret in a secure place
    const API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

    const payload = {
        inputs: `Summarize this text in a chaotic, brainrot style: ${inputText}`
    };

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.length > 0 && data[0].summary_text) {
            document.getElementById("summary").textContent = "Summary: " + data[0].summary_text;
        } else {
            document.getElementById("summary").textContent = "Error: Unable to generate summary.";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("summary").textContent = "Error with the request.";
    });
});
