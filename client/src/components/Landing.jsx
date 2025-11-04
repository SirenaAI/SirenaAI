import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Auth from './Auth'
import Header from './Header'
import Footer from './Footer'
import Button from './Button'
import './Landing.css'

const Landing = () => {
  const [showAuth, setShowAuth] = useState(false)
  const { isAuthenticated } = useAuth()

  return (
    <div className="landing-page">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="display-medium">
              Predicción de <br />
              inundaciones con IA
            </h1>
            <p className="h3" style={{ color: 'rgba(3, 15, 73, 0.7)' }}>
              Anticipamos las lluvias, prevenimos riesgos
            </p>
            {isAuthenticated() ? (
              <Link to="/app">
                <Button variant="solid" color="primary" size="large">
                  Acceder al Mapa
                </Button>
              </Link>
            ) : (
              <Button 
                variant="solid" 
                color="primary" 
                size="large"
                onClick={() => setShowAuth(true)}
              >
                Empezar
              </Button>
            )}
          </div>
          <div className="hero-image">
            <img src="/Imagen-inicio.png" alt="Predicción de inundaciones" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-text">
            <h2 className="display-small">Nuestro proyecto</h2>
            <p className="body-medium">
              Sirena es una herramienta de inteligencia artificial que predice zonas con riesgo de
              inundación en Argentina. Analiza datos meteorológicos, del terreno y del sistema de
              desagües para anticipar posibles eventos y reducir daños. Nuestro objetivo es brindar
              información precisa para la prevención y gestión del riesgo hídrico.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat-card">
              <p className="display-small">+200<br/>Localidades</p>
            </div>
            <div className="stat-card">
              <p className="display-small">+10<br/>Databases</p>
            </div>
            <div className="stat-card">
              <p className="display-small">90%<br/>Precisión</p>
            </div>
            <div className="stat-card">
              <p className="display-small">+1.000<br/>Datos utilizados</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Technology Section */}
      <section className="ai-section">
        <div className="ai-container">
          <h2 className="display-small">Nuestra tecnología predictiva</h2>
          <div className="ai-cards">
            <div className="ai-card">
              <div className="ai-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.8748 14.25C26.4968 14.25 29.118 17.2668 29.4987 20.9085H29.6149C32.5887 20.9085 35 23.2794 35 26.2043C35 29.1291 32.5887 31.5 29.6149 31.5H14.1347C11.1609 31.5 8.74964 29.1291 8.74964 26.2043C8.74964 23.2794 11.1609 20.9085 14.1347 20.9085H14.251C14.6353 17.2419 17.2529 14.25 21.8748 14.25ZM21.8748 16.1667C18.781 16.1667 16.0866 18.6008 16.0866 21.9646C16.0866 22.4974 15.6104 22.9152 15.0647 22.9152H14.0335C12.1509 22.9152 10.6247 24.4083 10.6247 26.2502C10.6247 28.0883 12.1509 29.5833 14.0335 29.5833H29.7162C31.5987 29.5833 33.125 28.0903 33.125 26.2483C33.125 24.4083 31.5987 22.9152 29.7162 22.9152H28.6849C28.1412 22.9152 27.663 22.4974 27.663 21.9646C27.663 18.5587 24.9686 16.1667 21.8748 16.1667ZM16.9848 8.5C19.7148 8.5 22.0961 10.087 23.2717 12.4196C22.473 12.3175 21.6659 12.3034 20.8642 12.3774C20.4007 11.7684 19.8077 11.2753 19.1299 10.9355C18.4522 10.5958 17.7077 10.4183 16.9529 10.4167C15.7739 10.4224 14.6347 10.8533 13.736 11.6334C12.8373 12.4136 12.2368 13.4929 12.0403 14.6812L11.9709 15.0837C11.8958 15.5292 11.669 15.9331 11.3307 16.2242C10.9924 16.5153 10.5644 16.6748 10.1222 16.6746H9.6384C8.11213 16.6746 6.87461 17.9549 6.87461 19.5342C6.87461 20.6267 7.46525 21.5755 8.33338 22.0566C7.93213 22.5779 7.60212 23.1606 7.35837 23.7854C6.46512 23.2291 5.76873 22.3961 5.37042 21.4075C4.97211 20.4188 4.89264 19.3261 5.14357 18.2881C5.3945 17.2501 5.96275 16.321 6.7657 15.6358C7.56866 14.9506 8.56448 14.545 9.6084 14.4781L10.0228 14.4685C10.3119 12.7959 11.1682 11.2808 12.4414 10.1894C13.7145 9.0979 15.3231 8.49977 16.9848 8.5Z" fill="white"/>
                </svg>

              </div>
              <h3 className="body-large">Recolección y preparación de datos</h3>
              <p className="body-medium">
                Recopilamos datos climáticos, hidrológicos y geográficos de múltiples fuentes. 
                Los datos se limpian, normalizan y estructuran para ser procesados por nuestros modelos de IA.
              </p>
            </div>
            <div className="ai-card">
              <div className="ai-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30.4165 29.0625C30.4165 28.8139 30.5263 28.5754 30.7216 28.3996C30.917 28.2238 31.182 28.125 31.4583 28.125C31.7345 28.125 31.9995 28.2238 32.1949 28.3996C32.3902 28.5754 32.5 28.8139 32.5 29.0625C32.5 29.3111 32.3902 29.5496 32.1949 29.7254C31.9995 29.9012 31.7345 30 31.4583 30C31.182 30 30.917 29.9012 30.7216 29.7254C30.5263 29.5496 30.4165 29.3111 30.4165 29.0625Z" fill="white"/>
                  <path d="M30.4165 10.9375C30.4165 11.1861 30.5263 11.4246 30.7216 11.6004C30.917 11.7762 31.182 11.875 31.4583 11.875C31.7345 11.875 31.9995 11.7762 32.1949 11.6004C32.3902 11.4246 32.5 11.1861 32.5 10.9375C32.5 10.6889 32.3902 10.4504 32.1949 10.2746C31.9995 10.0988 31.7345 10 31.4583 10C31.182 10 30.917 10.0988 30.7216 10.2746C30.5263 10.4504 30.4165 10.6889 30.4165 10.9375Z" fill="white"/>
                  <path d="M30.4165 20C30.4165 20.2486 30.5263 20.4871 30.7216 20.6629C30.917 20.8387 31.182 20.9375 31.4583 20.9375C31.7345 20.9375 31.9995 20.8387 32.1949 20.6629C32.3902 20.4871 32.5 20.2486 32.5 20C32.5 19.7514 32.3902 19.5129 32.1949 19.3371C31.9995 19.1613 31.7345 19.0625 31.4583 19.0625C31.182 19.0625 30.917 19.1613 30.7216 19.3371C30.5263 19.5129 30.4165 19.7514 30.4165 20Z" fill="white"/>
                  <path d="M14.4431 10.625C13.7042 10.6248 12.9784 10.8015 12.3404 11.1368C11.7023 11.4722 11.1748 11.9543 10.8119 12.5336C10.4491 13.1129 10.2639 13.7686 10.2754 14.4335C10.287 15.0985 10.4948 15.7487 10.8776 16.3175C9.92686 16.4828 9.06976 16.9408 8.45343 17.6129C7.8371 18.285 7.5 19.1292 7.5 20.0006C7.5 20.872 7.8371 21.7162 8.45343 22.3883C9.06976 23.0604 9.92686 23.5184 10.8776 23.6837M14.4431 10.625C14.4431 9.7962 14.809 9.00134 15.4602 8.41529C16.1114 7.82924 16.9946 7.5 17.9156 7.5C18.8365 7.5 19.7198 7.82924 20.371 8.41529C21.0222 9.00134 21.3881 9.7962 21.3881 10.625V20V29.375C21.3881 30.2038 21.0222 30.9987 20.371 31.5847C19.7198 32.1708 18.8365 32.5 17.9156 32.5C16.9946 32.5 16.1114 32.1708 15.4602 31.5847C14.809 30.9987 14.4431 30.2038 14.4431 29.375C13.7044 29.3751 12.9789 29.1984 12.341 28.8631C11.7031 28.5277 11.1758 28.0458 10.8129 27.4667C10.4501 26.8876 10.2649 26.2321 10.2763 25.5674C10.2876 24.9026 10.4951 24.2526 10.8776 23.6837M14.4431 10.625C14.4431 11.6475 14.989 12.555 15.8321 13.125M10.8776 23.6837C11.376 22.9411 12.1453 22.377 13.0541 22.0875M30.7216 11.6004L28.333 13.75H25.555M30.7216 11.6004C30.5263 11.4246 30.4165 11.1861 30.4165 10.9375C30.4165 10.6889 30.5263 10.4504 30.7216 10.2746C30.917 10.0988 31.182 10 31.4583 10C31.7345 10 31.9995 10.0988 32.1949 10.2746C32.3902 10.4504 32.5 10.6889 32.5 10.9375C32.5 11.1861 32.3902 11.4246 32.1949 11.6004C31.9995 11.7762 31.7345 11.875 31.4583 11.875C31.182 11.875 30.917 11.7762 30.7216 11.6004ZM30.7216 28.3996L28.333 26.25H25.555M30.7216 28.3996C30.5263 28.5754 30.4165 28.8139 30.4165 29.0625C30.4165 29.3111 30.5263 29.5496 30.7216 29.7254C30.917 29.9012 31.182 30 31.4583 30C31.7345 30 31.9995 29.9012 32.1949 29.7254C32.3902 29.5496 32.5 29.3111 32.5 29.0625C32.5 28.8139 32.3902 28.5754 32.1949 28.3996C31.9995 28.2238 31.7345 28.125 31.4583 28.125C31.182 28.125 30.917 28.2238 30.7216 28.3996ZM30.4165 20H25.555M30.4165 20C30.4165 20.2486 30.5263 20.4871 30.7216 20.6629C30.917 20.8387 31.182 20.9375 31.4583 20.9375C31.7345 20.9375 31.9995 20.8387 32.1949 20.6629C32.3902 20.4871 32.5 20.2486 32.5 20C32.5 19.7514 32.3902 19.5129 32.1949 19.3371C31.9995 19.1613 31.7345 19.0625 31.4583 19.0625C31.182 19.0625 30.917 19.1613 30.7216 19.3371C30.5263 19.5129 30.4165 19.7514 30.4165 20Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

              </div>
              <h3 className="body-large">Análisis predictivo</h3>
              <p className="body-medium">
                Utilizamos algoritmos de machine learning que analizan patrones históricos y datos en tiempo real 
                para predecir zonas de riesgo de inundación con alta precisión.
              </p>
            </div>
            <div className="ai-card">
              <div className="ai-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_22_312)">
                    <path d="M29.6938 10.7562L26.6188 12.0875C25.7188 11.3375 24.6875 10.7375 23.5625 10.325L23.15 6.96875C23.127 6.77008 23.0422 6.58362 22.9077 6.43563C22.7732 6.28764 22.5956 6.18556 22.4 6.14375C21.6125 6.0125 20.825 5.9375 20 5.9375C19.175 5.9375 18.3875 6.0125 17.6 6.14375C17.1875 6.21875 16.8875 6.55625 16.85 6.96875L16.4563 10.325C15.3313 10.7375 14.3 11.3375 13.4 12.0875L10.3063 10.7562C10.1233 10.6721 9.91783 10.6504 9.72135 10.6944C9.52486 10.7384 9.34828 10.8458 9.21878 11C8.18753 12.2188 7.36253 13.625 6.80003 15.1437C6.65003 15.5375 6.80003 15.9687 7.13753 16.2312L9.85628 18.2563C9.63119 19.4142 9.63119 20.6046 9.85628 21.7625L7.13753 23.7875C6.80003 24.0313 6.66878 24.4813 6.80003 24.875C7.36253 26.3938 8.18753 27.7813 9.20003 29C9.46253 29.3188 9.91253 29.4125 10.2875 29.2438L13.3813 27.9125C14.2813 28.6625 15.3125 29.2625 16.4375 29.675L16.8313 33.0312C16.8875 33.4437 17.1875 33.7813 17.5813 33.8563C18.3875 33.9875 19.175 34.0625 20 34.0625C20.825 34.0625 21.6125 33.9875 22.4 33.8563C22.8125 33.7813 23.1125 33.4437 23.15 33.0312L23.5438 29.675C24.6688 29.2625 25.7 28.6625 26.6 27.9125L29.6938 29.2438C30.0688 29.4125 30.5188 29.3188 30.7813 29C31.7938 27.7813 32.6188 26.3938 33.1813 24.875C33.3313 24.4813 33.1813 24.05 32.8438 23.8062L30.125 21.7812C30.2563 21.1812 30.3125 20.6 30.3125 20C30.3125 19.4 30.2563 18.8187 30.1438 18.2375L32.8625 16.2125C33.2 15.9688 33.3313 15.5188 33.2 15.125C32.6375 13.6063 31.8125 12.2188 30.8 11C30.6657 10.8468 30.4859 10.7405 30.2869 10.6967C30.0879 10.6528 29.8801 10.6737 29.6938 10.7562Z" stroke="white" strokeWidth="2"/>
                    <path d="M20 24.6875C22.5888 24.6875 24.6875 22.5888 24.6875 20C24.6875 17.4112 22.5888 15.3125 20 15.3125C17.4112 15.3125 15.3125 17.4112 15.3125 20C15.3125 22.5888 17.4112 24.6875 20 24.6875Z" stroke="white" strokeWidth="2"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_22_312">
                      <rect width="30" height="30" fill="white" transform="translate(5 5)"/>
                    </clipPath>
                  </defs>
                </svg>


              </div>
              <h3 className="body-large">Evaluación y mejora del modelo</h3>
              <p className="body-medium">
                Monitoreamos continuamente el desempeño del modelo y lo actualizamos con nuevos datos 
                para mejorar la precisión de las predicciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficiaries Section */}
      <section className="beneficiaries-section">
        <div className="beneficiaries-container">
          <h2 className="display-small">Impacto y alcance de nuestro proyecto</h2>
          <div className="beneficiaries-cards">
            <div className="beneficiary-card">
              <div className="beneficiary-header">
                <div className="beneficiary-icon">
                  <svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.1329 1.66448C17.6371 0.603928 19.3819 0.0736497 21.3524 0.0736497C22.4354 0.0736497 23.6237 0.353519 24.9173 0.942717C26.2109 1.51718 27.2337 2.19476 27.9858 2.97545C29.5351 4.86088 30.1819 7.05565 29.9563 9.55974C29.7156 12.0638 28.8733 14.0229 27.4142 15.4075L15.9975 26.5876C15.7117 26.8674 15.3507 27 14.9296 27C14.5084 27 14.1624 26.8674 13.8766 26.5876C13.7376 26.4535 13.6283 26.2926 13.5559 26.1152C13.4834 25.9377 13.4492 25.7475 13.4555 25.5565C13.4555 25.144 13.5908 24.7905 13.8766 24.5106L20.7808 17.7496C21.1569 17.4255 21.1569 17.0867 20.7808 16.7185C20.4048 16.3502 20.0588 16.3502 19.7279 16.7185L12.8237 23.4795C12.6845 23.6169 12.5177 23.7244 12.3339 23.7954C12.1501 23.8664 11.9532 23.8993 11.7557 23.892C11.3346 23.892 10.9886 23.7594 10.7028 23.4795C10.5637 23.3454 10.4545 23.1846 10.382 23.0072C10.3096 22.8297 10.2754 22.6395 10.2816 22.4484C10.2816 22.036 10.417 21.6825 10.7028 21.4026L17.607 14.6416C18.0131 14.2733 18.0131 13.9051 17.607 13.5368C17.261 13.1686 16.9301 13.1686 16.5541 13.5368L9.64989 20.3715C9.5091 20.5067 9.34203 20.6129 9.15859 20.6837C8.97515 20.7546 8.77906 20.7887 8.58192 20.784C8.16075 20.784 7.79975 20.6514 7.48387 20.3715C7.18304 20.0917 7.03262 19.7529 7.03262 19.3404C7.03262 18.928 7.19808 18.5597 7.529 18.2357L14.4482 11.4599C14.8243 11.0917 14.8243 10.7529 14.4482 10.4288C14.0722 10.1047 13.7112 10.1047 13.3803 10.4288L6.40087 17.2193C6.06995 17.5139 5.72398 17.6759 5.34794 17.6759C4.92677 17.6759 4.56577 17.5286 4.29502 17.2193C4.00922 16.9247 3.8588 16.5712 3.8588 16.1588C3.8588 15.7463 4.00922 15.4075 4.29502 15.1277C8.8978 10.5908 11.7407 7.85106 12.8237 6.8347L18.1786 12.0196C18.7652 12.5646 19.4421 12.8445 20.2694 12.8445C21.3223 12.8445 22.1496 12.4321 22.7663 11.6072C23.1875 11.0033 23.3379 10.3404 23.2176 9.60393C23.0972 8.86743 22.7814 8.24877 22.2699 7.73322L16.1329 1.66448ZM19.2315 10.9885L12.8237 4.69885L2.17412 15.1277C0.910614 13.8756 0.188608 11.9607 0.0231485 9.35352C-0.142311 6.76105 0.579695 4.50737 2.17412 2.62193C3.9641 0.883798 6.10003 0 8.58192 0C11.0789 0 13.1998 0.883798 14.9296 2.62193L21.3524 8.91162C21.6382 9.19149 21.7736 9.53028 21.7736 9.94272C21.7736 10.3552 21.6382 10.7087 21.3524 10.9885C21.0666 11.2537 20.7206 11.401 20.2694 11.401C19.8633 11.401 19.5173 11.2537 19.2315 10.9885Z" fill="#58929D"/>
                  </svg>

                </div>
                <h3 className="h3">Población Civil</h3>
              </div>
              <p className="body-medium">
                Las comunidades en zonas de riesgo pueden acceder a información anticipada y confiable
                sobre posibles inundaciones, lo que les permite tomar medidas preventivas y reducir daños.
              </p>
            </div>
            <div className="beneficiary-card">
              <div className="beneficiary-header">
                <div className="beneficiary-icon">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30 12V30H0V12L10.5 7.5V10.5L18 7.5V12H30ZM22.8 9.75L24 0H28.5L29.7 9.75H22.8ZM13.5 24H16.5V18H13.5V24ZM7.5 24H10.5V18H7.5V24ZM22.5 18H19.5V24H22.5V18Z" fill="#58929D"/>
                  </svg>

                </div>
                <h3 className="h3">Empresas e industria</h3>
              </div>
              <p className="body-medium">
                El acceso a datos predictivos ayuda a las empresas a planificar su producción, proteger
                sus infraestructuras y minimizar pérdidas frente a eventos climáticos extremos.
              </p>
            </div>
            <div className="beneficiary-card">
              <div className="beneficiary-header">
                <div className="beneficiary-icon">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30 12V30H0V12L10.5 7.5V10.5L18 7.5V12H30ZM22.8 9.75L24 0H28.5L29.7 9.75H22.8ZM13.5 24H16.5V18H13.5V24ZM7.5 24H10.5V18H7.5V24ZM22.5 18H19.5V24H22.5V18Z" fill="#58929D"/>
                  </svg>

                </div>
                <h3 className="h3">Administraciones públicas</h3>
              </div>
              <p className="body-medium">
                Los gobiernos locales y organismos estatales pueden usar los análisis del sistema para
                diseñar políticas de prevención, respuesta y gestión del riesgo hídrico.
              </p>
            </div>
            <div className="beneficiary-card">
              <div className="beneficiary-header">
                <div className="beneficiary-icon">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 3.5625C15.5171 3.5625 16.0291 3.66435 16.5068 3.86222C16.9845 4.0601 17.4186 4.35014 17.7842 4.71577C18.1499 5.0814 18.4399 5.51546 18.6378 5.99318C18.8357 6.4709 18.9375 6.98292 18.9375 7.5C18.9375 8.01708 18.8357 8.5291 18.6378 9.00682C18.4399 9.48454 18.1499 9.9186 17.7842 10.2842C17.4186 10.6499 16.9845 10.9399 16.5068 11.1378C16.0291 11.3357 15.5171 11.4375 15 11.4375C13.9557 11.4375 12.9542 11.0227 12.2158 10.2842C11.4773 9.54581 11.0625 8.54429 11.0625 7.5C11.0625 6.45571 11.4773 5.45419 12.2158 4.71577C12.9542 3.97734 13.9557 3.5625 15 3.5625ZM15 20.4375C20.5688 20.4375 26.4375 23.175 26.4375 24.375V26.4375H3.5625V24.375C3.5625 23.175 9.43125 20.4375 15 20.4375ZM15 0C10.8562 0 7.5 3.35625 7.5 7.5C7.5 11.6438 10.8562 15 15 15C19.1437 15 22.5 11.6438 22.5 7.5C22.5 3.35625 19.1437 0 15 0ZM15 16.875C9.99375 16.875 0 19.3875 0 24.375V30H30V24.375C30 19.3875 20.0063 16.875 15 16.875Z" fill="#58929D"/>
                    <path d="M15 20.4375C20.5688 20.4375 26.4375 23.175 26.4375 24.375V26.4375H3.5625V24.375C3.5625 23.175 9.43125 20.4375 15 20.4375Z" fill="#58929D"/>
                    <path d="M15 3.5625C15.5171 3.5625 16.0291 3.66435 16.5068 3.86222C16.9845 4.0601 17.4186 4.35014 17.7842 4.71577C18.1499 5.0814 18.4399 5.51546 18.6378 5.99318C18.8357 6.4709 18.9375 6.98292 18.9375 7.5C18.9375 8.01708 18.8357 8.5291 18.6378 9.00682C18.4399 9.48454 18.1499 9.9186 17.7842 10.2842C17.4186 10.6499 16.9845 10.9399 16.5068 11.1378C16.0291 11.3357 15.5171 11.4375 15 11.4375C13.9557 11.4375 12.9542 11.0227 12.2158 10.2842C11.4773 9.54581 11.0625 8.54429 11.0625 7.5C11.0625 6.45571 11.4773 5.45419 12.2158 4.71577C12.9542 3.97734 13.9557 3.5625 15 3.5625Z" fill="#58929D"/>
                  </svg>


                </div>
                <h3 className="h3">Otras entidades</h3>
              </div>
              <p className="body-medium">
                Instituciones académicas, organizaciones ambientales y grupos de investigación pueden
                aprovechar los datos generados por SIRENA para estudios y desarrollo de proyectos sostenibles.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modal de autenticación */}
      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </div>
  )
}

export default Landing

