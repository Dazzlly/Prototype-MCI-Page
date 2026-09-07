#!/bin/bash
# Baixa as imagens de cada variante de cor de cada modelo
# (páginas ?variant_id=N do site motochefemaringa.com.br)
# Gera scripts/variant-manifest.tsv: slug<TAB>nome_cor<TAB>slug_cor<TAB>id<TAB>caminho_imagem
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

OUT="scripts/variant-manifest.tsv"
touch "$OUT"

# retoma: pula modelos já presentes no manifesto
for slug in "${!MODELS[@]}"; do
  if grep -q "^$slug	" "$OUT" 2>/dev/null; then echo "== $slug: já baixado, pulando"; continue; fi
  url="$BASE/${MODELS[$slug]}"
  html=$(curl -sfL -A "$UA" "$url") || { echo "ERRO $slug: falha ao baixar $url"; continue; }

  variants=$(echo "$html" | grep -oE 'data-variant-type="Cor"[^>]*data-variant-value="[^"]*"[^>]*data-id="[0-9]+"')

  [ -z "$variants" ] && { echo "== $slug: sem variantes de cor"; continue; }
  echo "== $slug"

  while IFS= read -r vline; do
    vname=$(echo "$vline" | sed 's/.*data-variant-value="\([^"]*\)".*/\1/')
    vid=$(echo "$vline" | sed 's/.*data-id="\([0-9]*\)".*/\1/')
    vslug=$(echo "$vname" | iconv -f utf-8 -t ascii//TRANSLIT | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g; s/--*/-/g; s/^-//; s/-$//')
    echo "  cor: $vname (id=$vid, pasta=$vslug)"

    vhtml=$(curl -sfL -A "$UA" "$url?variant_id=$vid") || { echo "    ERRO variante $vid"; continue; }
    imgs=$(echo "$vhtml" | awk '/product-gallery zoom-true/,/<div class="share">/' \
      | grep -oE 'data-src="https://images\.tcdn\.com\.br/img/img_prod/[^"]+"' \
      | sed 's/data-src="//;s/"$//' | awk '!seen[$0]++')

    dir="modelos/$slug/$vslug"
    mkdir -p "$dir"
    n=0
    while IFS= read -r img; do
      [ -z "$img" ] && continue
      n=$((n+1))
      ext="${img##*.}"
      out="$dir/${slug}-${vslug}-${n}.${ext}"
      curl -sfL -A "$UA" "$img" -o "$out" || { echo "    ERRO: $img"; continue; }
      echo "    ok: $out"
      printf '%s\t%s\t%s\t%s\t%s\n' "$slug" "$vname" "$vslug" "$vid" "$out" >> "$OUT"
    done <<< "$imgs"
  done <<< "$variants"
done

echo "total de linhas no manifesto: $(wc -l < "$OUT")"
