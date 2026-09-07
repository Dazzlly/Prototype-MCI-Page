// model-data-extra.js — Dados detalhados adicionais (complementa MODEL_DETAILS de data.js)
// Cores, galerias e especificações extraídas do site oficial motochefebrasil.com.br
// e da loja motochefeitaim.com.br

Object.assign(MODEL_DETAILS, {

  // ===== AUTOPROPELIDOS =====

  mia: {
    colors: [
      { name: "Azul", hex: "#1e5b94", images: [
        "modelos/mia/azul/mia-azul-1.jpg",
        "modelos/mia/azul/mia-azul-2.jpg",
        "modelos/mia/azul/mia-azul-3.jpg",
        "modelos/mia/azul/mia-azul-4.jpg",
        "modelos/mia/azul/mia-azul-5.jpg",
        "modelos/mia/azul/mia-azul-6.jpg",
        "modelos/mia/azul/mia-azul-7.jpg",
        "modelos/mia/azul/mia-azul-8.jpg",
        "modelos/mia/azul/mia-azul-9.jpg",
        "modelos/mia/azul/mia-azul-10.jpg",
        "modelos/mia/azul/mia-azul-11.jpg",
        "modelos/mia/azul/mia-azul-12.jpg",
      ] },
      { name: "Violeta escuro", hex: "#7a3aa8", images: [
        "modelos/mia/violeta-escuro/mia-violeta-escuro-1.jpg",
        "modelos/mia/violeta-escuro/mia-violeta-escuro-2.jpg",
        "modelos/mia/violeta-escuro/mia-violeta-escuro-3.jpg",
        "modelos/mia/violeta-escuro/mia-violeta-escuro-4.jpg",
        "modelos/mia/violeta-escuro/mia-violeta-escuro-5.jpg",
        "modelos/mia/violeta-escuro/mia-violeta-escuro-6.jpg",
        "modelos/mia/violeta-escuro/mia-violeta-escuro-7.jpg",
        "modelos/mia/violeta-escuro/mia-violeta-escuro-8.jpg",
        "modelos/mia/violeta-escuro/mia-violeta-escuro-9.jpg",
        "modelos/mia/violeta-escuro/mia-violeta-escuro-10.jpg",
        "modelos/mia/violeta-escuro/mia-violeta-escuro-11.jpg",
      ] },
      { name: "Branca", hex: "#e8e8e8", images: [
        "modelos/mia/branco/mia-branco-1.jpg",
        "modelos/mia/branco/mia-branco-2.jpg",
        "modelos/mia/branco/mia-branco-3.jpg",
        "modelos/mia/branco/mia-branco-4.jpg",
        "modelos/mia/branco/mia-branco-5.jpg",
        "modelos/mia/branco/mia-branco-6.jpg",
        "modelos/mia/branco/mia-branco-7.jpg",
        "modelos/mia/branco/mia-branco-8.jpg",
        "modelos/mia/branco/mia-branco-9.jpg",
        "modelos/mia/branco/mia-branco-10.jpg",
        "modelos/mia/branco/mia-branco-11.jpg",
        "modelos/mia/branco/mia-branco-12.jpg",
      ] },
      { name: "Preta", hex: "#1a1a1a", images: [
        "modelos/mia/preto/mia-preto-1.jpg",
        "modelos/mia/preto/mia-preto-2.jpg",
        "modelos/mia/preto/mia-preto-3.jpg",
        "modelos/mia/preto/mia-preto-4.jpg",
        "modelos/mia/preto/mia-preto-5.jpg",
        "modelos/mia/preto/mia-preto-6.jpg",
        "modelos/mia/preto/mia-preto-7.jpg",
        "modelos/mia/preto/mia-preto-8.jpg",
        "modelos/mia/preto/mia-preto-9.jpg",
        "modelos/mia/preto/mia-preto-10.jpg",
        "modelos/mia/preto/mia-preto-11.jpg",
      ] },
    ],
    gallery: [
      "modelos/mia/galeria/mia-preta.webp",
      "modelos/mia/galeria/extra-mia.webp",
      "modelos/mia/galeria/extra-mia_cor_3-1.webp",
      "modelos/mia/galeria/extra-mia_cor_1-1.webp",
      "modelos/mia/galeria/extra-mia_farol.webp",
      "modelos/mia/galeria/extra-miaa-1.webp",
      "modelos/mia/galeria/mia-maringa-1.jpg",
      "modelos/mia/galeria/mia-maringa-2.jpg",
      "modelos/mia/galeria/mia-maringa-3.jpg",
      "modelos/mia/galeria/mia-maringa-4.jpg",
      "modelos/mia/galeria/mia-maringa-5.jpg",
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
      { name: "Preto", hex: "#1a1a1a", images: [
        "modelos/jet-max/preto/jet-max-preto-1.jpg",
        "modelos/jet-max/preto/jet-max-preto-2.jpg",
        "modelos/jet-max/preto/jet-max-preto-3.jpg",
        "modelos/jet-max/preto/jet-max-preto-4.jpg",
        "modelos/jet-max/preto/jet-max-preto-5.jpg",
        "modelos/jet-max/preto/jet-max-preto-6.jpg",
        "modelos/jet-max/preto/jet-max-preto-7.jpg",
      ] },
      { name: "Branco", hex: "#e8e8e8", images: [
        "modelos/jet-max/branco/jet-max-branco-1.jpg",
        "modelos/jet-max/branco/jet-max-branco-2.jpg",
        "modelos/jet-max/branco/jet-max-branco-3.jpg",
        "modelos/jet-max/branco/jet-max-branco-4.jpg",
        "modelos/jet-max/branco/jet-max-branco-5.jpg",
        "modelos/jet-max/branco/jet-max-branco-6.jpg",
        "modelos/jet-max/branco/jet-max-branco-7.jpg",
      ] },
      { name: "Azul escuro", hex: "#1e5b94", images: [
        "modelos/jet-max/azul-escuro/jet-max-azul-escuro-1.jpg",
        "modelos/jet-max/azul-escuro/jet-max-azul-escuro-2.jpg",
        "modelos/jet-max/azul-escuro/jet-max-azul-escuro-3.jpg",
        "modelos/jet-max/azul-escuro/jet-max-azul-escuro-4.jpg",
        "modelos/jet-max/azul-escuro/jet-max-azul-escuro-5.jpg",
        "modelos/jet-max/azul-escuro/jet-max-azul-escuro-6.jpg",
        "modelos/jet-max/azul-escuro/jet-max-azul-escuro-7.jpg",
      ] },
      { name: "Vermelho escuro", hex: "#a01d1d", images: [
        "modelos/jet-max/vermelho-escuro/jet-max-vermelho-escuro-1.jpg",
        "modelos/jet-max/vermelho-escuro/jet-max-vermelho-escuro-2.jpg",
        "modelos/jet-max/vermelho-escuro/jet-max-vermelho-escuro-3.jpg",
        "modelos/jet-max/vermelho-escuro/jet-max-vermelho-escuro-4.jpg",
        "modelos/jet-max/vermelho-escuro/jet-max-vermelho-escuro-5.jpg",
        "modelos/jet-max/vermelho-escuro/jet-max-vermelho-escuro-6.jpg",
        "modelos/jet-max/vermelho-escuro/jet-max-vermelho-escuro-7.jpg",
      ] },
      { name: "Cinza claro", hex: "#6b6b6b", images: [
        "modelos/jet-max/cinza-claro/jet-max-cinza-claro-1.jpg",
        "modelos/jet-max/cinza-claro/jet-max-cinza-claro-2.jpg",
        "modelos/jet-max/cinza-claro/jet-max-cinza-claro-3.jpg",
        "modelos/jet-max/cinza-claro/jet-max-cinza-claro-4.jpg",
        "modelos/jet-max/cinza-claro/jet-max-cinza-claro-5.jpg",
        "modelos/jet-max/cinza-claro/jet-max-cinza-claro-6.jpg",
        "modelos/jet-max/cinza-claro/jet-max-cinza-claro-7.jpg",
      ] },
    ],
    gallery: [
      "modelos/jet-max/galeria/extra-jetmax_cor-3.webp",
      "modelos/jet-max/galeria/extra-jetmax_cor-2.webp",
      "modelos/jet-max/galeria/extra-jetmax_cor-1.webp",
      "modelos/jet-max/galeria/extra-bau_30l.webp",
      "modelos/jet-max/galeria/extra-farol_full2.webp",
      "modelos/jet-max/galeria/jet-max-maringa-1.jpg",
      "modelos/jet-max/galeria/jet-max-maringa-2.jpg",
      "modelos/jet-max/galeria/jet-max-maringa-3.jpg",
      "modelos/jet-max/galeria/jet-max-maringa-4.jpg",
      "modelos/jet-max/galeria/jet-max-maringa-5.jpg",
      "modelos/jet-max/galeria/jet-max-maringa-6.jpg",
      "modelos/jet-max/galeria/jet-max-maringa-7.jpg",
      "modelos/jet-max/galeria/jet-max-maringa-8.jpg",
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
      { name: "Azul escuro", hex: "#1e5b94", images: [
        "modelos/jet/azul-escuro/jet-azul-escuro-1.jpg",
        "modelos/jet/azul-escuro/jet-azul-escuro-2.jpg",
        "modelos/jet/azul-escuro/jet-azul-escuro-3.jpg",
        "modelos/jet/azul-escuro/jet-azul-escuro-4.jpg",
        "modelos/jet/azul-escuro/jet-azul-escuro-5.jpg",
        "modelos/jet/azul-escuro/jet-azul-escuro-6.jpg",
      ] },
      { name: "Branco", hex: "#e8e8e8", images: [
        "modelos/jet/branco/jet-branco-1.jpg",
        "modelos/jet/branco/jet-branco-2.jpg",
        "modelos/jet/branco/jet-branco-3.jpg",
        "modelos/jet/branco/jet-branco-4.jpg",
        "modelos/jet/branco/jet-branco-5.jpg",
        "modelos/jet/branco/jet-branco-6.jpg",
      ] },
      { name: "Preto", hex: "#1a1a1a", images: [
        "modelos/jet/preto/jet-preto-1.jpg",
        "modelos/jet/preto/jet-preto-2.jpg",
        "modelos/jet/preto/jet-preto-3.jpg",
        "modelos/jet/preto/jet-preto-4.jpg",
        "modelos/jet/preto/jet-preto-5.jpg",
        "modelos/jet/preto/jet-preto-6.jpg",
        "modelos/jet/preto/jet-preto-7.jpg",
        "modelos/jet/preto/jet-preto-8.jpg",
      ] },
      { name: "Cinza", hex: "#6b6b6b", images: [
        "modelos/jet/cinza/jet-cinza-1.jpg",
        "modelos/jet/cinza/jet-cinza-2.jpg",
        "modelos/jet/cinza/jet-cinza-3.jpg",
        "modelos/jet/cinza/jet-cinza-4.jpg",
        "modelos/jet/cinza/jet-cinza-5.jpg",
        "modelos/jet/cinza/jet-cinza-6.jpg",
      ] },
    ],
    gallery: [
      "modelos/jet/galeria/jet.webp",
      "modelos/jet/galeria/extra-jet_cor_1-1.webp",
      "modelos/jet/galeria/extra-jet_cor_3-1.webp",
      "modelos/jet/galeria/extra-jet_cor_2-1.webp",
      "modelos/jet/galeria/extra-moto_eletrica_jet_1000w_sem_cnh_moto_chefe_21_variacao_101_4_dd80aff3b8fd07bb376a859d1afc0a85-67544acaebb33.webp",
      "modelos/jet/galeria/jet-maringa-1.jpg",
      "modelos/jet/galeria/jet-maringa-2.jpg",
      "modelos/jet/galeria/jet-maringa-3.jpg",
      "modelos/jet/galeria/jet-maringa-4.jpg",
      "modelos/jet/galeria/jet-maringa-5.jpg",
      "modelos/jet/galeria/jet-maringa-6.jpg",
      "modelos/jet/galeria/jet-maringa-7.jpg",
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
      { name: "Cinza", hex: "#6b6b6b", images: [
        "modelos/bob/cinza/bob-cinza-1.jpg",
        "modelos/bob/cinza/bob-cinza-2.jpg",
        "modelos/bob/cinza/bob-cinza-3.jpg",
        "modelos/bob/cinza/bob-cinza-4.jpg",
        "modelos/bob/cinza/bob-cinza-5.jpg",
        "modelos/bob/cinza/bob-cinza-6.jpg",
        "modelos/bob/cinza/bob-cinza-7.jpg",
        "modelos/bob/cinza/bob-cinza-8.jpg",
        "modelos/bob/cinza/bob-cinza-9.jpg",
      ] },
      { name: "Preto", hex: "#1a1a1a", images: [
        "modelos/bob/preto/bob-preto-1.jpg",
        "modelos/bob/preto/bob-preto-2.jpg",
        "modelos/bob/preto/bob-preto-3.jpg",
        "modelos/bob/preto/bob-preto-4.jpg",
        "modelos/bob/preto/bob-preto-5.jpg",
        "modelos/bob/preto/bob-preto-6.jpg",
        "modelos/bob/preto/bob-preto-7.jpg",
        "modelos/bob/preto/bob-preto-8.jpg",
        "modelos/bob/preto/bob-preto-9.jpg",
        "modelos/bob/preto/bob-preto-10.jpg",
      ] },
      { name: "Branco", hex: "#e8e8e8", images: [
        "modelos/bob/branco/bob-branco-1.jpg",
        "modelos/bob/branco/bob-branco-2.jpg",
        "modelos/bob/branco/bob-branco-3.jpg",
        "modelos/bob/branco/bob-branco-4.jpg",
        "modelos/bob/branco/bob-branco-5.jpg",
        "modelos/bob/branco/bob-branco-6.jpg",
        "modelos/bob/branco/bob-branco-7.jpg",
        "modelos/bob/branco/bob-branco-8.jpg",
        "modelos/bob/branco/bob-branco-9.jpg",
      ] },
      { name: "Azul", hex: "#1e5b94" },
    ],
    gallery: [
      "modelos/bob/galeria/extra-cor-2.webp",
      "modelos/bob/galeria/extra-cor-1.webp",
      "modelos/bob/galeria/extra-detalhe_bob-2.webp",
      "modelos/bob/galeria/extra-detalhe_bob-3.webp",
      "modelos/bob/galeria/extra-detalhe_bob-5.webp",
      "modelos/bob/galeria/bob-maringa-1.jpg",
      "modelos/bob/galeria/bob-maringa-2.jpg",
      "modelos/bob/galeria/bob-maringa-3.jpg",
      "modelos/bob/galeria/bob-maringa-4.jpg",
      "modelos/bob/galeria/bob-maringa-5.jpg",
      "modelos/bob/galeria/bob-maringa-6.jpg",
      "modelos/bob/galeria/bob-maringa-7.jpg",
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
      "modelos/sofia/galeria/extra-sofia_cor-3.webp",
      "modelos/sofia/galeria/extra-sofia_cor-1.webp",
      "modelos/sofia/galeria/extra-sofia_cor-2.webp",
      "modelos/sofia/galeria/extra-painel_raw-1-1.webp",
      "modelos/sofia/galeria/extra-farol-2.webp",
      "modelos/sofia/galeria/extra-bau-1.webp",
      "modelos/sofia/galeria/sofia-maringa-1.jpg",
      "modelos/sofia/galeria/sofia-maringa-2.jpg",
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
      { name: "Azul", hex: "#1e5b94", images: [
        "modelos/joy-super/azul/joy-super-azul-1.jpg",
        "modelos/joy-super/azul/joy-super-azul-2.jpg",
        "modelos/joy-super/azul/joy-super-azul-3.jpg",
        "modelos/joy-super/azul/joy-super-azul-4.jpg",
        "modelos/joy-super/azul/joy-super-azul-5.jpg",
        "modelos/joy-super/azul/joy-super-azul-6.jpg",
        "modelos/joy-super/azul/joy-super-azul-7.jpg",
      ] },
      { name: "Vermelho", hex: "#a01d1d", images: [
        "modelos/joy-super/vermelho/joy-super-vermelho-1.jpg",
        "modelos/joy-super/vermelho/joy-super-vermelho-2.jpg",
        "modelos/joy-super/vermelho/joy-super-vermelho-3.jpg",
        "modelos/joy-super/vermelho/joy-super-vermelho-4.jpg",
        "modelos/joy-super/vermelho/joy-super-vermelho-5.jpg",
        "modelos/joy-super/vermelho/joy-super-vermelho-6.jpg",
        "modelos/joy-super/vermelho/joy-super-vermelho-7.jpg",
      ] },
      { name: "Cinza", hex: "#6b6b6b", images: [
        "modelos/joy-super/cinza/joy-super-cinza-1.jpg",
        "modelos/joy-super/cinza/joy-super-cinza-2.jpg",
        "modelos/joy-super/cinza/joy-super-cinza-3.jpg",
        "modelos/joy-super/cinza/joy-super-cinza-4.jpg",
        "modelos/joy-super/cinza/joy-super-cinza-5.jpg",
        "modelos/joy-super/cinza/joy-super-cinza-6.jpg",
        "modelos/joy-super/cinza/joy-super-cinza-7.jpg",
      ] },
      { name: "Branco", hex: "#e8e8e8", images: [
        "modelos/joy-super/branco/joy-super-branco-1.jpg",
        "modelos/joy-super/branco/joy-super-branco-2.jpg",
        "modelos/joy-super/branco/joy-super-branco-3.jpg",
        "modelos/joy-super/branco/joy-super-branco-4.jpg",
        "modelos/joy-super/branco/joy-super-branco-5.jpg",
        "modelos/joy-super/branco/joy-super-branco-6.jpg",
      ] },
      { name: "Preto", hex: "#1a1a1a", images: [
        "modelos/joy-super/preto/joy-super-preto-1.jpg",
        "modelos/joy-super/preto/joy-super-preto-2.jpg",
        "modelos/joy-super/preto/joy-super-preto-3.jpg",
        "modelos/joy-super/preto/joy-super-preto-4.jpg",
        "modelos/joy-super/preto/joy-super-preto-5.jpg",
        "modelos/joy-super/preto/joy-super-preto-6.jpg",
        "modelos/joy-super/preto/joy-super-preto-7.jpg",
      ] },
    ],
    gallery: [
      "modelos/joy-super/galeria/extra-joysuper5.webp",
      "modelos/joy-super/galeria/extra-joysuper1.webp",
      "modelos/joy-super/galeria/extra-joysuper2.webp",
      "modelos/joy-super/galeria/extra-joysuper3.webp",
      "modelos/joy-super/galeria/extra-joysuper4.webp",
      "modelos/joy-super/galeria/extra-bicicleta_eletrica_joy_super_800w_sem_cnh_moto_chefe_variacao_-2.webp",
      "modelos/joy-super/galeria/joy-super-maringa-1.jpg",
      "modelos/joy-super/galeria/joy-super-maringa-2.jpg",
      "modelos/joy-super/galeria/joy-super-maringa-3.jpg",
      "modelos/joy-super/galeria/joy-super-maringa-4.jpg",
      "modelos/joy-super/galeria/joy-super-maringa-5.jpg",
      "modelos/joy-super/galeria/joy-super-maringa-6.jpg",
      "modelos/joy-super/galeria/joy-super-maringa-7.jpg",
      "modelos/joy-super/galeria/joy-super-maringa-8.jpg",
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
      "modelos/20-mini/galeria/extra-mc20_detalhes_modelo-3.webp",
      "modelos/20-mini/galeria/extra-mc20_detalhes_modelo-1.webp",
      "modelos/20-mini/galeria/extra-mc20_detalhes_modelo-2.webp",
      "modelos/20-mini/galeria/extra-mc20_detalhes_modelo-4.webp",
      "modelos/20-mini/galeria/extra-mc20_detalhes_modelo-6.webp"
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
      { name: "Branco", hex: "#e8e8e8", images: [
        "modelos/ret/branco/ret-branco-1.jpg",
        "modelos/ret/branco/ret-branco-2.jpg",
        "modelos/ret/branco/ret-branco-3.jpg",
        "modelos/ret/branco/ret-branco-4.jpg",
        "modelos/ret/branco/ret-branco-5.jpg",
        "modelos/ret/branco/ret-branco-6.jpg",
        "modelos/ret/branco/ret-branco-7.jpg",
        "modelos/ret/branco/ret-branco-8.jpg",
        "modelos/ret/branco/ret-branco-9.jpg",
        "modelos/ret/branco/ret-branco-10.jpg",
      ] },
      { name: "Cinza", hex: "#6b6b6b", images: [
        "modelos/ret/cinza/ret-cinza-1.jpg",
        "modelos/ret/cinza/ret-cinza-2.jpg",
        "modelos/ret/cinza/ret-cinza-3.jpg",
        "modelos/ret/cinza/ret-cinza-4.jpg",
        "modelos/ret/cinza/ret-cinza-5.jpg",
        "modelos/ret/cinza/ret-cinza-6.jpg",
        "modelos/ret/cinza/ret-cinza-7.jpg",
        "modelos/ret/cinza/ret-cinza-8.jpg",
        "modelos/ret/cinza/ret-cinza-9.jpg",
        "modelos/ret/cinza/ret-cinza-10.jpg",
        "modelos/ret/cinza/ret-cinza-11.jpg",
        "modelos/ret/cinza/ret-cinza-12.jpg",
      ] },
      { name: "Preto", hex: "#1a1a1a", images: [
        "modelos/ret/preto/ret-preto-1.jpg",
        "modelos/ret/preto/ret-preto-2.jpg",
        "modelos/ret/preto/ret-preto-3.jpg",
        "modelos/ret/preto/ret-preto-4.jpg",
        "modelos/ret/preto/ret-preto-5.jpg",
        "modelos/ret/preto/ret-preto-6.jpg",
        "modelos/ret/preto/ret-preto-7.jpg",
        "modelos/ret/preto/ret-preto-8.jpg",
        "modelos/ret/preto/ret-preto-9.jpg",
        "modelos/ret/preto/ret-preto-10.jpg",
      ] },
      { name: "Azul", hex: "#1e5b94", images: [
        "modelos/ret/azul/ret-azul-1.jpg",
        "modelos/ret/azul/ret-azul-2.jpg",
      ] },
      { name: "Vermelha", hex: "#a01d1d" },
    ],
    gallery: [
      "modelos/ret/galeria/extra-ret3.png",
      "modelos/ret/galeria/extra-ret1.png",
      "modelos/ret/galeria/extra-ret2.png",
      "modelos/ret/galeria/extra-Imagem-de-Moto-Eletrica-RET-1000w-SEM-CNH-MOTO-CHEFE.jpg",
      "modelos/ret/galeria/extra-Imagem-de-Moto-Eletrica-RET-1000w-SEM-CNH-MOTO-CHEFE-1.jpg",
      "modelos/ret/galeria/extra-Imagem-de-Moto-Eletrica-RET-1000w-SEM-CNH-MOTO-CHEFE-4.jpg",
      "modelos/ret/galeria/ret-maringa-1.jpg",
      "modelos/ret/galeria/ret-maringa-2.jpg",
      "modelos/ret/galeria/ret-maringa-3.jpg",
      "modelos/ret/galeria/ret-maringa-4.jpg",
      "modelos/ret/galeria/ret-maringa-5.jpg",
      "modelos/ret/galeria/ret-maringa-6.jpg",
      "modelos/ret/galeria/ret-maringa-7.jpg",
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
      { name: "Branco", hex: "#e8e8e8", images: [
        "modelos/soma/branco/soma-branco-1.jpg",
        "modelos/soma/branco/soma-branco-2.jpg",
        "modelos/soma/branco/soma-branco-3.jpg",
        "modelos/soma/branco/soma-branco-4.jpg",
        "modelos/soma/branco/soma-branco-5.jpg",
        "modelos/soma/branco/soma-branco-6.jpg",
      ] },
      { name: "Cinza", hex: "#6b6b6b", images: [
        "modelos/soma/cinza/soma-cinza-1.jpg",
        "modelos/soma/cinza/soma-cinza-2.jpg",
        "modelos/soma/cinza/soma-cinza-3.jpg",
        "modelos/soma/cinza/soma-cinza-4.jpg",
        "modelos/soma/cinza/soma-cinza-5.jpg",
        "modelos/soma/cinza/soma-cinza-6.jpg",
      ] },
      { name: "Preto", hex: "#1a1a1a", images: [
        "modelos/soma/preto/soma-preto-1.jpg",
        "modelos/soma/preto/soma-preto-2.jpg",
        "modelos/soma/preto/soma-preto-3.jpg",
        "modelos/soma/preto/soma-preto-4.jpg",
        "modelos/soma/preto/soma-preto-5.jpg",
        "modelos/soma/preto/soma-preto-6.jpg",
      ] },
      { name: "Prata", hex: "#b8b8b8" },
    ],
    gallery: [
      "modelos/soma/galeria/extra-Soma-Prata.jpg",
      "https://motochefeitaim.com.br/wp-content/uploads/Produtos/Soma/WhatsApp-Image-2024-09-12-at-13.27.37.jpeg",
      "modelos/soma/galeria/soma-maringa-1.jpg",
      "modelos/soma/galeria/soma-maringa-2.jpg",
      "modelos/soma/galeria/soma-maringa-3.jpg",
      "modelos/soma/galeria/soma-maringa-4.jpg",
      "modelos/soma/galeria/soma-maringa-5.jpg",
      "modelos/soma/galeria/soma-maringa-6.jpg",
      "modelos/soma/galeria/soma-maringa-7.jpg",
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
      "modelos/joyzinha/galeria/extra-joy.webp",
      "modelos/joyzinha/galeria/joyzinha-maringa-1.jpg",
      "modelos/joyzinha/galeria/joyzinha-maringa-2.jpg",
      "modelos/joyzinha/galeria/joyzinha-maringa-3.jpg",
      "modelos/joyzinha/galeria/joyzinha-maringa-4.jpg",
      "modelos/joyzinha/galeria/joyzinha-maringa-5.jpg",
      "modelos/joyzinha/galeria/joyzinha-maringa-6.png",
      "modelos/joyzinha/galeria/joyzinha-maringa-7.jpg",
      "modelos/joyzinha/galeria/joyzinha-maringa-8.jpg",
      "modelos/joyzinha/galeria/joyzinha-maringa-9.jpg",
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
      "modelos/joy-tri/galeria/extra-JOY-TRI-1-1.webp",
      "modelos/joy-tri/galeria/joy-tri-maringa-1.jpg",
      "modelos/joy-tri/galeria/joy-tri-maringa-2.jpg",
      "modelos/joy-tri/galeria/joy-tri-maringa-3.jpg",
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
      "modelos/big-tri/galeria/extra-big_tri.webp",
      "modelos/big-tri/galeria/big-tri-maringa-1.jpg",
      "modelos/big-tri/galeria/big-tri-maringa-2.jpg",
      "modelos/big-tri/galeria/big-tri-maringa-3.jpg",
      "modelos/big-tri/galeria/big-tri-maringa-4.jpg",
      "modelos/big-tri/galeria/big-tri-maringa-5.jpg",
      "modelos/big-tri/galeria/big-tri-maringa-6.jpg",
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
      "modelos/mia-tri/galeria/extra-MIA-TRI-01-1.webp",
      "modelos/mia-tri/galeria/mia-tri-maringa-1.jpg",
      "modelos/mia-tri/galeria/mia-tri-maringa-2.jpg",
      "modelos/mia-tri/galeria/mia-tri-maringa-3.jpg",
      "modelos/mia-tri/galeria/mia-tri-maringa-4.jpg",
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
      "modelos/ved/galeria/extra-ved_product.webp",
      "modelos/ved/galeria/ved-maringa-1.jpg",
      "modelos/ved/galeria/ved-maringa-2.jpg",
      "modelos/ved/galeria/ved-maringa-3.jpg",
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
      { name: "Cinza", hex: "#6b6b6b", images: [
        "modelos/x15/cinza/x15-cinza-1.jpg",
        "modelos/x15/cinza/x15-cinza-2.jpg",
        "modelos/x15/cinza/x15-cinza-3.jpg",
        "modelos/x15/cinza/x15-cinza-4.jpg",
        "modelos/x15/cinza/x15-cinza-5.jpg",
        "modelos/x15/cinza/x15-cinza-6.jpg",
        "modelos/x15/cinza/x15-cinza-7.jpg",
      ] },
      { name: "Preto", hex: "#1a1a1a", images: [
        "modelos/x15/preto/x15-preto-1.jpg",
        "modelos/x15/preto/x15-preto-2.jpg",
        "modelos/x15/preto/x15-preto-3.jpg",
        "modelos/x15/preto/x15-preto-4.jpg",
        "modelos/x15/preto/x15-preto-5.jpg",
        "modelos/x15/preto/x15-preto-6.jpg",
        "modelos/x15/preto/x15-preto-7.jpg",
      ] },
      { name: "Branco", hex: "#e8e8e8", images: [
        "modelos/x15/branco/x15-branco-1.jpg",
        "modelos/x15/branco/x15-branco-2.jpg",
        "modelos/x15/branco/x15-branco-3.jpg",
        "modelos/x15/branco/x15-branco-4.jpg",
        "modelos/x15/branco/x15-branco-5.jpg",
        "modelos/x15/branco/x15-branco-6.jpg",
        "modelos/x15/branco/x15-branco-7.jpg",
      ] },
      { name: "Azul", hex: "#1e5b94" },
      { name: "Vermelho", hex: "#a01d1d" },
    ],
    gallery: [
      "modelos/x15/galeria/extra-x15.webp",
      "modelos/x15/galeria/extra-cores_mc20-13.png",
      "modelos/x15/galeria/extra-cores_mc20-14.png",
      "modelos/x15/galeria/extra-cores_mc20-7.png",
      "modelos/x15/galeria/extra-x15_1.webp",
      "modelos/x15/galeria/extra-Imagem-de-Triciclo-Eletrico-X15-3000w-MOTO-CHEFE-4.jpg",
      "modelos/x15/galeria/x15-maringa-1.jpg",
      "modelos/x15/galeria/x15-maringa-2.jpg",
      "modelos/x15/galeria/x15-maringa-3.jpg",
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
      "modelos/x11/galeria/extra-x11__-1.webp",
      "modelos/x11/galeria/extra-x11_cores-15.png",
      "modelos/x11/galeria/extra-x11_cores-8.png",
      "modelos/x11/galeria/extra-x11_cores-13.png",
      "modelos/x11/galeria/extra-x11_cores-2.png",
      "modelos/x11/galeria/extra-x11.webp",
      "modelos/x11/galeria/x11-maringa-1.jpg",
      "modelos/x11/galeria/x11-maringa-2.jpg",
      "modelos/x11/galeria/x11-maringa-3.jpg",
      "modelos/x11/galeria/x11-maringa-4.jpg",
      "modelos/x11/galeria/x11-maringa-5.jpg",
      "modelos/x11/galeria/x11-maringa-6.jpg",
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
      "modelos/20/galeria/extra-mc20_pop-1.webp",
      "modelos/20/galeria/20-maringa-1.jpg",
      "modelos/20/galeria/20-maringa-2.jpg",
      "modelos/20/galeria/20-maringa-3.jpg",
      "modelos/20/galeria/20-maringa-4.jpg",
      "modelos/20/galeria/20-maringa-5.jpg",
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
      { name: "Preta", hex: "#1a1a1a", images: [
        "modelos/roma/preto/roma-preto-1.jpg",
        "modelos/roma/preto/roma-preto-2.jpg",
        "modelos/roma/preto/roma-preto-3.jpg",
        "modelos/roma/preto/roma-preto-4.jpg",
        "modelos/roma/preto/roma-preto-5.jpg",
        "modelos/roma/preto/roma-preto-6.jpg",
      ] },
      { name: "Branco Creme", hex: "#f0e6d2", images: [
        "modelos/roma/creme/roma-creme-1.jpg",
        "modelos/roma/creme/roma-creme-2.jpg",
        "modelos/roma/creme/roma-creme-3.jpg",
        "modelos/roma/creme/roma-creme-4.jpg",
        "modelos/roma/creme/roma-creme-5.jpg",
        "modelos/roma/creme/roma-creme-6.jpg",
        "modelos/roma/creme/roma-creme-7.jpg",
      ] },
      { name: "Azul Retro", hex: "#1e5b94", images: [
        "modelos/roma/azul-retro/roma-azul-retro-1.jpg",
        "modelos/roma/azul-retro/roma-azul-retro-2.jpg",
        "modelos/roma/azul-retro/roma-azul-retro-3.jpg",
        "modelos/roma/azul-retro/roma-azul-retro-4.jpg",
        "modelos/roma/azul-retro/roma-azul-retro-5.jpg",
        "modelos/roma/azul-retro/roma-azul-retro-6.jpg",
      ] },
    ],
    gallery: [
      "modelos/roma/galeria/extra-roma_ai_sombra-1.webp",
      "modelos/roma/galeria/extra-roma_color-1.webp",
      "modelos/roma/galeria/extra-roma_color-2.webp",
      "modelos/roma/galeria/extra-roma_color-3.webp",
      "modelos/roma/galeria/extra-bancoDuplo.webp",
      "modelos/roma/galeria/roma-maringa-1.jpg",
      "modelos/roma/galeria/roma-maringa-2.jpg",
      "modelos/roma/galeria/roma-maringa-3.jpg",
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
      "modelos/grid/galeria/extra-GRID-LATERAL1-1.webp"
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
    colors: [
      { name: "Preto", hex: "#1a1a1a", images: [
        "modelos/style/preto/style-preto-1.jpg",
        "modelos/style/preto/style-preto-2.jpg",
        "modelos/style/preto/style-preto-3.jpg",
        "modelos/style/preto/style-preto-4.jpg",
        "modelos/style/preto/style-preto-5.jpg",
        "modelos/style/preto/style-preto-6.jpg",
        "modelos/style/preto/style-preto-7.jpg",
        "modelos/style/preto/style-preto-8.jpg",
        "modelos/style/preto/style-preto-9.jpg",
        "modelos/style/preto/style-preto-10.jpg",
      ] },
      { name: "Cinza", hex: "#6b6b6b", images: [
        "modelos/style/cinza/style-cinza-1.jpg",
        "modelos/style/cinza/style-cinza-2.jpg",
        "modelos/style/cinza/style-cinza-3.jpg",
        "modelos/style/cinza/style-cinza-4.jpg",
        "modelos/style/cinza/style-cinza-5.jpg",
        "modelos/style/cinza/style-cinza-6.jpg",
        "modelos/style/cinza/style-cinza-7.jpg",
        "modelos/style/cinza/style-cinza-8.jpg",
        "modelos/style/cinza/style-cinza-9.jpg",
        "modelos/style/cinza/style-cinza-10.jpg",
        "modelos/style/cinza/style-cinza-11.jpg",
        "modelos/style/cinza/style-cinza-12.jpg",
        "modelos/style/cinza/style-cinza-13.jpg",
        "modelos/style/cinza/style-cinza-14.jpg",
      ] },
    ],
    gallery: [
      "modelos/style/galeria/extra-style-1-1.webp",
      "modelos/style/galeria/style-maringa-1.jpg",
      "modelos/style/galeria/style-maringa-2.jpg",
      "modelos/style/galeria/style-maringa-3.jpg",
      "modelos/style/galeria/style-maringa-4.jpg",
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
      "modelos/liberty/galeria/extra-liberty_product_web.webp"
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
      "modelos/space/galeria/extra-space_ia-1.webp"
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
