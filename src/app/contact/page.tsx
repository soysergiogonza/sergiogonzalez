"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiUser, FiMessageSquare, FiSend } from 'react-icons/fi';
import { toast } from 'sonner';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Mostrar toast de carga
    const loadingToast = toast.loading('Enviando mensaje...');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Error al enviar el mensaje');

      // Actualizar toast y estado
      toast.success('¡Mensaje enviado con éxito!', {
        id: loadingToast,
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

    } catch (error) {
      // Mostrar error en toast
      toast.error('Error al enviar el mensaje. Por favor, intenta nuevamente.', {
        id: loadingToast,
      });
      setStatus('error');
    } finally {
      // Resetear estado después de un tiempo
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen p-8 md:p-12 bg-gradient-to-b from-background via-background-secondary to-background">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Contacto
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            ¿Tienes alguna pregunta o propuesta? No dudes en contactarme.
          </p>
        </div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="relative bg-background-elevated/50 backdrop-blur-xl rounded-2xl p-8 
                    border border-gray-800 transition-all duration-500"
        >
          {/* Decorative Borders */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 
                        border-primary rounded-tl-2xl transition-all duration-500"></div>
          <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 
                        border-secondary rounded-tr-2xl transition-all duration-500"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 
                        border-secondary rounded-bl-2xl transition-all duration-500"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 
                        border-primary rounded-br-2xl transition-all duration-500"></div>

          <div className="relative space-y-6">
            {/* Name Input */}
            <div>
              <label className="flex items-center gap-2 text-gray-300 mb-2">
                <FiUser className="text-primary" />
                Nombre
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-background border border-gray-700 
                         text-white focus:outline-none focus:border-primary
                         transition-all duration-300"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="flex items-center gap-2 text-gray-300 mb-2">
                <FiMail className="text-primary" />
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-background border border-gray-700 
                         text-white focus:outline-none focus:border-primary
                         transition-all duration-300"
                required
              />
            </div>

            {/* Message Input */}
            <div>
              <label className="flex items-center gap-2 text-gray-300 mb-2">
                <FiMessageSquare className="text-primary" />
                Mensaje
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-background border border-gray-700 
                         text-white focus:outline-none focus:border-primary
                         transition-all duration-300 resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 
                rounded-lg bg-gradient-to-r from-primary to-secondary
                text-white transition-all duration-300
                ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
            >
              {status === 'loading' ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Enviando...
                </>
              ) : (
                <>
                  <FiSend className="text-lg" />
                  Enviar mensaje
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400">
          ¡Mensaje enviado con éxito! Gracias por contactarme.
        </div>
      )}
      {status === 'error' && (
        <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
          Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
        </div>
      )}
    </div>
  );
};

export default ContactPage;
