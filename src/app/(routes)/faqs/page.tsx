import AccordionFaqs from "./components/AccordionFaqs"

export default function FaqsPage() {
  return (
    <section className="max-w-4xl mx-auto bg-background shadow-md rounded-lg p-6 ">
        <h2 className="mb-8 text-3xl ">FAQS</h2>
        <div className="mb-5">
            <p>
                Bienvenido a nuestra sección de Preguntas Frecuentes diseñada específicamente para brindarte respuestas rápidas y claras sobre el dashboard para empresas que hemos desarrollado con pasión y dedicación.
            </p>
            <p>
                En nuestra página FAQs, encontrarás una recopilación de las preguntas más comunes que nuestros usuarios suelen hacer sobre el funcionamiento, características y uso de nuestro dashboard. Desde cómo registrarse en la plataforma hasta cómo aprovechar al máximo sus funciones, hemos reunido una lista exhaustiva de interrogantes para ofrecerte la mejor experiencia posible.
            </p>
        </div>
        <AccordionFaqs />
    </section>
  )
}
