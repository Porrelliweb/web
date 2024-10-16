const form = document.getElementById('contactForm');
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

// Función para enviar el correo electrónico usando Elastic Email
function sendEmail() {
    const bodyMessage = `
        Nombre Completo: ${fullName.value}<br> 
        Email: ${email.value}<br> 
        Número de Teléfono: ${phone.value}<br> 
        Mensaje: ${mess.value}
    `;

    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "juan04102006@gmail.com",  // Cambia por tu correo de Elastic Email
        Password: "854D448546B41FFFECFCF460D9E9ED977451", // Cambia por tu API Key de Elastic Email
        To: "juan04102006@gmail.com", // Cambia por el correo al que envías los datos
        From: "juan04102006@gmail.com", // Cambia por tu correo de Elastic Email
        Subject: subject.value,
        Body: bodyMessage
    }).then(
        message => {
            if (message === "OK") {
                alert("Correo enviado exitosamente.");
                form.reset(); // Limpiar formulario después de enviar
            } else {
                alert("Error al enviar el correo: " + message);
            }
        }
    ).catch(
        error => {
            console.error("Error en el envío:", error);
            alert("Error al enviar el correo. Detalle del error: " + error.message);
        }
    );
}

// Función para validar campos vacíos y marcar errores
function checkInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value === "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        item.addEventListener("keyup", () => {
            if (item.value !== "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            } else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}

// Función para validar si todos los campos están llenos
function validateFields() {
    if (!fullName.value || !email.value || !phone.value || !subject.value || !mess.value) {
        alert("Por favor, completa todos los campos.");
        return false;
    }
    return true;
}

// Envío del formulario por correo
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    checkInputs(); // Revisa los campos vacíos
    if (validateFields()) { // Solo si todos los campos están llenos se envía el correo
        sendEmail(); // Envía el correo
    }
});

// Función para enviar mensaje por WhatsApp
function sendwhatsapp() {
    // Validamos que todos los campos estén llenos antes de enviar el mensaje
    if (!fullName.value || !email.value || !phone.value || !subject.value || !mess.value) {
        alert("Por favor, completa todos los campos antes de enviar por WhatsApp.");
        return; // No continuar si hay campos vacíos
    }

    var phonenumber = "+573227243538"; // Número de WhatsApp al que se enviará el mensaje

    // Formateamos los datos del formulario para enviarlos por WhatsApp
    var url = "https://wa.me/" + phonenumber + "?text="
        + "*Nombre Completo:* " + encodeURIComponent(fullName.value) + "%0a"
        + "*Correo Electrónico:* " + encodeURIComponent(email.value) + "%0a"
        + "*Teléfono:* " + encodeURIComponent(phone.value) + "%0a"
        + "*Asunto:* " + encodeURIComponent(subject.value) + "%0a"
        + "*Mensaje:* " + encodeURIComponent(mess.value) + "%0a";

    // Abre WhatsApp en una nueva pestaña o ventana
    window.open(url, '_blank').focus();
}
