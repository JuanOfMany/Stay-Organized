const fs = require('fs');

// Read the JSON file
fs.readFile('./data/todos.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Parse the JSON data
    const jsonArray = JSON.parse(data);

    // Modify each entry to add the image field
    jsonArray.forEach(entry => {
        entry.image = 'null';
    });

    // Convert the modified array back to JSON
    const modifiedJson = JSON.stringify(jsonArray, null, 2);

    // Write the modified JSON back to the file
    fs.writeFile('./data/todos.json', modifiedJson, 'utf8', err => {
        if (err) {
            console.error('Error writing to the file:', err);
        } else {
            console.log('File successfully updated with new image fields.');
        }
    });
});