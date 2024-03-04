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

/* export async function uploadSlide(htmlContent: string) {

    // Perform the file upload
    const response = await fetch(
        "https://eminds.com.au/coursewebslides/upload.php", // Ensure this endpoint can handle raw HTML in the request body
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
} */

export async function uploadSlide(formData: FormData) {

    try {
        const response = await fetch('https://eminds.com.au/coursewebslides/upload.php', {
            method: 'POST',
            body: formData,
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'An error occurred during the upload.' };
    }
}


export async function deleteHtmlFile(url: string) {

    const parsedUrl = new URL(url);

    const pathSegments = parsedUrl.pathname.split('/');
    const finalPath = pathSegments.filter(segment => segment.length > 0).slice(-2).join('/');

    const response = await fetch(
        "https://eminds.com.au/coursewebbadges/delete.php",
        {
            method: "POST",
            body: 'filePath=' + encodeURIComponent(finalPath),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            cache: 'no-store'
        }
    );

    const jsonResponse = await response.json();
    return jsonResponse;
}

export async function deleteFile(path: string) {

    const response = await fetch(
        "https://eminds.com.au/coursewebbadges/delete.php",
        {
            method: "POST",
            body: 'filePath=' + path,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            cache: 'no-store'
        }
    );

    const jsonResponse = await response.json();
    return jsonResponse;
}


export async function deleteSlide(path: string) {

    const response = await fetch(
        "https://eminds.com.au/coursewebslides/delete.php",
        {
            method: "POST",
            body: 'filePath=' + encodeURIComponent(path),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            cache: 'no-store'
        }
    );

    const jsonResponse = await response.json();
    return jsonResponse;
}