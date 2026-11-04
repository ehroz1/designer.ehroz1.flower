# Фотографии для сайта: промпты

Сайт универсальный — для любого малого и среднего бизнеса. Сейчас на нём стоят цветочные фото из первой версии; их можно заменить по одному. Сохраните новый файл в эту папку **с тем же именем**, и он сразу появится на сайте.

Промпты на английском. `--ar` нужен для Midjourney; в других генераторах уберите его и выберите пропорции в настройках.

## Общий стиль (добавьте к каждому промпту, кроме промптов на белом фоне)

```
editorial magazine photography, natural daylight, muted warm palette with a single vermilion red accent, shot on medium format film, subtle film grain, high detail, no text, no watermark, no logos
```

## Основные фото

| Файл | Где на сайте | Пропорции | Промпт |
| --- | --- | --- | --- |
| `hero.jpg` | Обложка | 16:9, от 2400 px | `A small business owner's hand holding a smartphone up against a soft blue sky, the phone screen showing an incoming order notification, empty sky on the left for text, cinematic wide shot --ar 16:9` |
| `night.jpg` | «Где бизнес теряет деньги» | 1:1 | `Night scene: a smartphone glowing with unread chat notifications lying on the counter of a closed small shop or café, chairs on tables, deep blue shadows, screen content blurred --ar 1:1` |
| `studio.jpg` | Фон за телефоном в «Решении» | 1:1 | `Bright modern workspace of a small business owner, strongly blurred background, laptop, packed parcels and a coffee cup on a light wooden table, soft window light, creamy bokeh --ar 1:1` |
| `offer.jpg` | Спецпредложение (тёмный блок) | 16:9 | `Cozy winter evening in a small shop window, warm golden fairy-light bokeh, gentle snowfall outside, wrapped gift boxes on the right side of the frame, festive New Year mood, dark empty space on the left for text --ar 16:9` |
| `final.jpg` | Внизу, под контактами | 3:4 или 16:9 | `Sunny city street in Astana with small shop and café storefronts, people walking, warm afternoon light, wide calm composition --ar 16:9` |
| `about.jpg` | «Почему мне доверяют» | 4:5 | Ваше настоящее фото (уже стоит). |

## Пакеты: от маленького к большому (белый фон, 1:1, от 1200 px)

Белый фон обязателен — на сайте он растворяется в фоне страницы.

| Файл | Промпт |
| --- | --- |
| `pack-start.jpg` | `A single smartphone lying on a pure white background, screen showing a simple chat bot interface, top-down studio product photo, soft shadow, minimal --ar 1:1` |
| `pack-vitrina.jpg` | `A laptop and a smartphone side by side on a pure white background, both showing a clean website, studio product photo, soft shadow --ar 1:1` |
| `pack-shop.jpg` | `A laptop showing an online store, a smartphone and two neatly packed parcels with a red ribbon on a pure white background, studio product photo, soft shadow --ar 1:1` |
| `pack-full.jpg` | `A complete small-business setup on a pure white background: laptop, tablet, smartphone, payment terminal and stacked parcels, studio product photo, soft shadow --ar 1:1` |

## Этапы (белый фон, 1:1, от 1000 px)

Шаблон — вместо `[OBJECT]` подставьте предмет из таблицы:

```
Minimal studio photograph of [OBJECT] centered on a pure white background, soft shadow, high-key, one small vermilion red accent, lots of empty space --ar 1:1
```

| Файл | `[OBJECT]` |
| --- | --- |
| `step-1.jpg` | a smartphone on a call |
| `step-2.jpg` | a paper sketch of a website layout with a pencil |
| `step-3.jpg` | a signed contract with a pen |
| `step-4.jpg` | an open laptop with code on the screen |
| `step-5.jpg` | a paper rocket |
| `step-6.jpg` | a headset |

## Превью для мессенджеров

`og.jpg`, 1200×630 — кроп из `hero.jpg`.
