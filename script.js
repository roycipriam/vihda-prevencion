"use strict";

/* ====== VIDEO ======
   Pega aquí SOLO el ID del video de YouTube (lo que va después de "v=" en el enlace).
   Ejemplo: https://www.youtube.com/watch?v=ABC123xyz  ->  "ABC123xyz"           */
const ID_VIDEO_YOUTUBE = "nVj-f8mF_VA";

const explicaciones = {
    p1: { correcta: "falso",
        mensajeCorrecto: "¡Correcto! Abrazar, besar en la mejilla o dar la mano NO transmite el VIH.",
        mensajeIncorrecto: "Incorrecto. El VIH NO se transmite por abrazar, dar la mano o compartir espacios cotidianos." },
    p2: { correcta: "verdadero",
        mensajeCorrecto: "¡Correcto! Con el tratamiento TARGA, las personas con VIH logran una vida plena y saludable.",
        mensajeIncorrecto: "Incorrecto. El tratamiento permite controlar el virus, recuperar las defensas y tener una excelente calidad de vida." },
    p3: { correcta: "falso",
        mensajeCorrecto: "¡Correcto! El VIH es el virus y el SIDA es la etapa avanzada de la infección. No son lo mismo.",
        mensajeIncorrecto: "Incorrecto. VIH y SIDA están relacionados, pero representan etapas diferentes." },
    p4: { correcta: "falso",
        mensajeCorrecto: "¡Correcto! Usar dos condones genera fricción y aumenta el riesgo de ruptura. Se debe usar uno solo, correctamente.",
        mensajeIncorrecto: "Incorrecto. Al usar dos condones se corre el riesgo de que se rompan por la fricción." },
    p5: { correcta: "falso",
        mensajeCorrecto: "¡Correcto! El VIH no discrimina orientación sexual, edad ni género. Cualquiera puede contraerlo.",
        mensajeIncorrecto: "Incorrecto. El VIH puede afectar a cualquier persona que no se proteja." },
    p6: { correcta: "falso",
        mensajeCorrecto: "¡Correcto! Una persona puede verse y sentirse sana y vivir con el virus muchos años sin síntomas.",
        mensajeIncorrecto: "Incorrecto. El virus puede ser silencioso; verse sano no descarta el VIH. Solo la prueba lo confirma." }
};

let aciertos = 0;
let respondidas = 0;

function responderPregunta(boton) {
    const grupo = boton.dataset.grupo;
    const pregunta = explicaciones[grupo];
    if (!pregunta) return;

    const resultado = document.getElementById(`r-${grupo}`);
    const botones = document.querySelectorAll(`[data-grupo="${grupo}"]`);
    if (!resultado || botones.length === 0) return;

    const esCorrecta = boton.dataset.respuesta === pregunta.correcta;
    resultado.textContent = esCorrecta ? pregunta.mensajeCorrecto : pregunta.mensajeIncorrecto;
    resultado.classList.remove("correcto", "incorrecto");
    resultado.classList.add(esCorrecta ? "correcto" : "incorrecto");
    resultado.setAttribute("role", "status");

    botones.forEach(b => {
        b.disabled = true;
        if (b === boton) b.setAttribute("aria-pressed", "true");
    });

    respondidas++;
    if (esCorrecta) aciertos++;
    mostrarResumen();
}

function mostrarResumen() {
    const total = Object.keys(explicaciones).length;
    const caja = document.getElementById("resumen-cuestionario");
    if (!caja || respondidas < total) return;
    document.getElementById("puntaje").textContent = `Acertaste ${aciertos} de ${total}`;
    document.getElementById("mensaje-puntaje").textContent =
        aciertos === total ? "¡Excelente! Conoces bien los hechos sobre el VIH."
        : aciertos >= 4 ? "¡Muy bien! Revisa las respuestas que fallaste y compártelas."
        : "Lee las explicaciones y vuelve a intentarlo: informarse es el primer paso.";
    caja.hidden = false;
}

function reiniciarCuestionario() {
    aciertos = 0;
    respondidas = 0;
    document.querySelectorAll(".opciones button").forEach(b => {
        b.disabled = false;
        b.removeAttribute("aria-pressed");
    });
    document.querySelectorAll(".resultado").forEach(r => {
        r.textContent = "";
        r.classList.remove("correcto", "incorrecto");
    });
    const caja = document.getElementById("resumen-cuestionario");
    if (caja) caja.hidden = true;
    const primera = document.querySelector(".cuestionario");
    if (primera) primera.scrollIntoView({ behavior: "smooth", block: "start" });
}

function inicializarCuestionario() {
    document.querySelectorAll(".opciones button[data-grupo][data-respuesta]").forEach(boton => {
        boton.addEventListener("click", () => responderPregunta(boton));
    });
    const reiniciar = document.getElementById("boton-reiniciar");
    if (reiniciar) reiniciar.addEventListener("click", reiniciarCuestionario);
}

function inicializarVideo() {
    const cont = document.getElementById("video-contenedor");
    if (!cont) return;
    if (ID_VIDEO_YOUTUBE) {
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${ID_VIDEO_YOUTUBE}`;
        iframe.title = "Video informativo sobre VIH y SIDA";
        iframe.allow = "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        iframe.loading = "lazy";
        cont.appendChild(iframe);
    } else {
        const aviso = document.createElement("p");
        aviso.className = "video-aviso";
        aviso.textContent = "Video próximamente.";
        cont.appendChild(aviso);
    }
}

function inicializarAnio() {
    const el = document.getElementById("anio-actual");
    if (el) el.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
    inicializarCuestionario();
    inicializarVideo();
    inicializarAnio();
});
