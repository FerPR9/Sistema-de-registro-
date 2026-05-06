const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const enviarCorreoRegistro = async (registro, infoEvento) => {
  try {
    await transporter.sendMail({
      //from: '"Registro participante" <mafe00985@gmail.com>',
      from: `"Registro participante" <${process.env.EMAIL_USER}>`,
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
