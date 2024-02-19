export async function uploadFile(fileFormData: FormData) {

    const response = await fetch(
        "https://eminds.com.au/coursewebfiles/uploadfiles.php",
        {
            method: "POST",
            body: fileFormData,
            cache: 'no-store'
        },);

    const jsonResponse = await response.json();
    return jsonResponse;
}


export async function uploadHtmlContent() {
    // Dynamically generate the HTML content
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>
<body>
 <p>This is a test file</p>
</body>
</html>`;

    // Perform the file upload
    const response = await fetch(
        "https://eminds.com.au/coursewebbadges/uploadbadge.php", // Ensure this endpoint can handle raw HTML in the request body
        {
            method: "POST",
            body: htmlContent,
            headers: {
                'Content-Type': 'text/html', // Specify the content type as HTML
                'Cache-Control': 'no-store'
            },
        }
    );

    // Assuming the server responds with JSON
    const jsonResponse = await response.json();
    return jsonResponse;
}
