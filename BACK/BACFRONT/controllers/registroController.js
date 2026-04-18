const Registro = require("../models/Registro");
const Conferencia = require("../models/Conferencia");
const Taller = require("../models/Taller");
const { enviarCorreoRegistro } = require("../services/emailService");

exports.crearRegistro = async (req, res) => {
  console.log("Datos recibidos:", req.body);
  try {
    // Actualizar el cupo de la conferencia o taller
    if (req.body.conferenciaId) {
      const conferencia = await Conferencia.findById(req.body.conferenciaId);
      if (!conferencia || conferencia.cupoConferencia <= 0) {
        return res.status(400).json({ msg: "Cupo completo" });
      }

      conferencia.cupoConferencia -= 1;
      await conferencia.save();
    }

    if (req.body.tallerId) {
      const taller = await Taller.findById(req.body.tallerId);

      if (!taller || taller.cupoTaller <= 0) {
        return res.status(400).json({ msg: "Cupo completo" });
      }

      taller.cupoTaller -= 1;
      await taller.save();
    }

    // GENERAR FOLIO
    const total = await Registro.countDocuments();
    const consecutivo = String(total + 1).padStart(5, "0");

    // separar nombre y apellido
    const nombre = req.body.nombre.split(" ")[0];
    const apellido = req.body.apellidoPaterno || "XX";

    // crear folio
    const folio = `${nombre}-${apellido}-${consecutivo}`;
    // AHORA SÍ GUARDAR
    let registro = new Registro({ ...req.body, folio: folio });
    await registro.save();

    // Obtener datos del evento para el correo
    let infoEvento = "";

    if (req.body.conferenciaId) {
      const conferencia = await Conferencia.findById(req.body.conferenciaId);

      if (conferencia) {
        const fechaFormateada = new Date(
          conferencia.fechaConferencia,
        ).toLocaleString("es-MX", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
        infoEvento = `
        Conferencia: ${conferencia.nombreConferencia}
        Fecha: ${fechaFormateada}
        Lugar: ${conferencia.lugarConferencia}
        `;
      }
    }

    if (req.body.tallerId) {
      const taller = await Taller.findById(req.body.tallerId);

      if (taller) {
        const fechaFormateada = new Date(taller.fechaTaller).toLocaleString(
          "es-MX",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          },
        );
        infoEvento = `
        Taller: ${taller.nombreTaller}
        Fecha: ${fechaFormateada}
        Lugar: ${taller.lugarTaller}
        `;
      }
    }

    //uso del servicio
    await enviarCorreoRegistro(registro, infoEvento);

    res.send(registro);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.obtenerRegistros = async (req, res) => {
  try {
    const registros = await Registro.find();
    res.json(registros);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.actualizarRegistro = async (req, res) => {
  try {
    const { nombre, correoElectronico, telefono, areaTrabajo, foto } = req.body;
    let registro = await Registro.findById(req.params.id);

    if (!registro) {
      res.status(404).json({ msg: "No existe el registro" });
    }

    registro.nombre = nombre;
    registro.correoElectronico = correoElectronico;
    registro.telefono = telefono;
    registro.areaTrabajo = areaTrabajo;
    registro.foto = foto;

    registro = await Registro.findOneAndUpdate(
      { _id: req.params.id },
      registro,
      { new: true },
    );
    res.json(registro);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.obtenerRegistro = async (req, res) => {
  try {
    let registro = await Registro.findById(req.params.id);

    if (!registro) {
      res.status(404).json({ msg: "No existe el registro" });
    }
    res.json(registro);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.eliminarRegistro = async (req, res) => {
  try {
    let registro = await Registro.findById(req.params.id);

    if (!registro) {
      res.status(404).json({ msg: "No existe el registro" });
    }
    await Registro.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Registro eliminado con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
