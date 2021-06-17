//Email service provided from emailjs

function sendMail(contactForm) {
    emailjs.send("service_dt2dr7c", "south_park", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.message.value
    })
    .then(
        function (response) {
            console.log("SUCCESS", response);
        }, 
        function (error) {
            console.log("FAILED", error);
        }
    );
    return false; // To block from loading a new page
}