(function () {
  "use strict";
  window.__BRAND__ = {
    name: "Gazzabini Mates",
    tagline: "El mate que merecés.",
    taglineSub: "Mates artesanales y termomates de calidad premium para los que toman en serio el ritual.",
    whatsapp: "595973453838",
    whatsappMsg: "Hola! Vi la web de Gazzabini Mates y me interesa un producto 🧉",
    instagram: "gazzabinimates",
    email: "gazzabinimates@gmail.com",

    categories: ["Todos", "Mates", "Termomates", "Combos", "Yerba Mate"],

    products: [
      { id: "m-001", name: "Imperial Madera",          category: "Mates",      price: "250.000", currency: "Gs.", photo: "assets/img/mate-1.webp",                        badge: "Más vendido" },
      { id: "m-002", name: "Imperial Cuero Liso",      category: "Mates",      price: "350.000", currency: "Gs.", photo: "assets/img/mate-2.webp",                        badge: "" },
      { id: "m-003", name: "Imperial Cuero Repujado",  category: "Mates",      price: "350.000", currency: "Gs.", photo: "assets/img/mate-3.webp",                        badge: "Nuevo" },
      { id: "m-004", name: "Imperial Azteca",          category: "Mates",      price: "350.000", currency: "Gs.", photo: "assets/img/photo_1_2026-05-29_23-48-17.webp",  badge: "" },
      { id: "m-005", name: "Imperial Arabesco",        category: "Mates",      price: "350.000", currency: "Gs.", photo: "assets/img/photo_6_2026-05-29_23-48-17.webp",  badge: "" },
      { id: "m-006", name: "Imperial Diamante",        category: "Mates",      price: "350.000", currency: "Gs.", photo: "assets/img/photo_9_2026-05-29_23-48-17.webp",  badge: "" },
      { id: "m-007", name: "Imperial Liso Redondo",    category: "Mates",      price: "350.000", currency: "Gs.", photo: "assets/img/photo_15_2026-05-29_23-48-17.webp", badge: "" },
      { id: "m-008", name: "Imperial Madera Clara",    category: "Mates",      price: "250.000", currency: "Gs.", photo: "assets/img/photo_28_2026-05-29_23-48-17.webp", badge: "" },
      { id: "m-009", name: "Imperial Repujado Patas",  category: "Mates",      price: "350.000", currency: "Gs.", photo: "assets/img/photo_14_2026-05-29_23-48-17.webp", badge: "" },
      { id: "m-010", name: "Imperial Doble Virola",    category: "Mates",      price: "350.000", currency: "Gs.", photo: "assets/img/photo_16_2026-05-29_23-48-17.webp", badge: "Exclusivo" },
      { id: "m-011", name: "Imperial Cilíndrico",      category: "Mates",      price: "350.000", currency: "Gs.", photo: "assets/img/photo_17_2026-05-29_23-48-17.webp", badge: "" },
      { id: "m-012", name: "Imperial Bola Trenzado",   category: "Mates",      price: "350.000", currency: "Gs.", photo: "assets/img/photo_19_2026-05-29_23-48-17.webp", badge: "" },
      { id: "m-013", name: "Imperial Arabescos",       category: "Mates",      price: "350.000", currency: "Gs.", photo: "assets/img/photo_21_2026-05-29_23-48-17.webp", badge: "" },
      { id: "m-014", name: "Imperial Corona",          category: "Mates",      price: "350.000", currency: "Gs.", photo: "assets/img/photo_23_2026-05-29_23-48-17.webp", badge: "" },
      { id: "m-015", name: "Imperial Madera Oscura",   category: "Mates",      price: "250.000", currency: "Gs.", photo: "assets/img/photo_26_2026-05-29_23-48-17.webp", badge: "" },
      { id: "m-016", name: "Imperial Calabaza Natural",category: "Mates",      price: "350.000", currency: "Gs.", photo: "assets/img/photo_27_2026-05-29_23-48-17.webp", badge: "Nuevo" },
      { id: "t-001", name: "Hydrate Clásico Beige",    category: "Termomates", price: "180.000", currency: "Gs.", photo: "assets/img/termo-1.webp",                       badge: "Top ventas" },
      { id: "t-002", name: "Hydrate con Asa Rojo",     category: "Termomates", price: "220.000", currency: "Gs.", photo: "assets/img/termo-2.webp",                       badge: "" },
      { id: "t-003", name: "Hydrate con Asa Azul",     category: "Termomates", price: "245.000", currency: "Gs.", photo: "assets/img/termo-3.webp",                       badge: "Edición especial" },
      { id: "c-001", name: "Combo Starter",            category: "Combos",     price: "240.000", currency: "Gs.", photo: "assets/img/mate-1.webp",                        badge: "Ahorrás 25.000 Gs." },
      { id: "c-002", name: "Combo Full",               category: "Combos",     price: "320.000", currency: "Gs.", photo: "assets/img/termo-2.webp",                       badge: "Mejor valor" },
      { id: "y-001", name: "Sara Extra Suave",         category: "Yerba Mate", price: "60.000",  currency: "Gs.", photo: "assets/img/photo_2026-06-02_00-06-28.webp",     badge: "Nuevo" },
      { id: "y-002", name: "Sara Tradicional",         category: "Yerba Mate", price: "60.000",  currency: "Gs.", photo: "assets/img/photo_2026-06-02_00-06-38.webp",     badge: "Más vendida" },
      { id: "y-003", name: "Sara Compuesta",           category: "Yerba Mate", price: "60.000",  currency: "Gs.", photo: "assets/img/photo_2026-06-02_00-06-40.webp",     badge: "Sin TACC" }
    ],

    features: [
      { icon: "🧉", title: "Mates artesanales",  text: "Seleccionados uno a uno, curados para un sabor limpio desde el primer mate." },
      { icon: "🌡️", title: "Termomates duraderos", text: "6 a 12 horas de temperatura óptima. Sin pérdidas, sin compromisos." },
      { icon: "🚚", title: "Entrega rápida",      text: "Asunción y Gran Asunción. Coordinamos entrega por WhatsApp en el momento." },
      { icon: "💬", title: "Atención personal",   text: "Hablás directo con nosotros. Sin formularios, sin esperas, sin robots." }
    ],

    testimonials: [
      { name: "Lucía R.",   city: "Asunción",    text: "El termomate es una locura, lo llevo a todos lados. Y el mate de madera quedó curado perfecto.", stars: 5 },
      { name: "Mateo G.",   city: "Luque",       text: "Compré el combo starter y fue la mejor decisión. Todo de muy buena calidad y entregaron rápido.", stars: 5 },
      { name: "Valeria S.", city: "San Lorenzo", text: "Siempre compro acá. El trato es excelente y los productos no defraudan nunca.", stars: 5 }
    ]
  };
})();
