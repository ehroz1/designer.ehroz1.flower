# Фотографии для сайта: промпты

Положите готовые файлы в эту папку (`assets/img/`) **с точно такими именами**. Пока какого-то фото нет, сайт показывает на его месте нарисованную заглушку, поэтому фото можно добавлять по одному.

Промпты написаны на английском, так генераторы понимают их лучше. Параметр `--ar` нужен для Midjourney. В DALL·E, Flux, Ideogram и других уберите его и выберите соотношение сторон в настройках.

## Общий стиль

Добавьте этот хвост к каждому промпту, кроме промптов на белом фоне (пакеты и этапы):

```
pastel palette of blush pink, lavender, peach and cream, soft diffused natural light, dreamy airy mood, shot on medium format film, Kodak Portra 400, subtle film grain, high detail, editorial photography, no text, no watermark, no logos
```

---

## Основные фото (сначала эти 6)

### 1. `hero.jpg`: обложка, 16:9, от 2400×1350

```
A hand gently holding up a lush, abundant bouquet of pastel garden roses, peonies, ranunculus, cosmos, white chamomile and tiny yellow tansy flowers against a soft blue sky with fluffy pink-tinted clouds, golden hour, the bouquet fills the right half of the frame, open sky on the left and lower-left for headline text, cinematic wide shot, dreamy and romantic --ar 16:9
```

### 2. `night.jpg`: блок «Проблема», 1:1, от 1600×1600

```
Moody night scene in a small flower shop: a smartphone lying face-up on a wooden florist workbench, its screen glowing softly with chat notifications, surrounded by scattered pink roses, eucalyptus, satin ribbons and kraft wrapping paper, deep blue shadows, the screen glow lighting up the petals, cinematic, shallow depth of field, screen content blurred and unreadable --ar 1:1
```

### 3. `studio.jpg`: фон за телефоном в блоке «Решение», 1:1, от 1600×1600

```
Bright airy florist studio in daylight, strongly blurred background, pastel bouquets in glass vases on a white marble table, pink and lavender flowers, soft window light, minimalist interior in blush tones, very shallow depth of field, creamy bokeh --ar 1:1
```

### 4. `about.jpg`: блок «Почему мне доверяют», 4:5, от 1600×2000

Лучше всего подойдёт **ваше настоящее фото** в светлых тонах. Если его нет, можно сгенерировать:

```
Designer's workspace on a light wooden desk: an open laptop showing a pastel flower-shop website, a smartphone with a chat app, a small glass vase with pink peonies and sweet peas, a notebook with sketches, soft morning window light, minimal aesthetic, shallow depth of field, screen content blurred and unreadable --ar 4:5
```

### 5. `offer.jpg`: спецпредложение (тёмный блок), 16:9, от 2400×1350

```
Cozy winter evening by a frosted window: a lush bouquet of pink and white roses with eucalyptus on the windowsill on the right side of the frame, warm golden fairy-light bokeh, gentle snowfall outside, deep plum and rose tones, festive New Year mood, cinematic, dark empty space on the left for text --ar 16:9
```

### 6. `final.jpg`: арка в блоке «Контакты», 3:4, от 1500×2000

```
A dreamy secret garden path overgrown with blooming flowers — coral peonies, pink garden roses, purple campanula, lavender and white cosmos — soft morning sunlight through haze, fairy-tale atmosphere, vertical composition, lush and romantic --ar 3:4
```

---

## Пакеты: букет растёт от пакета к пакету (белый фон, 1:1, от 1200×1200)

Белый фон обязателен: на сайте он растворяется в розовом фоне карточки.

### `pack-start.jpg`: «Старт»

```
A single delicate pale-pink ranunculus bud on a long slender green stem, centered, isolated on a pure white background, studio product photography, soft natural shadow, minimalist, lots of empty space around, high detail --ar 1:1
```

### `pack-vitrina.jpg`: «Витрина»

```
A small hand-tied posy of three pastel flowers — a blush garden rose, a lavender sweet pea and a cream ranunculus — with a few green leaves, centered, isolated on a pure white background, studio product photography, soft shadow, empty space around --ar 1:1
```

### `pack-shop.jpg`: «Магазин»

```
A lush medium-size bouquet of blush garden roses, pink peonies, lavender lisianthus and peach ranunculus wrapped in light-pink tissue paper with a satin ribbon, centered, isolated on a pure white background, studio product photography, soft shadow --ar 1:1
```

### `pack-full.jpg`: «Под ключ»

```
A grand abundant floral arrangement in a white ceramic vase: cascading pink peonies, garden roses, lilac delphinium, sweet peas, cosmos and trailing greenery, centered, isolated on a pure white background, luxury studio product photography, soft shadow --ar 1:1
```

---

## Этапы работы: воздушные цветы как на референсе (белый фон, 1:1, от 1000×1000)

Шаблон. Вместо `[FLOWER]` подставьте цветок из списка ниже:

```
Ethereal fine-art photograph of [FLOWER] floating in the center, soft motion blur and dreamy glow, petals slightly translucent, high-key, pure white background, airy, light pink and lavender tones, minimalism --ar 1:1
```

| Файл | `[FLOWER]` |
| --- | --- |
| `step-1.jpg` | a sprig of lilac sweet peas |
| `step-2.jpg` | a pale pink peony bud just starting to open |
| `step-3.jpg` | a white anemone with a soft lavender center |
| `step-4.jpg` | a cluster of pink ranunculus |
| `step-5.jpg` | a fully bloomed coral-pink peony |
| `step-6.jpg` | a small bunch of lavender sprigs and white spray roses |

---

## Превью для мессенджеров (необязательно)

`og.jpg`, 1200×630: картинка, которая появляется, когда ссылкой делятся в Telegram или WhatsApp. Подойдёт кроп из `hero.jpg`.
