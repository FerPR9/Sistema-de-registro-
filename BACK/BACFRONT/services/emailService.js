const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mafe00985@gmail.com",
    pass: "liwn qbub mmrl qvua",
  },
});

const enviarCorreoRegistro = async (registro, infoEvento) => {
  try {
    await transporter.sendMail({
      from: '"Eventos Tech" <mafe00985@gmail.com>',
      to: registro.correoElectronico,
      subject: "Confirmación de registro",
      text: `
Hola ${registro.nombre},

Te has registrado correctamente.

${infoEvento}

Tu folio es: ${registro.folio}

¡Gracias por participar!
            `,
    });

    console.log("Correo enviado correctamente");
  } catch (error) {
    console.log("Error al enviar correo:", error);
  }
};

module.exports = { enviarCorreoRegistro };
