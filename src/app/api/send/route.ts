import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Verificar que tenemos la API key
if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    try {
      const data = await resend.emails.send({
        from: 'Sergio González <onboarding@resend.dev>',
        to: 'soysergiogonza@gmail.com',
        reply_to: email,
        subject: `✨ Nuevo mensaje de ${name}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Nuevo mensaje de contacto</title>
            </head>
            <body style="font-family: 'Arial', sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f9fafb;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <!-- Header -->
                <div style="background: linear-gradient(to right, #3b82f6, #8b5cf6); padding: 30px; border-radius: 10px 10px 0 0;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px; text-align: center;">
                    Nuevo Mensaje de Contacto
                  </h1>
                </div>

                <!-- Content -->
                <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <!-- Sender Info -->
                  <div style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #e5e7eb;">
                    <h2 style="color: #1f2937; font-size: 18px; margin-bottom: 15px;">Información del Remitente</h2>
                    <p style="margin: 5px 0; color: #4b5563;">
                      <strong style="color: #374151;">Nombre:</strong> ${name}
                    </p>
                    <p style="margin: 5px 0; color: #4b5563;">
                      <strong style="color: #374151;">Email:</strong> ${email}
                    </p>
                  </div>

                  <!-- Message -->
                  <div style="margin-bottom: 30px;">
                    <h2 style="color: #1f2937; font-size: 18px; margin-bottom: 15px;">Mensaje</h2>
                    <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; color: #4b5563;">
                      ${message.replace(/\n/g, '<br>')}
                    </div>
                  </div>

                  <!-- Action Button -->
                  <div style="text-align: center;">
                    <a href="mailto:${email}" 
                       style="display: inline-block; padding: 12px 24px; background: linear-gradient(to right, #3b82f6, #8b5cf6); 
                              color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 500;">
                      Responder a ${name}
                    </a>
                  </div>
                </div>

                <!-- Footer -->
                <div style="margin-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
                  <p style="margin: 5px 0;">
                    Este mensaje fue enviado desde el formulario de contacto de tu portafolio
                  </p>
                  <p style="margin: 5px 0;">
                    © ${new Date().getFullYear()} Sergio González
                  </p>
                </div>
              </div>
            </body>
          </html>
        `,
      });

      return NextResponse.json(
        { message: "Email enviado correctamente", data },
        { status: 200 }
      );
    } catch (resendError) {
      console.error('Error de Resend:', resendError);
      return NextResponse.json(
        { error: 'Error al enviar el email' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
} 