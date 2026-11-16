/* ==========================================================
   ✏️  EDIT YOUR CONTACT INFO HERE — it updates every page.
   ========================================================== */
const SITE = {
  name: "JML Sazón",
  phoneDisplay: "+1 (212) 321-0666",   // how the number is shown
  phone: "+12123210666",               // digits only, with +1, for tap-to-call
  whatsapp: "12123210666",             // digits only, no + (for wa.me links)
  email: "Mariela8879@gmail.com",
  instagram: "jmlsazon88",             // Instagram username, no @ (leave "" to hide)
  area: "108th Street, Manhattan",     // where she delivers

  // Zelle — customers send payment to this number in their bank app
  zellePhone: "+1 (212) 321-0666",
  zelleName: "Mariela",                // name customers will see in Zelle — make sure it matches her bank
};

/* ---------------- Nothing below needs editing ---------------- */
const PAGES = [
  ["index.html", "Inicio"],
  ["menu.html", "Menú"],
  ["nosotros.html", "Nosotros"],
  ["mariela.html", "Mariela"],
  ["pedidos.html", "Pedidos"],
  ["contacto.html", "Contacto"],
];

const WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zm8.4-18.2C18.2 1.3 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12 0-3.2-1.3-6.2-3.6-8.4z"/></svg>';

const waLink = (msg = "¡Hola JML Sazón! Quisiera hacer un pedido.") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;

function buildHeader() {
  const here = location.pathname.split("/").pop() || "index.html";
  const links = PAGES.map(([href, label]) =>
    `<li><a href="${href}"${href === here ? ' aria-current="page"' : ""}>${label}</a></li>`
  ).join("");
  return `
    <div class="flag-stripe"></div>
    <nav class="nav container" aria-label="Principal">
      <a class="brand" href="index.html"><span class="jml">JML</span><span class="sazon">Sazón</span></a>
      <button class="nav-toggle" aria-label="Abrir menú" aria-expanded="false">☰</button>
      <ul class="nav-links">${links}</ul>
    </nav>`;
}

function buildFooter() {
  const ig = SITE.instagram
    ? `<li>📸 <a data-instagram></a></li>` : "";
  return `
    <div class="container footer-grid">
      <div>
        <h4>JML Sazón</h4>
        <p>Comida ecuatoriana hecha en casa — ceviches y encebollados con el sabor de nuestra tierra, para tu familia. 🇪🇨</p>
      </div>
      <div>
        <h4>Páginas</h4>
        <ul>${PAGES.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul>
      </div>
      <div>
        <h4>Contacto</h4>
        <ul>
          <li>📞 <a data-phone></a></li>
          <li>✉️ <a data-email></a></li>
          <li>💜 <a href="pedidos.html#zelle">Pagar con Zelle</a></li>
          ${ig}
        </ul>
      </div>
    </div>
    <p class="copyright">© ${new Date().getFullYear()} JML Sazón · Tradición ecuatoriana en cada plato ♡</p>`;
}

document.addEventListener("DOMContentLoaded", () => {
  // Header, footer, floating WhatsApp button
  const header = document.querySelector(".site-header");
  if (header) header.innerHTML = buildHeader();
  const footer = document.querySelector(".site-footer");
  if (footer) footer.innerHTML = buildFooter();

  const fab = document.createElement("a");
  fab.className = "wa-float";
  fab.href = waLink();
  fab.target = "_blank";
  fab.rel = "noopener";
  fab.setAttribute("aria-label", "Escríbenos por WhatsApp");
  fab.innerHTML = WA_ICON;
  document.body.appendChild(fab);

  // Fill contact info everywhere
  document.querySelectorAll("[data-phone]").forEach(el => {
    el.href = `tel:${SITE.phone}`;
    if (!el.dataset.keepText) el.textContent = SITE.phoneDisplay;
  });
  document.querySelectorAll("[data-email]").forEach(el => {
    el.href = `mailto:${SITE.email}`;
    if (!el.dataset.keepText) el.textContent = SITE.email;
  });
  document.querySelectorAll("[data-whatsapp]").forEach(el => {
    el.href = el.dataset.waMsg ? waLink(el.dataset.waMsg) : waLink();
    el.target = "_blank";
    el.rel = "noopener";
  });
  document.querySelectorAll("[data-area]").forEach(el => (el.textContent = SITE.area));
  document.querySelectorAll("[data-instagram]").forEach(el => {
    if (!SITE.instagram) { (el.closest("[data-instagram-wrap]") || el).remove(); return; }
    el.href = `https://www.instagram.com/${SITE.instagram}/`;
    el.target = "_blank";
    el.rel = "noopener";
    if (!el.dataset.keepText) el.textContent = `@${SITE.instagram}`;
  });
  document.querySelectorAll("[data-zelle-phone]").forEach(el => (el.textContent = SITE.zellePhone));
  document.querySelectorAll("[data-zelle-name]").forEach(el => (el.textContent = SITE.zelleName));

  // "Copy number" button for Zelle
  document.querySelectorAll("[data-zelle-copy]").forEach(btn => {
    const original = btn.textContent;
    btn.addEventListener("click", async () => {
      const digits = SITE.zellePhone.replace(/[^\d]/g, "").replace(/^1(?=\d{10}$)/, "");
      try {
        await navigator.clipboard.writeText(digits);
        btn.textContent = "✅ ¡Número copiado!";
      } catch {
        btn.textContent = `Número: ${digits}`;
      }
      setTimeout(() => (btn.textContent = original), 2500);
    });
  });

  // Mobile menu
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  const setMenu = open => {
    links.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.textContent = open ? "✕" : "☰";
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  };
  toggle?.addEventListener("click", e => {
    e.stopPropagation();
    setMenu(!links.classList.contains("open"));
  });
  // Close the phone menu when a link is tapped, when tapping outside, or on Escape
  links?.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("click", e => {
    if (links?.classList.contains("open") && !e.target.closest(".nav")) setMenu(false);
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && links?.classList.contains("open")) setMenu(false); });

  // Order / contact form → opens WhatsApp or email with the message filled in
  document.querySelectorAll("form[data-send]").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const data = new FormData(form);
      const lines = [];
      for (const [k, v] of data.entries()) if (String(v).trim()) lines.push(`${k}: ${v}`);
      const body = `¡Hola JML Sazón!\n\n${lines.join("\n")}`;
      const via = e.submitter?.value || form.dataset.send;
      if (via === "email") {
        location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Pedido / Consulta - JML Sazón")}&body=${encodeURIComponent(body)}`;
      } else {
        window.open(waLink(body), "_blank", "noopener");
      }
    });
  });
});
