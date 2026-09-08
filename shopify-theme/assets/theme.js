/* ==========================================================================
   Lobelle — téma viselkedések
   Külső könyvtár nélkül, natív böngésző API-kkal.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     Fejléc: lenyíló menük és mobil menü
     --------------------------------------------------------------------- */

  function initHeader() {
    var toggles = document.querySelectorAll("[data-nav-toggle]");

    function closeAll(except) {
      toggles.forEach(function (toggle) {
        if (toggle === except) return;
        var panel = document.getElementById(toggle.getAttribute("aria-controls"));
        toggle.setAttribute("aria-expanded", "false");
        if (panel) panel.hidden = true;
      });
    }

    toggles.forEach(function (toggle) {
      var panel = document.getElementById(toggle.getAttribute("aria-controls"));
      if (!panel) return;
      toggle.addEventListener("click", function (event) {
        event.stopPropagation();
        var open = toggle.getAttribute("aria-expanded") === "true";
        closeAll(toggle);
        toggle.setAttribute("aria-expanded", String(!open));
        panel.hidden = open;
      });
    });

    document.addEventListener("click", function (event) {
      if (!event.target.closest("[data-nav-item]")) closeAll();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeAll();
    });

    var burger = document.querySelector("[data-menu-toggle]");
    var mobile = document.getElementById("mobile-menu");
    if (burger && mobile) {
      burger.addEventListener("click", function () {
        var open = burger.getAttribute("aria-expanded") === "true";
        burger.setAttribute("aria-expanded", String(!open));
        mobile.hidden = open;
      });
    }
  }

  /* ---------------------------------------------------------------------
     Accordion (GYIK)
     --------------------------------------------------------------------- */

  function initAccordions() {
    document.querySelectorAll("[data-accordion-button]").forEach(function (button) {
      var panel = document.getElementById(button.getAttribute("aria-controls"));
      if (!panel) return;
      button.addEventListener("click", function () {
        var open = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!open));
        panel.hidden = open;
      });
    });
  }

  /* ---------------------------------------------------------------------
     Termékgaléria: bélyegképre kattintva vált a fő kép
     --------------------------------------------------------------------- */

  function initGallery() {
    var main = document.querySelector("[data-gallery-main]");
    if (!main) return;
    document.querySelectorAll("[data-gallery-thumb]").forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        main.src = thumb.getAttribute("data-image");
        main.srcset = thumb.getAttribute("data-srcset") || "";
        main.alt = thumb.getAttribute("data-alt") || "";
        document.querySelectorAll("[data-gallery-thumb]").forEach(function (other) {
          other.setAttribute("aria-current", String(other === thumb));
        });
      });
    });
  }

  /* ---------------------------------------------------------------------
     Mennyiségválasztó
     --------------------------------------------------------------------- */

  function initQuantity() {
    document.querySelectorAll("[data-quantity]").forEach(function (wrapper) {
      var input = wrapper.querySelector("input");
      if (!input) return;
      wrapper.querySelectorAll("[data-quantity-change]").forEach(function (button) {
        button.addEventListener("click", function () {
          var step = parseInt(button.getAttribute("data-quantity-change"), 10);
          var min = parseInt(input.getAttribute("min") || "1", 10);
          var next = (parseInt(input.value, 10) || min) + step;
          input.value = String(Math.max(min, next));
          input.dispatchEvent(new Event("change", { bubbles: true }));
        });
      });
    });
  }

  /* ---------------------------------------------------------------------
     Kosár: mennyiség módosítása és tétel törlése oldalfrissítés nélkül
     --------------------------------------------------------------------- */

  function updateCart(line, quantity) {
    var root = window.Shopify && window.Shopify.routes ? window.Shopify.routes.root : "/";
    return fetch(root + "cart/change.js", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ line: line, quantity: quantity }),
    }).then(function (response) {
      if (!response.ok) throw new Error("A kosár frissítése nem sikerült.");
      window.location.reload();
    });
  }

  function initCart() {
    document.querySelectorAll("[data-cart-remove]").forEach(function (button) {
      button.addEventListener("click", function () {
        button.disabled = true;
        updateCart(parseInt(button.getAttribute("data-cart-remove"), 10), 0).catch(function () {
          button.disabled = false;
        });
      });
    });

    document.querySelectorAll("[data-cart-quantity]").forEach(function (input) {
      input.addEventListener("change", function () {
        var line = parseInt(input.getAttribute("data-cart-quantity"), 10);
        var quantity = Math.max(0, parseInt(input.value, 10) || 0);
        updateCart(line, quantity).catch(function () {});
      });
    });
  }

  /* ---------------------------------------------------------------------
     Kollekció rendezése
     --------------------------------------------------------------------- */

  function initSort() {
    var select = document.querySelector("[data-sort-by]");
    if (!select) return;
    select.addEventListener("change", function () {
      var url = new URL(window.location.href);
      url.searchParams.set("sort_by", select.value);
      url.searchParams.delete("page");
      window.location.href = url.toString();
    });
  }

  /* ---------------------------------------------------------------------
     Finom scroll fade-in
     --------------------------------------------------------------------- */

  function initFadeIn() {
    var items = document.querySelectorAll(".fade-in");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (item) { item.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach(function (item) { observer.observe(item); });
  }

  /* ---------------------------------------------------------------------
     Indítás — a Shopify téma szerkesztőjében újratöltés után is
     --------------------------------------------------------------------- */

  function init() {
    initHeader();
    initAccordions();
    initGallery();
    initQuantity();
    initCart();
    initSort();
    initFadeIn();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  document.addEventListener("shopify:section:load", init);
})();
