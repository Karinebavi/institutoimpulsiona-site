/* Menu, vídeo, contadores, doação e formulário. Sem biblioteca. */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) document.documentElement.classList.add("js");

  var WHATS = "5531997924630";
  var EMAIL = "contato@institutoimpulsiona.com.br";

  var ano = document.getElementById("ano");
  if (ano) ano.textContent = String(new Date().getFullYear());

  var header = document.getElementById("header");
  function onScroll() {
    if (!header || header.classList.contains("is-solid")) return;
    header.classList.toggle("scrolled", window.scrollY > 24);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

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
        var valor = b.getAttribute("data-v");
        var label = valor === "outro" ? "Apoiar (outro valor)" : "Apoiar com R$ " + valor;
        var msg = valor === "outro"
          ? "Olá! Quero apoiar o Instituto Impulsiona com uma doação. Pode me ajudar?"
          : "Olá! Quero apoiar o Instituto Impulsiona com uma doação de R$ " + valor + ". Pode me ajudar?";
        doarBtn.href = "https://wa.me/" + WHATS + "?text=" + encodeURIComponent(msg);
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
      var nome = (document.getElementById("fNome").value || "").trim();
      var email = (document.getElementById("fEmail").value || "").trim();
      var msg = (document.getElementById("fMsg").value || "").trim();
      var corpo = "Nome: " + (nome || "-") + "\nE-mail: " + (email || "-") + "\n\n" + (msg || "");
      if (btn.getAttribute("data-via") === "whats") {
        window.open("https://wa.me/" + WHATS + "?text=" + encodeURIComponent("Olá, Instituto Impulsiona!\n\n" + corpo), "_blank", "noopener");
      } else {
        window.location.href = "mailto:" + EMAIL
          + "?subject=" + encodeURIComponent("Contato pelo site — " + (nome || ""))
          + "&body=" + encodeURIComponent(corpo);
      }
    });
  }

  function openHash() {
    var id = (location.hash || "").slice(1);
    if (!id) return;
    var el = document.getElementById(id);
    if (!el) return;
    var d = el.querySelector("details");
    if (d) d.open = true;
  }
  openHash();
  window.addEventListener("hashchange", openHash);

})();
