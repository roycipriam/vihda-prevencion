
/* ==========================================
   VIHDA - JAVASCRIPT
   Campaña de prevención del VIH y el sida
========================================== */

"use strict";

/* ==========================================
   1. MITOS Y REALIDADES
========================================== */

const explicaciones = {
    p1: {
        correcta: "correcta",
        mensajeCorrecto: "¡Correcto! Abrazar no transmite el VIH.",
        mensajeIncorrecto:
            "La respuesta es FALSO. El VIH no se transmite por abrazar, dar la mano o compartir espacios cotidianos."
    },

    p2: {
        correcta: "correcta",
        mensajeCorrecto:
            "¡Correcto! Con tratamiento antirretroviral, las personas con VIH pueden vivir muchos años y cuidar su salud.",
        mensajeIncorrecto:
            "La respuesta es VERDADERO. El tratamiento permite controlar el virus y mejorar la calidad de vida."
    },

    p3: {
        correcta: "correcta",
        mensajeCorrecto:
            "¡Correcto! El VIH es el virus y el sida es la fase más avanzada de la infección.",
        mensajeIncorrecto:
            "La respuesta es FALSO. VIH y sida están relacionados, pero no significan lo mismo."
    }
};

function responderPregunta(boton) {
    const grupo = boton.dataset.grupo;
    const respuesta = boton.dataset.respuesta;
    const pregunta = explicaciones[grupo];

    if (!pregunta) {
        return;
    }

    const resultado = document.getElementById(`r-${grupo}`);
    const botones = document.querySelectorAll(
        `[data-grupo="${grupo}"]`
    );

    if (!resultado || botones.length === 0) {
        return;
    }

    // Evitar que una misma pregunta se responda varias veces.
    if ([...botones].some(elemento => elemento.disabled)) {
        return;
    }

    const esCorrecta = respuesta === pregunta.correcta;

    resultado.textContent = esCorrecta
        ? pregunta.mensajeCorrecto
        : pregunta.mensajeIncorrecto;

    resultado.classList.remove("correcto", "incorrecto");
    resultado.classList.add(
        esCorrecta ? "correcto" : "incorrecto"
    );

    resultado.setAttribute("role", "status");

    // Desactivar los botones después de responder.
    botones.forEach(elemento => {
        elemento.disabled = true;

        if (elemento === boton) {
            elemento.setAttribute("aria-pressed", "true");
        }
    });
}

function inicializarCuestionario() {
    const botones = document.querySelectorAll(
        ".opciones button[data-grupo][data-respuesta]"
    );

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            responderPregunta(boton);
        });
    });
}

/* ==========================================
   2. NAVEGACIÓN Y ENLACES INTERNOS
========================================== */

function inicializarNavegacion() {
    const enlaces = document.querySelectorAll(
        'a[href^="#"]'
    );

    enlaces.forEach(enlace => {
        enlace.addEventListener("click", evento => {
            const destino = enlace.getAttribute("href");

            if (!destino || destino === "#") {
                return;
            }

            const seccion = document.querySelector(destino);

            if (!seccion) {
                return;
            }

            // Permitir que el navegador siga el enlace normalmente.
            // Esto mantiene la navegación accesible.
        });
    });
}

/* ==========================================
   3. AÑO AUTOMÁTICO EN EL PIE DE PÁGINA
========================================== */

function inicializarAnio() {
    const pie = document.querySelector(".pie");

    if (!pie) {
        return;
    }

    // No duplicar el año si el script se vuelve a ejecutar.
    let anio = document.getElementById("anio-actual");

    if (!anio) {
        anio = document.createElement("span");
        anio.id = "anio-actual";

        const parrafos = pie.querySelectorAll("p");

        if (parrafos.length > 0) {
            parrafos[parrafos.length - 1].append(
                document.createTextNode(" "),
                anio
            );
        }
    }

    anio.textContent = `© ${new Date().getFullYear()}`;
}

/* ==========================================
   4. INICIALIZACIÓN
========================================== */

function iniciarVIHDA() {
    inicializarCuestionario();
    inicializarNavegacion();
    inicializarAnio();

    console.info(
        "VIHDA está listo. Infórmate, previene y actúa."
    );
}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        iniciarVIHDA,
        { once: true }
    );
} else {
    iniciarVIHDA();
}
