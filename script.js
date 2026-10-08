const services = [
  { category: "PRINCIPAIS SERVIÇOS", name: "Arte avulsa + Copy (por arte)", price: 147 },
  { category: "PRINCIPAIS SERVIÇOS", name: "Google Meu Negócio (Mensal) [PARCERIA NOBRK]", price: 297 },
  { category: "PRINCIPAIS SERVIÇOS", name: "Gestão de redes sociais (por unidade, mensal)", price: 297 },
  { category: "PRINCIPAIS SERVIÇOS", name: "Captação foto ou vídeo institucional sem edição (por hora)", price: 497 },
  { category: "PRINCIPAIS SERVIÇOS", name: "Consultoria de marketing (por hora)", price: 497 },
  { category: "PRINCIPAIS SERVIÇOS", name: "Vídeo 3min - Gravação e edição simples (por unidade)", price: 497 },
  { category: "PRINCIPAIS SERVIÇOS", name: "Vídeo 3min - Gravação e edição elaborada (por unidade)", price: 997 },
  { category: "PRINCIPAIS SERVIÇOS", name: "Drone Filmagens Aéreas (por trabalho)", price: 997 },
  { category: "PRINCIPAIS SERVIÇOS", name: "Marketing de conteúdo (Mensal)", price: 997 },
  { category: "PRINCIPAIS SERVIÇOS", name: "Logomarca e Identidade visual completa (por projeto)", price: 1997 },
  { category: "PRINCIPAIS SERVIÇOS", name: "Tráfego pago (Mensal)", price: 1997 },
  { category: "PRINCIPAIS SERVIÇOS", name: "Landing Pages - Design + Copy (por trabalho)", price: 2497 },
  { category: "PRINCIPAIS SERVIÇOS", name: "Site Institucional/Comercial - Design + Copy (por trabalho)", price: 5497 },

  { category: "TEXTOS", name: "Texto de até 500 caracteres", price: 47 },
  { category: "TEXTOS", name: "Texto de até 1.000 caracteres", price: 77 },
  { category: "TEXTOS", name: "Texto de até 1.500 caracteres", price: 117 },
  { category: "TEXTOS", name: "Texto de até 2.000 caracteres", price: 147 },
  { category: "TEXTOS", name: "Texto de até 3.000 caracteres", price: 187 },
  { category: "TEXTOS", name: "Texto de até 5.000 caracteres", price: 287 },
  { category: "TEXTOS", name: "Texto de até 10.000 caracteres", price: 447 },

  { category: "DESIGN", name: "Design de Materiais impressos (por peça)", price: 397 },
  { category: "DESIGN", name: "Design de apresentações (até 10 slides)", price: 397 },
  { category: "DESIGN", name: "Design de Embalagens e rótulos (por unidade)", price: 397 },

  { category: "VÍDEO E EDIÇÃO", name: "Edição de Vídeo (até 3min)", price: 247 },
  { category: "VÍDEO E EDIÇÃO", name: "Storymaker (por até 3 horas)", price: 797 },
  { category: "VÍDEO E EDIÇÃO", name: "Cobertura de eventos com entrega de até 50 fotos editadas (casamentos e aniversários)", price: 1997 },
  { category: "VÍDEO E EDIÇÃO", name: "Cobertura de eventos com entrega de 1 vídeo de até 3 minutos (casamentos e aniversários)", price: 1997 },

  { category: "OUTROS", name: "Promoters (por até 4h)", price: 397 },
  { category: "OUTROS", name: "Assessoria de Imprensa (Mensal)", price: 997 },
  { category: "OUTROS", name: "Comunicação interna e endomarketing (Mensal)", price: 997 },
  { category: "OUTROS", name: "Media training (Mensal)", price: 997 },
  { category: "OUTROS", name: "Inbound marketing (Mensal)", price: 997 },
  { category: "OUTROS", name: "Hospedagem, análise de SEO e suporte técnico (Mensal)", price: 997 },
  { category: "OUTROS", name: "Atualização de produtos Site E-commerce (Mensal)", price: 997 },
  { category: "OUTROS", name: "Planejamento de marketing (por projeto)", price: 1997 },
  { category: "OUTROS", name: "Posicionamento de marca, Branding e rebranding (por projeto)", price: 1997 },
  { category: "OUTROS", name: "Gerenciamento de crise (Mensal)", price: 1997 },
  { category: "OUTROS", name: "Pesquisa de mercado, Análise de concorrência, Definição de público-alvo e persona (por unidade)", price: 1997 },
  { category: "OUTROS", name: "Produção e organização de eventos (por evento)", price: 1997 },
  { category: "OUTROS", name: "Site E-commerce (por trabalho)", price: 8997 },
];

const selected = {};
const servicesContainer = document.getElementById("services-container");
const summaryItemsContainer = document.getElementById("summary-items");
const subtotalValue = document.getElementById("subtotal-value");
const discountValue = document.getElementById("discount-value");
const economyValue = document.getElementById("economy-value");
const totalValue = document.getElementById("total-value");
const discountLabel = document.getElementById("discount-label");

function formatMoney(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
}

function getSelectedItems() {
  return services.filter((service) => (selected[service.name] || 0) > 0);
}

function getTotals() {
  const items = getSelectedItems();

  const subtotal = items.reduce((sum, service) => {
    return sum + service.price * (selected[service.name] || 0);
  }, 0);

  const hasMoreThanSixUnits = items.some((service) => (selected[service.name] || 0) > 6);
  const hasMoreThanSixServices = items.length > 6;

  const hasDiscount = hasMoreThanSixUnits || hasMoreThanSixServices;
  const discountPercent = hasDiscount ? 20 : 0;
  const discountAmount = subtotal * (discountPercent / 100);
  const total = subtotal - discountAmount;

  return {
    subtotal,
    discountPercent,
    discountAmount,
    total,
    items,
    hasDiscount,
  };
}

function renderServicePicker() {
  const categories = [...new Set(services.map((service) => service.category))];

  servicesContainer.innerHTML = categories
    .map((category) => {
      const items = services.filter((service) => service.category === category);

      const markup = `
        <div class="category-block">
          <h2 class="category-title">${category}</h2>
          <div class="service-grid">
            ${items
              .map((service) => {
                const quantity = selected[service.name] || 0;

                return `
                  <div class="service-item">
                    <div class="service-copy">
                      <p class="service-name">${service.name}</p>
                      <p class="service-price">${formatMoney(service.price)}</p>
                    </div>

                    <div class="quantity-controls" aria-label="${service.name}">
                      <button class="qty-button" type="button" data-action="decrease" data-name="${service.name}">−</button>
                      <span class="qty-value">${quantity}</span>
                      <button class="qty-button" type="button" data-action="increase" data-name="${service.name}">+</button>
                    </div>
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>
      `;

      return markup;
    })
    .join("");
}

function renderSummary() {
  const totals = getTotals();
  const items = totals.items;

  if (!items.length) {
    summaryItemsContainer.innerHTML = `
      <div class="empty-state">
        Nenhum item selecionado. Escolha os serviços desejados para montar seu orçamento.
      </div>
    `;
  } else {
    summaryItemsContainer.innerHTML = items
      .map((service) => {
        const quantity = selected[service.name] || 0;
        const lineTotal = service.price * quantity;
        return `
          <div class="summary-item">
            <span>${service.name} × ${quantity}</span>
            <strong>${formatMoney(lineTotal)}</strong>
          </div>
        `;
      })
      .join("");
  }

  subtotalValue.textContent = formatMoney(totals.subtotal);

  if (totals.hasDiscount) {
    discountLabel.textContent = "Desconto do combo";
    discountValue.textContent = `- ${formatMoney(totals.discountAmount)}`;
    discountValue.style.color = "#1f8f5f";
    economyValue.textContent = formatMoney(totals.discountAmount);
  } else {
    discountLabel.textContent = "Desconto do combo";
    discountValue.textContent = "R$ 0,00";
    discountValue.style.color = "#1f8f5f";
    economyValue.textContent = "R$ 0,00";
  }

  totalValue.textContent = formatMoney(totals.total);
}

function updateQuantity(name, delta) {
  const current = selected[name] || 0;
  const next = Math.max(0, current + delta);
  if (next === 0) {
    delete selected[name];
  } else {
    selected[name] = next;
  }

  renderServicePicker();
  renderSummary();
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".qty-button");
    if (!button) return;

    const name = button.dataset.name;
    const action = button.dataset.action;

    updateQuantity(name, action === "increase" ? 1 : -1);
  });

  document.getElementById("reset-button").addEventListener("click", () => {
    Object.keys(selected).forEach((key) => delete selected[key]);
    renderServicePicker();
    renderSummary();
  });

  document.getElementById("whatsapp-submit").addEventListener("click", () => {
    const totals = getTotals();
    const items = totals.items;

    if (!items.length) {
      alert("Selecione pelo menos um serviço antes de enviar o orçamento.");
      return;
    }

    const message = buildWhatsAppMessage(items, totals);
    const number = "553399567023";
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  });
}

function buildWhatsAppMessage(items, totals) {
  const intro = `Olá! Sou [nome do cliente], da [nome da empresa do cliente].\n\nMontei meu orçamento pelo link da Agência KE:\n\n`;

  const itemLines = items
    .map((service) => `* ${service.name} — ${selected[service.name]}x`)
    .join("\n");

  const discountLine =
    totals.hasDiscount
      ? `Desconto do combo: ${totals.discountPercent}%`
      : "Desconto do combo: 0%";

  const economyLine =
    totals.hasDiscount ? `Economia: ${formatMoney(totals.discountAmount)}` : "Economia: R$ 0,00";

  return `${intro}${itemLines}

━━━━━━━━━━━━━━━━

Subtotal: ${formatMoney(totals.subtotal)}

${discountLine}

${economyLine}

TOTAL: ${formatMoney(totals.total)}

━━━━━━━━━━━━━━━━

Meu WhatsApp:
[contato do cliente]

Gostaria de receber as condições e confirmar este orçamento.`;
}

renderServicePicker();
renderSummary();
bindEvents();
