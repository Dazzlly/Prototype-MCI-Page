#!/bin/bash
# Baixa todas as imagens de galeria de cada modelo do catálogo
# a partir das páginas de produto de motochefemaringa.com.br
set -u
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
BASE="https://www.motochefemaringa.com.br"

declare -A MODELS=(
  [mia]="autopropelido/mia-1000w-sem-cnh-moto-chefe"
  [jet-max]="autopropelido/moto-eletrica-jet-max-1000w-sem-cnh-moto-chefe"
  [jet]="autopropelido/moto-eletrica-jet-1000w-sem-cnh-moto-chefe"
  [x12]="autopropelido/scooter-eletrica-x12-1000w-32kmh-moto-chefe"
  [giga]="autopropelido/scooter-eletrica-giga-1000w-sem-cnh-moto-chefe"
  [sofia]="autopropelido/scooter-eletrica-sofia-1000w-sem-cnh-moto-chefe"
  [bob]="autopropelido/bicicleta-eletrica-bob-1000w-sem-cnh-moto-chefe"
  [ret]="autopropelido/bicicleta-eletrica-ret-1000w-sem-cnh-ventane-motors"
  [joy-super]="autopropelido/bicleta-eletrica-joy-super-800w-sem-cnh-moto-chefe"
  [joyzinha]="autopropelido/bicleta-eletrica-joyzinha-600w-sem-cnh-moto-chefe"
  [soma]="autopropelido/moto-eletrica-soma-1000w-sem-cnh-moto-chefe"
  [mia-tri]="autopropelido/moto-eletrica-mia-tri-800w-sem-cnh-moto-chefe"
  [pitica]="todos/bicicleta-eletrica-pitica-500w-sem-cnh-moto-chefe"
  [style]="bicicleta-eletrica-style-750w-bateria-48v16ah-ventane-motors-moto-chefe"
  [roma]="motos/moto-eletrica-roma-3000w-ventane-motors"
  [20]="scooters/scooter-eletrica-mc20-sport-3000w-moto-chefe"
  [x11]="scooters/scooter-eletrica-x11-3000w-moto-chefe"
  [x15]="triciclos/triciclo-eletrico-x15-3000w-moto-chefe"
  [big-tri]="triciclos/triciclo-eletrico-tri-3-lugares-1000w-sem-cnh-moto-chefe"
  [joy-tri]="triciclos/triciclo-eletrico-joy-tri-moto-chefe"
  [ved]="triciclos/triciclo-eletrico-ved-1000w-ventane-motors"
)

for slug in "${!MODELS[@]}"; do
  url="$BASE/${MODELS[$slug]}"
  dir="modelos/$slug/galeria"
  mkdir -p "$dir"
  html=$(curl -sfL -A "$UA" "$url") || { echo "ERRO $slug: falha ao baixar $url"; continue; }

  # Extrai a seção product-gallery (slides em ordem) e pega os data-src full-size
  imgs=$(echo "$html" | awk '/product-gallery zoom-true/,/<div class="share">/' \
    | grep -oE 'data-src="https://images\.tcdn\.com\.br/img/img_prod/[^"]+"' \
    | sed 's/data-src="//;s/"$//' | awk '!seen[$0]++')

  count=$(echo "$imgs" | grep -c . || true)
  echo "== $slug: $count imagens"

  n=0
  while IFS= read -r img; do
    [ -z "$img" ] && continue
    n=$((n+1))
    ext="${img##*.}"
    out="$dir/${slug}-maringa-${n}.${ext}"
    curl -sfL -A "$UA" "$img" -o "$out" || { echo "  ERRO: $img"; n=$((n-1)); continue; }
    echo "  ok: $out ($(stat -c%s "$out") bytes)"
  done <<< "$imgs"
done
