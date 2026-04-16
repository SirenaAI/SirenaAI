import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import './ContactPage.css'
import Header from './Header'
import Footer from './Footer'
import Input from './Input'
import Button from './Button'
import { useAuth } from '../hooks/useAuth'
import { useLanguage } from '../hooks/useLanguage'

const ContactPage = () => {
  const { user } = useAuth()
  const { t } = useLanguage()
  
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    mensaje: ''
  })
  
  // Auto-rellenar nombre y email cuando el usuario está logueado
  useEffect(() => {
    console.log('👤 Usuario actual:', user)
    if (user) {
      console.log('📧 Email del usuario:', user.email)
      console.log('📝 Nombre del usuario:', user.nombre)
      setFormData(prev => ({
        ...prev,
        nombre: user.nombre || '',
        email: user.email || ''
      }))
    }
  }, [user])
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
      setError(t('contact.requiredFields'))
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
        throw new Error(t('contact.emailNotConfigured'))
      }
      
      // Preparar los datos del template
      const templateParams = {
        from_name: formData.nombre || t('contact.unnamed'),
        from_email: formData.email,
        phone: formData.telefono || t('contact.noPhone'),
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
      setError(err.message || t('contact.sendErrorFallback'))
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
            {t('contact.bannerTitle')}
          </h1>
        </div>

        <div className="contact-form-section">
          <h2 className="display-small">{t('contact.title')}</h2>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="contact-form-grid">
              <Input
                label={t('contact.nameLabel')}
                type="text"
                name="nombre"
                placeholder={t('contact.namePlaceholder')}
                value={formData.nombre}
                onChange={handleChange}
                disabled={!!user}
              />
              
              <Input
                label={t('contact.phoneLabel')}
                type="tel"
                name="telefono"
                placeholder={t('contact.phonePlaceholder')}
                value={formData.telefono}
                onChange={handleChange}
              />
              
              <Input
                label={t('contact.mailLabel')}
                type="email"
                name="email"
                placeholder={t('contact.mailPlaceholder')}
                value={formData.email}
                onChange={handleChange}
                required
                disabled={!!user}
              />
              
              <div className="input-wrapper">
                <label className="input-label body-medium">{t('contact.messageLabel')} *</label>
                <textarea
                  name="mensaje"
                  placeholder={t('contact.messagePlaceholder')}
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
                {t('contact.sendSuccess')}
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
              {isSubmitting ? t('contact.sending') : success ? t('contact.sent') : t('contact.send')}
            </Button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ContactPage
