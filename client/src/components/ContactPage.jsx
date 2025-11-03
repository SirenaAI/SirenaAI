import { useState } from 'react'
import emailjs from '@emailjs/browser'
import './ContactPage.css'
import Header from './Header'
import Footer from './Footer'
import Input from './Input'
import Button from './Button'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    mensaje: ''
  })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validación básica
    if (!formData.email || !formData.mensaje) {
      setError('Por favor completa los campos requeridos')
      return
    }
    
    setIsSubmitting(true)
    setError('')
    
    try {
      // Configuración de EmailJS
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      
      // Verificar que las variables de entorno estén configuradas
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS no está configurado. Por favor configura las variables de entorno.')
      }
      
      // Preparar los datos del template
      const templateParams = {
        from_name: formData.nombre || 'Sin nombre',
        from_email: formData.email,
        phone: formData.telefono || 'No proporcionado',
        message: formData.mensaje,
        to_email: 'sirenaai2025@gmail.com'
      }
      
      // Enviar el email
      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      )
      
      setSuccess(true)
      
      // Limpiar formulario después de 3 segundos
      setTimeout(() => {
        setFormData({
          nombre: '',
          telefono: '',
          email: '',
          mensaje: ''
        })
        setSuccess(false)
      }, 3000)
      
    } catch (err) {
      console.error('Error al enviar el email:', err)
      setError(err.message || 'Hubo un error al enviar el mensaje. Por favor intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-page">
      <Header />
      
      <div className="contact-content">
        <div className="contact-banner">
          <h1 className="display-large">
            ¿Listo para optimizar la detección de inundaciones?
          </h1>
        </div>

        <div className="contact-form-section">
          <h2 className="display-small">Contáctanos</h2>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="contact-form-grid">
              <Input
                label="Nombre"
                type="text"
                name="nombre"
                placeholder="Tu nombre completo"
                value={formData.nombre}
                onChange={handleChange}
              />
              
              <Input
                label="Teléfono"
                type="tel"
                name="telefono"
                placeholder="11 1234 5678"
                value={formData.telefono}
                onChange={handleChange}
              />
              
              <Input
                label="Mail"
                type="email"
                name="email"
                placeholder="tuemail@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              
              <div className="input-wrapper">
                <label className="input-label body-medium">Mensaje *</label>
                <textarea
                  name="mensaje"
                  placeholder="Escribe tu mensaje aquí..."
                  value={formData.mensaje}
                  onChange={handleChange}
                  className="contact-textarea body-medium"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="contact-error body-medium">
                {error}
              </div>
            )}

            {success && (
              <div className="contact-success body-medium">
                ¡Mensaje enviado con éxito! Te contactaremos pronto.
              </div>
            )}

            <Button 
              type="submit" 
              variant="solid" 
              color="dark" 
              size="large" 
              className="contact-submit"
              disabled={success || isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : success ? 'Enviado ✓' : 'Enviar'}
            </Button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ContactPage
