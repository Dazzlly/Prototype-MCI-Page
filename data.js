// Dados estáticos dos veículos (snapshot do catálogo oficial Motochefe Itaim)
// Sem dependência de backend — edite este arquivo para atualizar o catálogo.

const WHATSAPP = "5511948711047";
const INSTAGRAM = "https://www.instagram.com/motochefe.itaim/";
const FACEBOOK = "https://www.facebook.com/profile.php?id=61562114171718";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Rua+João+Cachoeira+1387+Itaim+Bibi+São+Paulo";
const LOGO_URL = "images/logo-branco.webp";
const HERO_VIDEO = "https://motochefeitaim.com.br/wp-content/uploads/2024/08/copy_858DBB0B-331D-4BF6-BDB2-CD21B0F731C7.mp4";

const waLink = (name, price, url) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Quero mais informações.\n\n*${name}*\n*Preço:* ${price ? "R$ " + Number(price).toLocaleString("pt-BR") : "Sob Consulta"}\n*URL:* ${url || ""}\n\nObrigado!`
  )}`;

const VEHICLES = [
  { name: "MC Mia", category: "Autopropelido", price: 9990, power_w: 1000, range_km: 40, top_speed_kmh: 32, description: "A Scooter Elétrica MIA 1000w da Moto Chefe é a opção ideal para você que procura mobilidade prática, econômica e sustentável!", image_url: "modelos/mia/preta/mia-preta.webp", product_url: "https://motochefeitaim.com.br/product/mc-mia-1000w-autopropelido-sem-cnh/", featured: true },
  { name: "MC Jet Max", category: "Autopropelido", price: 12990, power_w: 1000, range_km: 45, top_speed_kmh: 32, description: "A Jet Max combina design robusto e moderno com tecnologia inteligente para o dia a dia. Motor de 1000W, 32 km/h, bateria de lítio 60V 30Ah de longa duração. Sem necessidade de CNH.", image_url: "modelos/jet-max/azul/jetmax.webp", product_url: "https://motochefeitaim.com.br/product/motochefe-jetmax-1000w-autopropelido-sem-cnh-copia/", featured: false },
  { name: "MC R10", category: "Autopropelido", price: null, power_w: 1000, range_km: 50, top_speed_kmh: 32, description: "Edição Limitada Ronaldinho Gaúcho. Inspirada na genialidade do R10, une visual esportivo, detalhes em verde e amarelo, motor de 1000W, autonomia de até 50 km e velocidade de 32 km/h. Sem necessidade de CNH.", image_url: "modelos/r10/galeria/r10.png", product_url: "https://motochefebrasil.com.br/modelos/r10/", featured: false },
  { name: "MC X12", category: "Autopropelido", price: 10990, power_w: 1000, range_km: 50, top_speed_kmh: 32, description: "O modelo X12 é estiloso, moderno e inovador. Ideal para o dia a dia e momentos de lazer, com suspensão dupla e banco diferenciado. Sem necessidade de CNH.", image_url: "modelos/x12/preto/x12.webp", product_url: "https://motochefeitaim.com.br/product/scooter-eletrica-x12-1000w-autopropelido-sem-cnh/", featured: true },
  { name: "MC Giga", category: "Autopropelido", price: null, power_w: 1000, range_km: 50, top_speed_kmh: 32, description: "Estilo e design. Scooter elétrica autopropelida com 1000W e 50 km de autonomia. Sem necessidade de CNH.", image_url: "modelos/giga/preto/giga.webp", featured_image: "modelos/giga/vasco/giga-featured.webp", product_url: "https://itaim.motochefe.com.br", featured: true },
  { name: "MC Joy Tri", category: "Triciclo, Autopropelido", price: null, power_w: 600, range_km: 40, top_speed_kmh: 32, description: "Conforto, mobilidade e design. Triciclo elétrico com 600W e 55 km de autonomia. Sem necessidade de CNH.", image_url: "modelos/joy-tri/preto/joy-tri.webp", product_url: "https://itaim.motochefe.com.br" },
  { name: "MC X15", category: "Triciclo, Ciclomotor", price: null, power_w: 3000, range_km: 45, top_speed_kmh: 50, description: "Potência, design e agilidade. Scooter elétrica de 3000W que atinge 50 km/h. Exige CNH e emplacamento.", image_url: "modelos/x15/preto/x15.webp", product_url: "https://itaim.motochefe.com.br" },
  { name: "MC VED", category: "Triciclo, Autopropelido", price: 15290, power_w: 1000, range_km: 45, top_speed_kmh: 32, description: "A VED 1000W oferece uma maneira ecologicamente correta de se locomover e prioriza o conforto.", image_url: "modelos/ved/preto/ved.webp", product_url: "https://motochefeitaim.com.br/product/triciclo-ventane-1000w-autopropelido-sem-cnh/" },
  { name: "MC Big Tri", category: "Triciclo, Autopropelido", price: null, power_w: 1000, range_km: 45, top_speed_kmh: 32, description: "Estilo, conforto e dia a dia. Triciclo elétrico com 1000W e 55 km de autonomia.", image_url: "modelos/big-tri/preto/big-tri.webp", product_url: "https://itaim.motochefe.com.br", featured: true },
  { name: "MC Mia Tri", category: "Triciclo, Autopropelido", price: 12490, power_w: 800, range_km: 40, top_speed_kmh: 32, description: "Triciclo ideal para quem busca alternativa prática e sustentável, sem necessidade de CNH.", image_url: "modelos/mia-tri/preto/mia-tri.webp", product_url: "https://motochefeitaim.com.br/product/triciclo-mc-mia-800w-autopropelido-sem-cnh/" },
  { name: "MC Space", category: "E-bike", price: null, power_w: 750, range_km: 35, top_speed_kmh: 32, description: "Estilo, mobilidade e dia a dia. Bicicleta elétrica com 750W e 35 km de autonomia. Quadro robusto, sem necessidade de CNH.", image_url: "modelos/space/preto/space.webp", product_url: "https://itaim.motochefe.com.br" },
  { name: "MC Grid", category: "E-bike", price: null, power_w: 750, range_km: 35, top_speed_kmh: 32, description: "Estilo, design e urban. Bicicleta elétrica com 750W e 35 km de autonomia. Sem necessidade de CNH.", image_url: "modelos/grid/preto/grid.webp", product_url: "https://itaim.motochefe.com.br" },
  { name: "MC Style", category: "E-bike", price: 10490, power_w: 750, range_km: 35, top_speed_kmh: 32, description: "Bicicleta Elétrica STYLE com motor de 750w e quadro em aço carbono para durabilidade e resistência. Desempenho potente para seus passeios.", image_url: "modelos/style/preto/style.webp", product_url: "https://motochefeitaim.com.br/product/bicicleta-eletrica-style-750w-ventane-motors/" },
  { name: "MC Liberty", category: "E-bike", price: null, power_w: 600, range_km: 35, top_speed_kmh: 32, description: "Estilo, design e dia a dia. Scooter elétrica autopropelida com 600W e 40 km de autonomia. Sem necessidade de CNH.", image_url: "modelos/liberty/preto/liberty.webp", product_url: "https://itaim.motochefe.com.br" },
  { name: "MC Roma", category: "Ciclomotor", price: null, power_w: 3000, range_km: 50, top_speed_kmh: 50, description: "Conforto, design e clássica. Scooter elétrica de 3000W que atinge 50 km/h. Exige CNH e emplacamento.", image_url: "modelos/roma/azul/roma.webp", product_url: "https://motochefe.com.br", featured: true },
  { name: "MC 20", category: "Ciclomotor", price: null, power_w: 2000, range_km: 50, top_speed_kmh: 50, description: "Estilo, potência e autonomia. Scooter elétrica de 2000W que atige 50 km/h com 80 km de autonomia. Exige CNH e emplacamento.", image_url: "modelos/20/preto/mc20.webp", product_url: "https://itaim.motochefe.com.br" },
  { name: "MC X11", category: "Ciclomotor", price: 11990, power_w: 2000, range_km: 50, top_speed_kmh: 50, description: "O modelo X11 é estiloso e potente. Atinge 50 km/h com motor de 2000W e 80 km de autonomia. Exige CNH e emplacamento.", image_url: "modelos/x11/preto/x11.webp", product_url: "https://motochefeitaim.com.br/product/scooter-eletrica-mc-x11-3000w/" },
  { name: "MC Soma", category: "Autopropelido", price: 8990, power_w: 1000, range_km: 40, top_speed_kmh: 32, description: "SOMA une estilo, modernidade e inovação. Suspensão dupla e banco confortável, bateria de lítio removível. Sem necessidade de CNH.", image_url: "modelos/soma/prata/soma.webp", product_url: "https://motochefeitaim.com.br/product/mc-soma-1000w-autopropelido-sem-cnh/" },
  { name: "MC Sofia", category: "Autopropelido", price: null, power_w: 1000, range_km: 45, top_speed_kmh: 32, description: "Estilo, design e clássica. Scooter elétrica autopropelida com 1000W e 45 km de autonomia. Sem necessidade de CNH.", image_url: "modelos/sofia/preto/sofia.webp", product_url: "https://itaim.motochefe.com.br" },
  { name: "MC 20 Mini", category: "Autopropelido", price: null, power_w: 1000, range_km: 45, top_speed_kmh: 32, description: "Mobilidade, dia a dia e economia. Scooter elétrica autopropelida com 1000W e 45 km de autonomia. Sem necessidade de CNH.", image_url: "modelos/20-mini/preto/20-mini.webp", product_url: "https://itaim.motochefe.com.br" },
  { name: "MC Bob", category: "Autopropelido", price: null, power_w: 1000, range_km: 40, top_speed_kmh: 32, description: "Conforto, mobilidade e economia. Scooter elétrica autopropelida com 1000W e 40 km de autonomia. Sem necessidade de CNH.", image_url: "modelos/bob/preto/bob.webp", product_url: "https://itaim.motochefe.com.br" },
  { name: "MC Ret", category: "Autopropelido", price: null, power_w: 1000, range_km: 40, top_speed_kmh: 32, description: "Conforto, mobilidade e design. Scooter elétrica autopropelida com 1000W e 40 km de autonomia. Sem necessidade de CNH.", image_url: "modelos/ret/preto/ret.webp", product_url: "https://itaim.motochefe.com.br" },
  { name: "MC Joy Super", category: "Autopropelido", price: 7490, power_w: 800, range_km: 40, top_speed_kmh: 32, description: "A SUPER Joy 800W oferece mobilidade, conforto, economia e agilidade. Perfeita para o dia a dia.", image_url: "modelos/joy-super/azul/joy-super.webp", product_url: "https://motochefeitaim.com.br/product/mc-super-joy-800w-autopropelido-sem-cnh/" },
  { name: "MC Joyzinha", category: "Autopropelido", price: null, power_w: 600, range_km: 40, top_speed_kmh: 32, description: "Mobilidade, leveza e dia a dia. Scooter elétrica autopropelida com 600W e 40 km de autonomia.", image_url: "modelos/joyzinha/preto/joyzinha.webp", product_url: "https://itaim.motochefe.com.br" },
  { name: "MC Jet", category: "Autopropelido", price: 10990, power_w: 1000, range_km: 40, top_speed_kmh: 32, description: "Se você precisa de um meio de transporte no dia a dia e não quer tirar carteira, o Jet é a escolha certa.", image_url: "modelos/jet/azul/extra-moto_eletrica_jet_1000w_sem_cnh_moto_chefe_21_variacao_101_1_19eff44202bb23ad1271e525ef0d71da-67544aca0bcdf.webp", product_url: "https://motochefeitaim.com.br/product/scooter-eletrica-jet-1000w-autopropelido-sem-cnh/", featured: true }
];

const CATEGORIES = [
  { name: "AUTOPROPELIDOS", count: "13 Modelos", image: "modelos/jet-max/azul/jetmax.webp", filter: "Autopropelido" },
  { name: "CICLOMOTORES", count: "4 Modelos", image: "modelos/roma/azul/roma.webp", filter: "Ciclomotor" },
  { name: "TRICICLOS", count: "4 Modelos", image: "modelos/mia-tri/preto/mia-tri.webp", filter: "Triciclo" },
  { name: "E-BIKES", count: "3 Modelos", image: "modelos/grid/preto/grid.webp", filter: "E-bike" }
];

// Helper para formatar preço
const fmtPrice = (v) => v ? "R$ " + Number(v).toLocaleString("pt-BR") : null;

// Gera slug a partir do nome do veículo ("MC Giga" → "giga", "MC X12" → "x12")
const slugify = (name) => name.toLowerCase().replace(/^mc\s+/, "").replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

// Detalhes por modelo (cores, galeria, especificações, edições especiais)
// Modelos sem entrada aqui usam apenas os dados básicos de VEHICLES.
const MODEL_DETAILS = {
  giga: {
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Azul", hex: "#1e5b94" },
      { name: "Cinza", hex: "#6b6b6b" },
      { name: "Vasco", type: "shield", edition: "vasco" }
    ],
    gallery: [
      "modelos/giga/galeria/giga-gallery-1.jpg",
      "modelos/giga/galeria/giga-gallery-2.jpg",
      "modelos/giga/galeria/giga-gallery-3.jpg",
      "modelos/giga/galeria/giga-gallery-4.jpg"
    ],
    features: [
      { icon: "🚫", text: "Sem necessidade de CNH" },
      { icon: "📋", text: "Dispensa emplacamento" },
      { icon: "📱", text: "Tecnologia NFC (pulseira e cartão)" },
      { icon: "🔋", text: "Bateria de Lítio removível com alça" },
      { icon: "🔊", text: "Alarme antifurto com bloqueio e controle" },
      { icon: "💡", text: "Farol FULL LED e buzina elétrica" },
      { icon: "🖥️", text: "Painel digital completo" },
      { icon: "🔧", text: "Freio a disco hidráulico dianteiro" },
      { icon: "⚖️", text: "Carga máxima de 160kg" },
      { icon: "🔌", text: "Carregador Turbo Bivolt 110/220V" },
      { icon: "🔄", text: "Marcha ré para manobras" },
      { icon: "🌧️", text: "Resistente a chuva" }
    ],
    specs: [
      { label: "Motor", value: "1000W" },
      { label: "Tipo de Bateria", value: "Lítio Ferro Fosfato (LiFePO4) 60V 24Ah" },
      { label: "Bateria", value: "Removível" },
      { label: "Autonomia", value: "50–60 km" },
      { label: "Velocidade Máxima", value: "32 km/h" },
      { label: "Carga Máxima", value: "160 kg" },
      { label: "Carregador", value: "Bivolt 110/220V (Turbo 5A)" },
      { label: "Tempo de Recarga", value: "5 a 8 horas" },
      { label: "Rodas", value: "Aro 10\" (New City sem câmara)" },
      { label: "Freio", value: "Disco hidráulico dianteiro" },
      { label: "Suspensão", value: "Dupla dianteira e traseira" },
      { label: "Seletor", value: "3 velocidades" }
    ],
    vasco: {
      badge: "CRVG × MOTOCHEFE · EDIÇÃO ESPECIAL OFICIAL",
      title: "A COLINA DESCEU PRA RUA",
      subtitle: "Club de Regatas Vasco da Gama × MotoChefe",
      description: "A GIGA, edição especial oficial do Club de Regatas Vasco da Gama. A cruz vai na frente. Você vai atrás dela.",
      limitedUnits: 212,
      heroImage: "modelos/giga/vasco/giga-featured.webp",
      gallery: [
        "modelos/giga/vasco/giga-featured.webp",
        "modelos/giga/vasco/giga-vasco-2.webp",
        "modelos/giga/vasco/giga-vasco-3.webp",
        "modelos/giga/vasco/giga-vasco-4.webp",
        "modelos/giga/vasco/giga-vasco-5.webp",
        "modelos/giga/vasco/giga-vasco-6.webp"
      ],
      details: [
        { title: "A cruz vai na frente", text: "A Cruz de Malta vermelha fica no painel frontal, acima do farol, no ponto mais alto, virada para o caminho." },
        { title: "O escudo nas duas laterais", text: "O escudo completo do CRVG, colorido, nas duas carenagens traseiras, ao lado do letreiro GIGA." },
        { title: "A faixa virada de lado", text: "As barras diagonais correm na lateral traseira e no para-lama — a mesma inclinação da rota do manto." },
        { title: "Branco em cima, preto embaixo", text: "A estrutura escura embaixo, a carenagem branca em cima. A cidade é o escuro. Você é a rota." },
        { title: "O encosto também é do Vasco", text: "O encosto da garupa vem branco e assinado com o escudo do CRVG e a marca MotoChefe." }
      ]
    }
  },
  x12: {
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Azul Celeste", hex: "#4a90d9" },
      { name: "Vermelho", hex: "#a01d1d" },
      { name: "Carbono", hex: "#3a3a3a" },
      { name: "Branco", hex: "#e8e8e8" },
      { name: "Amarelo", hex: "#d4a017" },
      { name: "Palmeiras", type: "shield", edition: "palmeiras" }
    ],
    gallery: [
      "modelos/x12/galeria/x12-gallery-1.webp",
      "modelos/x12/galeria/x12-gallery-2.webp",
      "modelos/x12/galeria/x12-gallery-3.webp",
      "modelos/x12/galeria/x12-gallery-4.webp",
      "modelos/x12/galeria/x12-gallery-5.webp",
      "modelos/x12/galeria/x12-gallery-6.webp"
    ],
    features: [
      { icon: "🚫", text: "Sem necessidade de CNH" },
      { icon: "📋", text: "Dispensa emplacamento" },
      { icon: "📱", text: "Liga/desliga com cartão NFC" },
      { icon: "🔋", text: "Bateria de Lítio 60V 20A removível" },
      { icon: "💡", text: "Farol e setas em LED (3 intensidades)" },
      { icon: "🖥️", text: "Painel digital em LED" },
      { icon: "🔧", text: "Freios disco dianteiro e hidráulico traseiro" },
      { icon: "💨", text: "Amortecedor a gás" },
      { icon: "⚖️", text: "Peso suportado: até 150 kg" },
      { icon: "🔌", text: "Carregador bivolt" },
      { icon: "🔊", text: "Alarme antifurto com trava de motor" },
      { icon: "🌧️", text: "Proteção IP65 contra água" }
    ],
    specs: [
      { label: "Motor", value: "1000W" },
      { label: "Tipo de Bateria", value: "Lítio 60V 20A (removível)" },
      { label: "Autonomia", value: "até 40 km" },
      { label: "Velocidade Máxima", value: "32 km/h" },
      { label: "Carga Máxima", value: "150 kg" },
      { label: "Carregador", value: "Bivolt" },
      { label: "Tempo de Recarga", value: "5 a 7 horas" },
      { label: "Níveis de Velocidade", value: "3" },
      { label: "Freios", value: "Disco dianteiro e hidráulico traseiro" },
      { label: "Rodas", value: "Liga leve" },
      { label: "Proteção", value: "IP65 contra água" },
      { label: "Conectividade", value: "NFC (cartão)" }
    ],
    palmeiras: {
      badge: "SE Palmeiras × MotoChefe · Cor Exclusiva",
      title: "O VERDE DO MAIOR CAMPEÃO",
      subtitle: "Sociedade Esportiva Palmeiras × MotoChefe",
      description: "A X12 na cor verde do Palmeiras. Para quem carrega o verde no peito e na rua. A mesma mobilidade elétrica, agora na cor do Maior Campeão do Brasil.",
      heroImage: "modelos/x12/palmeiras/x12.webp"
    }
  },
  r10: {
    badge: "EDIÇÃO LIMITADA · RONALDINHO GAÚCHO",
    features: [
      { icon: "🏆", text: "Edição Limitada Ronaldinho Gaúcho" },
      { icon: "🚫", text: "Sem necessidade de CNH" },
      { icon: "📋", text: "Dispensa emplacamento" },
      { icon: "🟢", text: "Visual esportivo verde e amarelo" },
      { icon: "📱", text: "Tecnologia NFC (pulseira e tag)" },
      { icon: "🔋", text: "Bateria LiFePO4 60V 30A removível" },
      { icon: "🔌", text: "USB Tipo A e USB Tipo C" },
      { icon: "💡", text: "Faróis em LED" },
      { icon: "🖥️", text: "Painel digital" },
      { icon: "🔄", text: "Marcha ré e Modo Parking" },
      { icon: "🔊", text: "Alarme antifurto com bloqueio" },
      { icon: "⚖️", text: "Carga máxima de 160 kg" }
    ],
    specs: [
      { label: "Motor", value: "1000W" },
      { label: "Tipo de Bateria", value: "Lítio Ferro Fosfato (LiFePO4) 60V 30A" },
      { label: "Bateria", value: "Removível" },
      { label: "Autonomia", value: "50 km (média)" },
      { label: "Velocidade Máxima", value: "32 km/h" },
      { label: "Carga Máxima", value: "160 kg" },
      { label: "Carregador", value: "Bivolt 110/220V" },
      { label: "Tempo de Recarga", value: "6 a 8 horas" },
      { label: "Freios", value: "Hidráulicos a disco dianteiro e traseiro" },
      { label: "Rodas", value: "Liga aro 12\"" },
      { label: "Conectividade", value: "NFC (pulseira e tag) + USB A/C" },
      { label: "Extras", value: "Marcha ré, Modo parking, Alarme" }
    ],
    gallery: [
      "modelos/r10/galeria/r10.png",
      "modelos/r10/galeria/r10-gallery-1.webp",
      "modelos/r10/galeria/r10-gallery-2.webp",
      "modelos/r10/galeria/r10-gallery-3.webp",
      "modelos/r10/galeria/r10-gallery-4.webp",
      "modelos/r10/galeria/r10-gallery-5.webp"
    ]
  }
};
