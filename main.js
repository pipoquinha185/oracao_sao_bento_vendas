/*
  main.js
  Lógica de interação:
  - Scroll suave para seções
  - Redirecionamento dos botões (lê LINKS em links.js)
  - Animações sutis (reveal)
*/

(function () {
  "use strict";

  // Atualiza ano no rodapé
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Scroll suave para âncoras (botões com data-scroll="#id")
  document.addEventListener("click", function (ev) {
    var btn = ev.target.closest("[data-scroll]");
    if (!btn) return;

    var target = btn.getAttribute("data-scroll");
    if (!target) return;

    var el = document.querySelector(target);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // CTA: redireciona para link configurado em links.js
  document.addEventListener("click", function (ev) {
    var cta = ev.target.closest("[data-cta]");
    if (!cta) return;

    var type = cta.getAttribute("data-cta");
    if (!type) return;

    // Verifica se links.js carregou
    if (!window.LINKS) {
      alert("Links não configurados. Abra links.js e defina seus URLs.");
      return;
    }

    var url = null;

    if (type === "prayer") url = window.LINKS.prayer;
    if (type === "other") url = window.LINKS.otherProducts;

    if (!url || /SEU-LINK/i.test(url)) {
      alert("Configure o link em links.js antes de publicar.");
      return;
    }

    // Abre em nova aba para não perder a página
    window.open(url, "_blank", "noopener,noreferrer");
  });

  // Reveal animation: adiciona classe quando entra na tela
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    // Fallback simples (navegadores antigos)
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
