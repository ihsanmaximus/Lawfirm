/* ===== CONFIG — ganti data placeholder di sini ===== */
const CONFIG = {
  name: "Ayyash Hafidz",
  whatsapp: "6282363886904",          // contoh: "6281234567890" (kode negara, tanpa + atau 0 di depan). Kosong = tombol memakai email.
  waMessage: "Assalamu'alaikum warahmatullahi wabarakatuh.\n\nSaya mengunjungi website Ayyash Hafidz dan ingin berkonsultasi mengenai permasalahan hukum yang sedang saya hadapi.\n\nMohon informasi mengenai layanan konsultasi dan langkah awal yang dapat saya lakukan.\n\nTerima kasih.",
  email: "",             // contoh: "nama@domain.com"
  linkedin: "",          // URL lengkap; kosong = disembunyikan
  instagram: "",
  tiktok: "",
  facebook: "",
  threads: "",         // URL lengkap; kosong = disembunyikan
  firm: ""               // opsional: afiliasi firma; kosong = tidak ditampilkan
};

(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* Tombol "Hubungi Saya": WhatsApp > email > scroll ke #kontak */
  const waUrl = CONFIG.whatsapp ? `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.waMessage)}` : "";
  const mailUrl = CONFIG.email ? `mailto:${CONFIG.email}?subject=${encodeURIComponent("Konsultasi Hukum")}` : "";
  $$(".js-wa").forEach(a => {
    const url = waUrl || mailUrl;
    if (url) { a.href = url; if (waUrl) { a.target = "_blank"; a.rel = "noopener"; } }
    else { a.href = "#kontak"; }
  });

  /* Footer: kontak, sosial, firma opsional, tahun */
  const show = (sel, text, href) => { const el = $(sel); if (!el || !href) return; el.hidden = false; if (text) el.textContent = text; el.href = href; };
  show(".js-mail", CONFIG.email, mailUrl);
  show(".js-linkedin", "", CONFIG.linkedin);
  show(".js-instagram", "", CONFIG.instagram);
  show(".js-tiktok", "", CONFIG.tiktok);
  show(".js-facebook", "", CONFIG.facebook);
  show(".js-threads", "", CONFIG.threads);
  if (CONFIG.firm) { const f = $(".js-firm"); f.hidden = false; f.textContent = CONFIG.firm; }
  $(".js-year").textContent = new Date().getFullYear();
  $$("[data-name]").forEach(el => (el.textContent = CONFIG.name));

  /* Mobile menu */
  const toggle = $(".nav__toggle"), menu = $("#menu");
  const setMenu = open => {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  };
  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  $$("a", menu).forEach(a => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  /* Highlight menu aktif saat scroll */
  const links = $$('.nav__menu a[href^="#"]:not(.btn)');
  const map = new Map(links.map(a => [a.getAttribute("href").slice(1), a]));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting && map.has(e.target.id)) { links.forEach(l => l.classList.remove("is-active")); map.get(e.target.id).classList.add("is-active"); }
    }), { rootMargin: "-40% 0px -55% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }
})();
