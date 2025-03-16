document.getElementById("summarizeBtn").addEventListener("click", function() {
    const inputText = document.getElementById("inputText").value;

    console.log("Button clicked! Input Text: ", inputText);  
    
    if (!inputText) {
        alert("Please enter some text.");
        return;
    }

    fetch('http://127.0.0.1:5000/summarize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText })
    })
    .then(response => response.json())
    .then(data => {
        if (data.summary) {
            document.getElementById("summary").textContent = "Summary: " + data.summary;
        } else {
            document.getElementById("summary").textContent = "Error: " + data.error;
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("summary").textContent = "Error with the request.";
    });
});
