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