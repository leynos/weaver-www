/* mobile-nav.js — hamburger toggle for sidebar navigation (<1024px) */
(function () {
  "use strict";

  var sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  var nav = sidebar.querySelector("nav");
  if (!nav) return;

  var header = sidebar.querySelector("[data-mobile-nav-header]");
  if (!header) return;

  /* ---- hamburger button ---- */
  var btn = document.createElement("button");
  btn.id = "mobile-nav-toggle";
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-controls", nav.id || "sidebar-nav");
  btn.setAttribute("aria-label", "Open navigation menu");
  if (!nav.id) nav.id = "sidebar-nav";
  btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  header.style.position = "relative";
  header.appendChild(btn);

  /* ---- backdrop ---- */
  var backdrop = document.createElement("div");
  backdrop.id = "mobile-nav-backdrop";
  sidebar.parentNode.insertBefore(backdrop, sidebar.nextSibling);

  /* ---- measure header height for fixed-nav offset ---- */
  function setHeaderHeight() {
    var h = header.getBoundingClientRect().height;
    sidebar.style.setProperty("--mobile-header-height", h + "px");
  }

  var previousBodyOverflow = "";

  /* ---- open / close helpers ---- */
  function open() {
    sidebar.classList.add("mobile-nav-open");
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", "Close navigation menu");
    btn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setHeaderHeight();
  }

  function close() {
    sidebar.classList.remove("mobile-nav-open");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open navigation menu");
    btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    document.body.style.overflow = previousBodyOverflow;
  }

  function isOpen() {
    return sidebar.classList.contains("mobile-nav-open");
  }

  /* ---- event listeners ---- */
  btn.addEventListener("click", function () {
    if (isOpen()) close();
    else open();
  });

  backdrop.addEventListener("click", close);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen()) close();
  });

  /* close menu if viewport crosses the 1024px breakpoint */
  var mql = window.matchMedia("(min-width: 1024px)");
  function onBreakpoint() {
    if (mql.matches && isOpen()) close();
  }
  if (mql.addEventListener) mql.addEventListener("change", onBreakpoint);
  else mql.addListener(onBreakpoint); /* Safari <14 */
})();
