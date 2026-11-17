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

  var video = document.getElementById("heroVideo");
  var pauseBtn = document.getElementById("heroPause");
  function setPaused(paused) {
    if (!pauseBtn) return;
    pauseBtn.setAttribute("aria-pressed", paused ? "true" : "false");
    var icon = pauseBtn.querySelector("i");
    var label = pauseBtn.querySelector("span");
    if (icon) icon.className = paused ? "fa-solid fa-play" : "fa-solid fa-pause";
    if (label) label.textContent = paused ? "Reproduzir vídeo" : "Pausar vídeo";
    pauseBtn.setAttribute("aria-label", paused ? "Reproduzir vídeo de fundo" : "Pausar vídeo de fundo");
  }
  if (video) {
    video.muted = true;
    if (reduce) {
      video.pause();
      video.removeAttribute("autoplay");
      setPaused(true);
    } else {
      var play = video.play();
      if (play && play.catch) play.catch(function () { setPaused(true); });
      setPaused(false);
    }
    if (pauseBtn) {
      pauseBtn.addEventListener("click", function () {
        if (video.paused) {
          video.play();
          setPaused(false);
        } else {
          video.pause();
          setPaused(true);
        }
      });
    }
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

  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!reduce && fine && window.innerWidth >= 960) {
    var ring = document.createElement("div");
    ring.className = "cursor-ring";
    ring.setAttribute("aria-hidden", "true");
    document.body.appendChild(ring);
    document.body.classList.add("cursor-on");
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    document.addEventListener("mousemove", function (e) {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(follow);
    }, { passive: true });
    function follow() {
      raf = 0;
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      ring.style.left = cx + "px";
      ring.style.top = cy + "px";
      if (Math.abs(tx - cx) > 0.4 || Math.abs(ty - cy) > 0.4) raf = requestAnimationFrame(follow);
    }
    document.addEventListener("mouseover", function (e) {
      document.body.classList.toggle("cursor-hot", !!e.target.closest("a, button, summary, .proj"));
    });
    window.addEventListener("scroll", function () {
      var shift = (-window.scrollY * 0.15) % 240;
      document.documentElement.style.setProperty("--opart-x", shift + "px");
    }, { passive: true });
  }

  if (reduce || !("IntersectionObserver" in window)) return;

  var reveals = document.querySelectorAll(".reveal");
  function animateValue(obj) {
    if (obj.classList.contains("counted")) return;
    obj.classList.add("counted");
    var target = parseFloat(obj.getAttribute("data-count"));
    var duration = 1200;
    var decimals = parseInt(obj.getAttribute("data-decimals") || "0", 10);
    var prefix = obj.getAttribute("data-prefix") || "";
    var suffix = obj.getAttribute("data-suffix") || "";
    var sep = obj.getAttribute("data-sep") === "1";
    var finalText = obj.textContent;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = p * (2 - p);
      var current = eased * target;
      var formatted = current.toFixed(decimals);
      if (sep) formatted = parseInt(formatted, 10).toLocaleString("pt-BR");
      else formatted = formatted.replace(".", ",");
      obj.textContent = prefix + formatted + suffix;
      if (p < 1) requestAnimationFrame(step);
      else obj.textContent = finalText;
    }
    obj.textContent = prefix + (decimals ? "0," + "0".repeat(decimals) : "0") + suffix;
    requestAnimationFrame(step);
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      var num = entry.target.querySelector(".num");
      if (num) animateValue(num);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2 });
  reveals.forEach(function (el) { observer.observe(el); });
})();
