// model-data-extra.js — Dados detalhados adicionais (complementa MODEL_DETAILS de data.js)
// Cores, galerias e especificações extraídas do site oficial motochefebrasil.com.br
// e da loja motochefeitaim.com.br

Object.assign(MODEL_DETAILS, {

  // ===== AUTOPROPELIDOS =====

  mia: {
    colors: [
      { name: "Preta", hex: "#1a1a1a" },
      { name: "Azul", hex: "#1e5b94" },
      { name: "Branca", hex: "#e8e8e8" }
    ],
    gallery: [
      "modelos/mia/galeria/1.webp",
      "modelos/mia/galeria/2.webp",
      "modelos/mia/galeria/3.webp",
      "modelos/mia/galeria/4.webp",
      "modelos/mia/galeria/5.webp",
      "modelos/mia/galeria/6.webp"
    ],
    features: [
      { icon: "🚫", text: "Sem necessidade de CNH" },
      { icon: "📋", text: "Dispensa emplacamento" },
      { icon: "🔋", text: "Bateria de lítio 60V 20Ah removível" },
      { icon: "🔧", text: "Freios a disco dianteiro e traseiro" },
      { icon: "🖥️", text: "Painel digital moderno" },
      { icon: "📦", text: "Porta-treco sob o banco" },
      { icon: "🔊", text: "Alarme com sistema antifurto" },
      { icon: "🔄", text: "Marcha ré" },
      { icon: "🛡️", text: "Resistência à água IP64" },
      { icon: "🏍️", text: "Banco duplo com baú" }
    ],
    specs: [
      { label: "Motor", value: "1000W" },
      { label: "Tipo de Bateria", value: "Lítio 60V 20Ah (removível)" },
      { label: "Autonomia", value: "até 40 km" },
      { label: "Velocidade Máxima", value: "32 km/h" },
      { label: "Escalada", value: "30°" },
      { label: "Carga Máxima", value: "150 kg" },
      { label: "Carregador", value: "Bivolt 110/220V" },
      { label: "Tempo de Recarga", value: "6 a 8 horas" },
      { label: "Freios", value: "Disco dianteiro e traseiro" },
      { label: "Resistência à Água", value: "IP64" },
      { label: "Marcha Ré", value: "Sim" },
      { label: "NFC", value: "Não" }
    ]
  },

  "jet-max": {
    colors: [
      { name: "Azul", hex: "#1e5b94" },
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Branco", hex: "#e8e8e8" },
      { name: "Vermelho", hex: "#a01d1d" }
    ],
    gallery: [
      "modelos/jet-max/galeria/1.webp",
      "modelos/jet-max/galeria/2.webp",
      "modelos/jet-max/galeria/3.webp",
      "modelos/jet-max/galeria/4.webp",
      "modelos/jet-max/galeria/5.webp"
    ],
    features: [
      { icon: "🚫", text: "Sem necessidade de CNH" },
      { icon: "📋", text: "Dispensa emplacamento" },
      { icon: "🔋", text: "Bateria LiFePo4 60V 30Ah" },
      { icon: "📱", text: "Tecnologia NFC (pulseira e cartão)" },
      { icon: "💡", text: "Farol em LED" },
      { icon: "🖥️", text: "Painel em LED colorido" },
      { icon: "⚖️", text: "Carga máxima: 180 kg" },
      { icon: "🔄", text: "Marcha ré" },
      { icon: "🛡️", text: "Resistência à água IP64" },
      { icon: "🔊", text: "Alarme com bloqueio" }
    ],
    specs: [
      { label: "Motor", value: "1000W" },
      { label: "Tipo de Bateria", value: "Lítio Ferro Fosfato (LiFePo4) 60V 30Ah" },
      { label: "Autonomia", value: "até 55 km" },
      { label: "Velocidade Máxima", value: "32 km/h" },
      { label: "Carga Máxima", value: "180 kg" },
      { label: "Carregador", value: "Bivolt 110/220V" },
      { label: "Tempo de Recarga", value: "6 a 8 horas" },
      { label: "Freios", value: "Disco hidráulico (dianteiro e traseiro)" },
      { label: "Resistência à Água", value: "IP64" },
      { label: "Conectividade", value: "NFC (pulseira e cartão)" },
      { label: "Marcha Ré", value: "Sim" }
    ]
  },

  jet: {
    colors: [
      { name: "Azul", hex: "#1e5b94" },
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Branco", hex: "#e8e8e8" }
    ],
    gallery: [
      "modelos/jet/galeria/1.webp",
      "modelos/jet/galeria/2.webp",
      "modelos/jet/galeria/3.webp",
      "modelos/jet/galeria/4.webp",
      "modelos/jet/galeria/5.webp"
    ],
    features: [
      { icon: "🚫", text: "Sem necessidade de CNH" },
      { icon: "📋", text: "Dispensa emplacamento" },
      { icon: "🔋", text: "Bateria de lítio 60V 20Ah removível" },
      { icon: "🔧", text: "Freios hidráulicos a disco (dianteiro e traseiro)" },
      { icon: "🖥️", text: "Painel digital moderno" },
      { icon: "📦", text: "Porta-treco sob o banco" },
      { icon: "🔊", text: "Alarme com sistema antifurto" },
      { icon: "🔄", text: "Marcha ré" },
      { icon: "🏍️", text: "Baú e banco duplo" }
    ],
    specs: [
      { label: "Motor", value: "1000W" },
      { label: "Tipo de Bateria", value: "Lítio 60V 20Ah (removível)" },
      { label: "Autonomia", value: "até 40 km" },
      { label: "Velocidade Máxima", value: "32 km/h" },
      { label: "Escalada", value: "30°" },
      { label: "Carga Máxima", value: "150 kg" },
      { label: "Carregador", value: "Bivolt 110/220V" },
      { label: "Tempo de Recarga", value: "6 a 8 horas" },
      { label: "Freios", value: "Disco hidráulico (dianteiro e traseiro)" },
      { label: "Resistência à Água", value: "IP64" },
      { label: "Marcha Ré", value: "Sim" },
      { label: "NFC", value: "Não" }
    ]
  },

  bob: {
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Azul", hex: "#1e5b94" }
    ],
    gallery: [
      "modelos/bob/galeria/1.webp",
      "modelos/bob/galeria/2.webp",
      "modelos/bob/galeria/3.webp",
      "modelos/bob/galeria/4.webp",
      "modelos/bob/galeria/5.webp"
    ],
    features: [
      { icon: "🚫", text: "Sem necessidade de CNH" },
      { icon: "📋", text: "Dispensa emplacamento" },
      { icon: "🔋", text: "Bateria de lítio 60V 20A removível" },
      { icon: "🔧", text: "Freios hidráulicos a disco" },
      { icon: "🛒", text: "Cesta frontal inclusa" },
      { icon: "💡", text: "Iluminação completa (farol, setas, buzina)" },
      { icon: "🔊", text: "Alarme com sistema antifurto" },
      { icon: "⚖️", text: "Carga máxima: 180 kg" }
    ],
    specs: [
      { label: "Motor", value: "1000W" },
      { label: "Tipo de Bateria", value: "Lítio 60V 20A (removível)" },
      { label: "Autonomia", value: "até 40 km" },
      { label: "Velocidade Máxima", value: "32 km/h" },
      { label: "Carga Máxima", value: "180 kg" },
      { label: "Carregador", value: "Bivolt 110V/220V" },
      { label: "Tempo de Recarga", value: "5 a 7 horas" },
      { label: "Freios", value: "Hidráulicos a disco dianteiro" },
      { label: "Extras", value: "Cesta frontal, Suspensão dupla, Alarme" }
    ]
  },

  sofia: {
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Azul", hex: "#1e5b94" },
      { name: "Vermelha", hex: "#a01d1d" }
    ],
    gallery: [
      "modelos/sofia/galeria/1.webp",
      "modelos/sofia/galeria/2.webp",
      "modelos/sofia/galeria/3.webp",
      "modelos/sofia/galeria/4.webp",
      "modelos/sofia/galeria/5.webp",
      "modelos/sofia/galeria/6.webp"
    ],
    features: [
      { icon: "🚫", text: "Sem necessidade de CNH" },
      { icon: "📋", text: "Dispensa emplacamento" },
      { icon: "🔋", text: "Bateria de Lítio 60V 30A" },
      { icon: "📱", text: "Tecnologia NFC (pulseira e cartão)" },
      { icon: "💡", text: "Farol em LED" },
      { icon: "🖥️", text: "Painel em LED colorido" },
      { icon: "⚖️", text: "Carga máxima: 180 kg" },
      { icon: "📦", text: "Baú traseiro incluso" }
    ],
    specs: [
      { label: "Motor", value: "1000W" },
      { label: "Tipo de Bateria", value: "Lítio 60V 30A" },
      { label: "Autonomia", value: "até 40 km" },
      { label: "Velocidade Máxima", value: "32 km/h" },
      { label: "Carga Máxima", value: "180 kg" },
      { label: "Carregador", value: "Bivolt" },
      { label: "Tempo de Recarga", value: "6 a 8 horas" },
      { label: "Conectividade", value: "NFC (pulseira e cartão)" },
      { label: "Extras", value: "Baú traseiro, Amortecedor, Chave reserva" }
    ]
  },

  "joy-super": {
    colors: [
      { name: "Azul", hex: "#1e5b94" },
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Branco", hex: "#e8e8e8" },
      { name: "Cinza", hex: "#6b6b6b" },
      { name: "Vermelho", hex: "#a01d1d" }
    ],
    gallery: [
      "modelos/joy-super/galeria/1.webp",
      "modelos/joy-super/galeria/2.webp",
      "modelos/joy-super/galeria/3.webp",
      "modelos/joy-super/galeria/4.webp",
      "modelos/joy-super/galeria/5.webp",
      "modelos/joy-super/galeria/6.webp"
    ],
    features: [
      { icon: "🚫", text: "Sem necessidade de CNH" },
      { icon: "📋", text: "Dispensa emplacamento" },
      { icon: "🔋", text: "Bateria de lítio 60V 20Ah removível" },
      { icon: "🔧", text: "Freios a tambor dianteiro e traseiro" },
      { icon: "🛒", text: "Cesta frontal reforçada" },
      { icon: "🖥️", text: "Painel digital de alto contraste" },
      { icon: "⚖️", text: "Suporta até 150 kg" },
      { icon: "⚡", text: "3 níveis de velocidade" }
    ],
    specs: [
      { label: "Motor", value: "800W" },
      { label: "Tipo de Bateria", value: "Lítio 60V 20Ah (removível)" },
      { label: "Autonomia", value: "até 40 km" },
      { label: "Velocidade Máxima", value: "32 km/h" },
      { label: "Escalada", value: "20°" },
      { label: "Carga Máxima", value: "150 kg" },
      { label: "Carregador", value: "Bivolt 110/220V" },
      { label: "Tempo de Recarga", value: "6 a 8 horas" },
      { label: "Freios", value: "Tambor (dianteiro e traseiro)" },
      { label: "Rodas", value: "Ferro 14 x 2.75\"" },
      { label: "Resistência à Água", value: "IP64" },
      { label: "Peso do Veículo", value: "48,5 kg" }
    ]
  },

  "20-mini": {
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Azul", hex: "#1e5b94" },
      { name: "Vermelha", hex: "#a01d1d" }
    ],
    gallery: [
      "modelos/20-mini/galeria/1.webp",
      "modelos/20-mini/galeria/2.webp",
      "modelos/20-mini/galeria/3.webp",
      "modelos/20-mini/galeria/4.webp",
      "modelos/20-mini/galeria/5.webp"
    ],
    features: [
      { icon: "🚫", text: "Sem necessidade de CNH" },
      { icon: "📋", text: "Dispensa emplacamento" },
      { icon: "📱", text: "Chave cartão NFC" },
      { icon: "💡", text: "Farol FULL LED (3 níveis)" },
      { icon: "🔧", text: "Freio a disco hidráulico" },
      { icon: "⚖️", text: "Capacidade: até 180 kg" },
      { icon: "🔌", text: "Carregador turbo 5A bivolt" },
      { icon: "🔊", text: "Alarme antirroubo com sirene e controle" }
    ],
    specs: [
      { label: "Motor", value: "1000W" },
      { label: "Bateria", value: "Removível" },
      { label: "Autonomia", value: "até 40 km" },
      { label: "Velocidade Máxima", value: "32 km/h" },
      { label: "Carga Máxima", value: "180 kg" },
      { label: "Carregador", value: "Turbo 5A Bivolt 110/220V" },
      { label: "Tempo de Recarga", value: "até 5 horas" },
      { label: "Rodas", value: "Aro 10\" liga leve" },
      { label: "Extras", value: "NFC, Suspensão dupla, Alarme, 3 velocidades" }
    ]
  },

  ret: {
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Azul", hex: "#1e5b94" },
      { name: "Vermelha", hex: "#a01d1d" }
    ],
    gallery: [
      "modelos/ret/galeria/1.png",
      "modelos/ret/galeria/2.png",
      "modelos/ret/galeria/3.png",
      "modelos/ret/galeria/4.jpg",
      "modelos/ret/galeria/5.jpg",
      "modelos/ret/galeria/6.jpg"
    ],
    features: [
      { icon: "🚫", text: "Sem necessidade de CNH" },
      { icon: "📋", text: "Dispensa emplacamento" },
      { icon: "📱", text: "Cartão NFC no painel" },
      { icon: "💡", text: "Farol FULL LED" },
      { icon: "🔧", text: "Freio a disco hidráulico dianteiro e traseiro" },
      { icon: "🛒", text: "Cesta dianteira 30 litros" },
      { icon: "📱", text: "Suporte de celular no guidão" },
      { icon: "⚖️", text: "Suporta até 180 kg" }
    ],
    specs: [
      { label: "Motor", value: "1000W" },
      { label: "Tipo de Bateria", value: "Lítio 60V 20A (removível)" },
      { label: "Autonomia", value: "até 40 km" },
      { label: "Velocidade Máxima", value: "32 km/h" },
      { label: "Carga Máxima", value: "180 kg" },
      { label: "Carregador", value: "Turbo Bivolt 110/220V" },
      { label: "Tempo de Recarga", value: "até 5 horas" },
      { label: "Rodas", value: "Aro 10\" (New City sem câmara)" },
      { label: "Extras", value: "Cesta 30L, NFC, Suspensão dupla, Porta-garrafa" }
    ]
  },

  soma: {
    colors: [
      { name: "Prata", hex: "#b8b8b8" },
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Branco", hex: "#e8e8e8" }
    ],
    gallery: [
      "modelos/soma/galeria/1.jpg",
      "https://motochefeitaim.com.br/wp-content/uploads/Produtos/Soma/WhatsApp-Image-2024-09-12-at-13.27.37.jpeg"
    ],
    features: [
      { icon: "🚫", text: "Sem necessidade de CNH" },
      { icon: "📋", text: "Dispensa emplacamento" },
      { icon: "🔋", text: "Bateria de lítio 60V 20Ah removível" },
      { icon: "🔧", text: "Freios disco hidráulico (diant.) / tambor (tras.)" },
      { icon: "💡", text: "Faróis FULL LED" },
      { icon: "📱", text: "Tecnologia NFC" },
      { icon: "🔊", text: "Alarme antifurto" },
      { icon: "🏍️", text: "Banco duplo" }
    ],
    specs: [
      { label: "Motor", value: "1000W" },
      { label: "Tipo de Bateria", value: "Lítio 60V 20Ah (removível)" },
      { label: "Autonomia", value: "até 45 km" },
      { label: "Velocidade Máxima", value: "32 km/h" },
      { label: "Escalada", value: "12°" },
      { label: "Carga Máxima", value: "150 kg" },
      { label: "Carregador", value: "Bivolt 110/220V" },
      { label: "Tempo de Recarga", value: "6 a 8 horas" },
      { label: "Freios", value: "Disco hidráulico (diant.) / Tambor (tras.)" },
      { label: "Resistência à Água", value: "IP64" },
      { label: "NFC", value: "Sim" }
    ]
  },

  joyzinha: {
    gallery: [
      "modelos/joyzinha/galeria/1.webp"
    ],
    features: [
      { icon: "🚫", text: "Sem necessidade de CNH" },
      { icon: "📋", text: "Dispensa emplacamento" },
      { icon: "🔋", text: "Bateria de lítio" },
      { icon: "💡", text: "Design leve e compacto" }
    ],
    specs: [
      { label: "Motor", value: "600W" },
      { label: "Autonomia", value: "até 40 km" },
      { label: "Velocidade Máxima", value: "32 km/h" },
      { label: "Bateria", value: "Lítio" }
    ]
  },

  // ===== TRICICLOS =====

  "joy-tri": {
    gallery: [
      "modelos/joy-tri/galeria/1.webp"
    ],
    features: [
      { icon: "🚫", text: "Sem necessidade de CNH" },
      { icon: "📋", text: "Dispensa emplacamento" },
      { icon: "⚖️", text: "Suporta até 180 kg" },
      { icon: "🔋", text: "Bateria de lítio 60V" },
      { icon: "🛡️", text: "Estabilidade de 3 rodas" }
    ],
    specs: [
      { label: "Motor", value: "600W" },
      { label: "Tipo de Bateria", value: "Lítio 60V" },
      { label: "Autonomia", value: "até 40 km" },
      { label: "Velocidade Máxima", value: "30 km/h" },
      { label: "Carga Máxima", value: "180 kg" }
    ]
  },

  "big-tri": {
    gallery: [
      "modelos/big-tri/galeria/1.webp"
    ],
    features: [
      { icon: "🚫", text: "Sem necessidade de CNH" },
      { icon: "📋", text: "Dispensa emplacamento" },
      { icon: "👥", text: "Capacidade para 3 pessoas" },
      { icon: "⚖️", text: "Suporta até 180 kg" },
      { icon: "🖥️", text: "Painel digital" },
      { icon: "🔄", text: "Marcha ré" }
    ],
    specs: [
      { label: "Motor", value: "1000W" },
      { label: "Tipo de Bateria", value: "Lítio 60V" },
      { label: "Autonomia", value: "até 40 km" },
      { label: "Velocidade Máxima", value: "32 km/h" },
      { label: "Carga Máxima", value: "180 kg" },
      { label: "Extras", value: "Marcha ré, Painel digital" }
    ]
  },

  "mia-tri": {
    gallery: [
      "modelos/mia-tri/galeria/1.webp"
    ],
    features: [
      { icon: "🚫", text: "Sem necessidade de CNH" },
      { icon: "📋", text: "Dispensa emplacamento" },
      { icon: "🔋", text: "Bateria de lítio 60V 20Ah" },
      { icon: "🛡️", text: "Máxima estabilidade" },
      { icon: "⚖️", text: "Carga confortável e segura" }
    ],
    specs: [
      { label: "Motor", value: "800W" },
      { label: "Tipo de Bateria", value: "Lítio 60V 20Ah" },
      { label: "Autonomia", value: "até 40 km" },
      { label: "Velocidade Máxima", value: "32 km/h" }
    ]
  },

  ved: {
    gallery: [
      "modelos/ved/galeria/1.webp"
    ],
    features: [
      { icon: "🚫", text: "Sem necessidade de CNH" },
      { icon: "📋", text: "Dispensa emplacamento" },
      { icon: "🔋", text: "Bateria 60V 20Ah removível" },
      { icon: "🔄", text: "Marcha ré" },
      { icon: "🛡️", text: "Resistência à água IP64" },
      { icon: "🛡️", text: "Estabilidade de triciclo" }
    ],
    specs: [
      { label: "Motor", value: "1000W" },
      { label: "Tipo de Bateria", value: "Lítio 60V 20Ah (removível)" },
      { label: "Autonomia", value: "até 40 km" },
      { label: "Velocidade Máxima", value: "32 km/h" },
      { label: "Escalada", value: "30°" },
      { label: "Carga Máxima", value: "150 kg" },
      { label: "Carregador", value: "Bivolt 110/220V" },
      { label: "Marcha Ré", value: "Sim" },
      { label: "NFC", value: "Não" }
    ]
  },

  x15: {
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Azul", hex: "#1e5b94" },
      { name: "Vermelho", hex: "#a01d1d" },
      { name: "Branco", hex: "#e8e8e8" },
      { name: "Cinza", hex: "#6b6b6b" }
    ],
    gallery: [
      "modelos/x15/galeria/1.webp",
      "modelos/x15/galeria/2.png",
      "modelos/x15/galeria/3.png",
      "modelos/x15/galeria/4.png",
      "modelos/x15/galeria/5.webp",
      "modelos/x15/galeria/6.jpg"
    ],
    features: [
      { icon: "🆔", text: "Partida por cartão NFC" },
      { icon: "🔧", text: "Freios a disco" },
      { icon: "🔄", text: "Marcha ré" },
      { icon: "🖥️", text: "Painel digital" },
      { icon: "⚖️", text: "Capacidade: 200 kg" },
      { icon: "🔋", text: "Suporte para bateria extra" },
      { icon: "💡", text: "Farol de LED com 3 níveis" },
      { icon: "🛡️", text: "Resistente à água (IP65)" }
    ],
    specs: [
      { label: "Motor", value: "3000W" },
      { label: "Autonomia", value: "até 40 km" },
      { label: "Velocidade Máxima", value: "50 km/h" },
      { label: "Carga Máxima", value: "200 kg" },
      { label: "Rodas", value: "Liga leve aro 10\"" },
      { label: "Tempo de Recarga", value: "6-8 horas" },
      { label: "Extras", value: "NFC, Marcha ré, Alarme, Bateria extra" }
    ]
  },

  // ===== CICLOMOTORES =====

  x11: {
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Azul", hex: "#1e5b94" },
      { name: "Vermelho", hex: "#a01d1d" },
      { name: "Branco", hex: "#e8e8e8" },
      { name: "Cinza", hex: "#6b6b6b" }
    ],
    gallery: [
      "modelos/x11/galeria/1.webp",
      "modelos/x11/galeria/2.png",
      "modelos/x11/galeria/3.png",
      "modelos/x11/galeria/4.png",
      "modelos/x11/galeria/5.png",
      "modelos/x11/galeria/6.webp"
    ],
    features: [
      { icon: "🆔", text: "Liga/desliga com cartão NFC" },
      { icon: "🔧", text: "Freios a disco" },
      { icon: "🔋", text: "Bateria removível + compartimento extra" },
      { icon: "🖥️", text: "Painel digital" },
      { icon: "💡", text: "Farol de LED com 3 níveis" },
      { icon: "⚖️", text: "Capacidade: até 180 kg" },
      { icon: "🔊", text: "Alarme com bloqueio e trava" },
      { icon: "🛡️", text: "Resistente à água (IP65)" }
    ],
    specs: [
      { label: "Motor", value: "2000W / 3000W" },
      { label: "Autonomia", value: "até 40 km (80 km com bateria extra)" },
      { label: "Velocidade Máxima", value: "50 km/h (2000W) / 70 km/h (3000W)" },
      { label: "Carga Máxima", value: "180 kg" },
      { label: "Rodas", value: "Liga leve aro 10\" (2000W) / aro 12\" (3000W)" },
      { label: "Tempo de Recarga", value: "6-8 horas" },
      { label: "Extras", value: "NFC, Alarme, Bateria extra, IP65" }
    ]
  },

  "20": {
    gallery: [
      "modelos/20/galeria/1.webp"
    ],
    features: [
      { icon: "🆔", text: "Partida NFC" },
      { icon: "🔧", text: "Freios a disco" },
      { icon: "🔋", text: "Bateria removível" },
      { icon: "🖥️", text: "Painel digital" },
      { icon: "⚡", text: "Potência de até 3000W" },
      { icon: "📋", text: "Exige CNH e emplacamento" }
    ],
    specs: [
      { label: "Motor", value: "2000W–3000W" },
      { label: "Autonomia", value: "até 40 km (80 km com bateria extra)" },
      { label: "Velocidade Máxima", value: "50 km/h" },
      { label: "Bateria", value: "Removível" },
      { label: "Extras", value: "NFC, Freios disco, Painel digital" }
    ]
  },

  roma: {
    colors: [
      { name: "Azul", hex: "#1e5b94" },
      { name: "Creme", hex: "#f0e6d2" },
      { name: "Preta", hex: "#1a1a1a" }
    ],
    gallery: [
      "modelos/roma/galeria/1.webp",
      "modelos/roma/galeria/2.webp",
      "modelos/roma/galeria/3.webp",
      "modelos/roma/galeria/4.webp",
      "modelos/roma/galeria/5.webp"
    ],
    features: [
      { icon: "🎨", text: "Design retrô italiano" },
      { icon: "🔋", text: "Bateria de lítio 72V 25Ah removível" },
      { icon: "🔧", text: "Freios a disco hidráulicos" },
      { icon: "📱", text: "Tecnologia NFC" },
      { icon: "🔄", text: "Marcha ré e Modo parking" },
      { icon: "🔊", text: "Alarme com bloqueio e trava" },
      { icon: "⚡", text: "3 níveis de velocidade" },
      { icon: "📋", text: "Exige CNH e emplacamento" }
    ],
    specs: [
      { label: "Motor", value: "3000W" },
      { label: "Tipo de Bateria", value: "Lítio 72V 25Ah (removível)" },
      { label: "Autonomia", value: "até 50 km" },
      { label: "Velocidade Máxima", value: "50 km/h" },
      { label: "Carregador", value: "Bivolt" },
      { label: "Tempo de Recarga", value: "4 a 6 horas" },
      { label: "Freios", value: "Disco hidráulico traseiro" },
      { label: "Conectividade", value: "NFC" },
      { label: "Extras", value: "Marcha ré, Parking, Alarme, Bateria extra" }
    ]
  },

  // ===== E-BIKES =====

  grid: {
    gallery: [
      "modelos/grid/galeria/1.webp"
    ],
    features: [
      { icon: "🚫", text: "Sem necessidade de CNH" },
      { icon: "📋", text: "Dispensa emplacamento" },
      { icon: "🔋", text: "Bateria removível 48V" },
      { icon: "💡", text: "Farol em LED" },
      { icon: "🖥️", text: "Painel digital" },
      { icon: "🎨", text: "Quadro em aço carbono" }
    ],
    specs: [
      { label: "Motor", value: "750W" },
      { label: "Tipo de Bateria", value: "48V (removível)" },
      { label: "Autonomia", value: "até 35 km" },
      { label: "Velocidade Máxima", value: "32 km/h" },
      { label: "Quadro", value: "Aço carbono" },
      { label: "Extras", value: "Farol LED, Painel digital" }
    ]
  },

  style: {
    gallery: [
      "modelos/style/galeria/1.webp"
    ],
    features: [
      { icon: "🚫", text: "Sem necessidade de CNH" },
      { icon: "📋", text: "Dispensa emplacamento" },
      { icon: "🔋", text: "Bateria removível" },
      { icon: "🔧", text: "Freios a disco hidráulicos" },
      { icon: "🖥️", text: "Painel em LED" },
      { icon: "🎨", text: "Quadro em aço carbono" }
    ],
    specs: [
      { label: "Motor", value: "750W" },
      { label: "Autonomia", value: "até 35 km" },
      { label: "Velocidade Máxima", value: "32 km/h" },
      { label: "Bateria", value: "Removível" },
      { label: "Freios", value: "Disco hidráulicos" },
      { label: "Quadro", value: "Aço carbono" }
    ]
  },

  liberty: {
    badge: "MODELO DOBRÁVEL",
    gallery: [
      "modelos/liberty/galeria/1.webp"
    ],
    features: [
      { icon: "🚫", text: "Sem necessidade de CNH" },
      { icon: "📋", text: "Dispensa emplacamento" },
      { icon: "🔄", text: "Modelo dobrável" },
      { icon: "🔋", text: "Bateria removível" },
      { icon: "🔧", text: "Freios a disco" },
      { icon: "👥", text: "Assento para garupa" }
    ],
    specs: [
      { label: "Motor", value: "500W" },
      { label: "Autonomia", value: "até 35 km" },
      { label: "Velocidade Máxima", value: "32 km/h" },
      { label: "Bateria", value: "Removível" },
      { label: "Freios", value: "Disco" },
      { label: "Extras", value: "Dobrável, Assento garupa" }
    ]
  },

  space: {
    badge: "MODELO DOBRÁVEL",
    gallery: [
      "modelos/space/galeria/1.webp"
    ],
    features: [
      { icon: "🚫", text: "Sem necessidade de CNH" },
      { icon: "📋", text: "Dispensa emplacamento" },
      { icon: "🔄", text: "Modelo dobrável" },
      { icon: "🔋", text: "Bateria removível" },
      { icon: "🔧", text: "Freios a disco" },
      { icon: "⚙️", text: "7 marchas" },
      { icon: "🖥️", text: "Painel em LED" }
    ],
    specs: [
      { label: "Motor", value: "750W" },
      { label: "Autonomia", value: "até 35 km" },
      { label: "Velocidade Máxima", value: "32 km/h" },
      { label: "Bateria", value: "Removível" },
      { label: "Marchas", value: "7" },
      { label: "Freios", value: "Disco" }
    ]
  }
});
