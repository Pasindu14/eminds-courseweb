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


export async function uploadHtmlContent(htmlContent: string) {

    // Perform the file upload
    const response = await fetch(
        "https://eminds.com.au/coursewebbadges/upload.php", // Ensure this endpoint can handle raw HTML in the request body
        {
            method: "POST",
            body: 'htmlData=' + encodeURIComponent(htmlContent),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // Specify the content type as HTML
            },
            cache: 'no-store'
        }
    );

    const jsonResponse = await response.json();
    return jsonResponse;
}
