import { j as json } from "../../../../chunks/index.js";
import nodemailer from "nodemailer";
let transporter = nodemailer.createTransport({
  host: "gaudi.pe",
  port: 465,
  secure: true,
  auth: {
    user: "mail@gaudi.pe",
    pass: "Gaudi2024$"
  }
});
const template = '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Detalles de la Compra</title><style>body {font-family: Arial, sans-serif;background-color: #f4f4f4;color: #333;padding: 20px;}.container {width: 100%;max-width: 600px;margin: 0 auto;background-color: #ffffff;border-radius: 8px;box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);}.header {text-align: center;margin-bottom: 20px;}.header h1 {margin: 0;font-size: 24px;}.content {line-height: 1.6;}.content p {margin: 10px 0;}.items {margin: 20px 0;}.items ul {list-style-type: none;padding: 0;}.items ul li {background-color: #f9f9f9;margin: 5px 0;padding: 10px;border-radius: 5px;}.total {font-weight: bold;}</style></head><body><table class="container" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td style="padding: 20px;" class="header"><h1>Detalles de la Compra</h1></td></tr><tr><td style="padding: 20px;" class="content"><p><strong>Nombre:</strong> {{name}}</p><p><strong>Dirección:</strong> {{address}}</p><p><strong>Teléfono:</strong> {{phone}}</p><p><strong>Email:</strong> {{email}}</p><p><strong>Notas:</strong> {{notes}}</p><p><strong>Coordenadas:</strong> {{coords}}</p><div class="items"><p><strong>Artículos:</strong></p><ul>{{items}}</ul></div><p><strong>Subtotal:</strong> {{subtotal}}</p><p><strong>Costo de Envío:</strong> {{costo_envio}}</p><p class="total"><strong>Total:</strong> {{total}}</p></td></tr><tr><td style="padding: 20px;" class="content"><img style="display: block; margin:auto; width: 75%;" src="{{yape}}" alt="Yape"></td></tr></table></body></html>';
function replaceTemplate(template2, data) {
  return template2.replace(/{{(.*?)}}/g, (_, key) => {
    const value = data[key.trim()];
    if (key.trim() === "coords" && Array.isArray(value)) {
      return `Lng: ${value[0]}, Lat: ${value[1]}`;
    }
    if (Array.isArray(value)) {
      return value.map((item) => `<li>${item.name}&nbsp;&nbsp;${(item.total * item.quantity).toFixed(2)}</li>`).join("");
    }
    return value || "";
  });
}
async function POST({ request }) {
  const datos = await request.json();
  transporter.sendMail({
    from: "mail@gaudi.pe",
    to: datos.email,
    subject: "Gaudí 🦎 - Gracias por su compra 😄!",
    text: `Hola ${datos.name.split(" ")[0]}. Gracias por su compra 😄 Su orden está siendo procesada. Le notificaremos apenas confirmemos su pago.`,
    html: `<h1>Hola ${datos.name.split(" ")[0]}</h1><h2>Gracias por su compra 😄</h2><h3>Su orden está siendo procesada.</h3><p>Le notificaremos apenas confirmemos su pago.</p>`
  }, (error, _) => {
    if (error) {
      return json({
        status: "error",
        error: {
          code: 500,
          message: error
        }
      });
    }
  });
  transporter.sendMail({
    from: "mail@gaudi.pe",
    to: "admin@gaudi.pe",
    subject: `Nuevo Pedido de ${datos.name}`,
    html: replaceTemplate(template, datos)
  }, (error, _) => {
    if (error) {
      return json({
        status: "error",
        error: {
          code: 500,
          message: error
        }
      });
    }
  });
  return json({
    status: "success",
    message: "El mail se envió correctamente"
  });
}
export {
  POST
};
