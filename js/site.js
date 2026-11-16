/* Comportamentos do site: menu, ano, contadores, doação e formulário.
   Destinos de WhatsApp e e-mail são os mesmos do site publicado. */
(function () {
  document.documentElement.classList.add("js");

  var WHATS = "5531997924630";
  var EMAIL = "contato@institutoimpulsiona.onmicrosoft.com";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var ano = document.getElementById("ano");
  if (ano) ano.textContent = String(new Date().getFullYear());

  var header = document.getElementById("header");
  function setScrolled() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 40);
  }
  setScrolled();
  window.addEventListener("scroll", setScrolled, { passive: true });

  var nav = document.getElementById("nav");
  var burger = document.getElementById("burger");

  function setMenu(open) {
    if (!nav || !burger) return;
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    var icon = burger.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-bars", !open);
      icon.classList.toggle("fa-xmark", open);
    }
  }

  if (burger && nav) {
    burger.addEventListener("click", function (e) {
      e.stopPropagation();
      setMenu(!nav.classList.contains("open"));
    });
    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("open")) return;
      if (nav.contains(e.target) || burger.contains(e.target)) return;
      setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        setMenu(false);
        burger.focus();
      }
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
  }

  var video = document.getElementById("heroVideo");
  if (video) {
    video.muted = true;
    var play = video.play();
    if (play && typeof play.catch === "function") play.catch(function () {});
  }

  var amounts = document.getElementById("amounts");
  var doarBtn = document.getElementById("doarBtnLink");
  if (amounts && doarBtn) {
    amounts.querySelectorAll(".amount").forEach(function (b) {
      b.addEventListener("click", function () {
        amounts.querySelectorAll(".amount").forEach(function (x) {
          x.classList.remove("active");
          x.setAttribute("aria-pressed", "false");
        });
        b.classList.add("active");
        b.setAttribute("aria-pressed", "true");
        var valorSel = b.getAttribute("data-v");
        var label = valorSel === "outro" ? "Apoiar (outro valor)" : "Apoiar com R$ " + valorSel;
        var msg = valorSel === "outro"
          ? "Olá! Quero apoiar o Instituto Impulsiona com uma doação. Pode me ajudar?"
          : "Olá! Quero apoiar o Instituto Impulsiona com uma doação de R$ " + valorSel + ". Pode me ajudar?";
        doarBtn.setAttribute("href", "https://wa.me/" + WHATS + "?text=" + encodeURIComponent(msg));
        doarBtn.replaceChildren();
        var icon = document.createElement("i");
        icon.className = "fa-brands fa-whatsapp";
        icon.setAttribute("aria-hidden", "true");
        doarBtn.appendChild(icon);
        doarBtn.appendChild(document.createTextNode(" " + label));
      });
    });
  }

  var form = document.getElementById("contatoForm");
  if (form) {
    form.addEventListener("submit", function (e) { e.preventDefault(); });
    form.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-via]");
      if (!btn) return;
      enviarForm(btn.getAttribute("data-via"));
    });
  }

  function enviarForm(via) {
    var nome = (document.getElementById("fNome").value || "").trim();
    var email = (document.getElementById("fEmail").value || "").trim();
    var msg = (document.getElementById("fMsg").value || "").trim();
    var corpo = "Nome: " + (nome || "-") + "\nE-mail: " + (email || "-") + "\n\n" + (msg || "");
    if (via === "whats") {
      window.open(
        "https://wa.me/" + WHATS + "?text=" + encodeURIComponent("Olá, Instituto Impulsiona!\n\n" + corpo),
        "_blank",
        "noopener"
      );
    } else {
      window.location.href = "mailto:" + EMAIL
        + "?subject=" + encodeURIComponent("Contato pelo site — " + (nome || ""))
        + "&body=" + encodeURIComponent(corpo);
    }
  }

  var reveals = document.querySelectorAll(".reveal");
  if (reduce) {
    reveals.forEach(function (el) { el.classList.add("in"); });
    return;
  }

  function animateValue(obj) {
    obj.classList.add("counted");
    var target = parseFloat(obj.getAttribute("data-count"));
    var duration = 1500;
    var decimals = parseInt(obj.getAttribute("data-decimals") || "0", 10);
    var prefix = obj.getAttribute("data-prefix") || "";
    var suffix = obj.getAttribute("data-suffix") || "";
    var useSeparator = obj.getAttribute("data-sep") === "1";
    var finalText = obj.textContent;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var ease = progress * (2 - progress);
      var current = ease * target;
      var formatted = current.toFixed(decimals);
      if (useSeparator) formatted = parseInt(formatted, 10).toLocaleString("pt-BR");
      else formatted = formatted.replace(".", ",");
      obj.textContent = prefix + formatted + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else obj.textContent = finalText;
    }

    obj.textContent = prefix + (decimals ? "0," + "0".repeat(decimals) : "0") + suffix;
    requestAnimationFrame(step);
  }

  if (!("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      var num = entry.target.querySelector(".num");
      if (num && !num.classList.contains("counted")) animateValue(num);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  reveals.forEach(function (el) { observer.observe(el); });
})();
