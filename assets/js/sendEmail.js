let message = document.getElementById("email-message");

//Thanks to Code Institute's instructional videos (Sending Emails Using EmailJS) on how to use the emailjs service.

//Email service provided from emailjs
function sendMail(contactForm) {
    emailjs.send("service_dt2dr7c", "south_park", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.message.value
    })
    .then(
        function () {
            message.classList.remove("d-none");
            setTimeout(function (){
                message.classList.add("d-none");
            }, 5000);
        } 
    );
    return false; // To block from loading a new page
}

