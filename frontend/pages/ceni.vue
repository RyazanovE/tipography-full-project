<script setup lang="ts">
import { useBreadcrumbs } from '~/stores/breadcrumbs'
const breadcrumbs = useBreadcrumbs()

breadcrumbs.value = [
  {
    title: 'Главная',
    to: '/'
  },
  {
    title: 'Цены на услуги',
    to: '/ceni'
  }
]

const vizitigCardsMel = [
  {
    label: '1+0 (ч/б, 1-сторонние)',
    prices: [200, 390, 545, 790, 960, 1140, 1333, 1535, 1690, 1860]
  },
  {
    label: '1+1 (ч/б, 2-сторонние)',
    prices: [300, 585, 820, 1188, 1450, 1710, 2000, 2300, 2530, 2785]
  },
  {
    label: '4+0 (цветные, 1-сторонние)',
    prices: [400, 780, 1090, 1580, 1930, 2280, 2670, 3070, 3375, 3710]
  },
  {
    label: '4+4 (цветные, 2-сторонние)',
    prices: [500, 975, 1365, 1980, 2415, 2850, 3340, 3835, 4220, 4640]
  }
]

const vizitigCardsLen = [
  {
    label: '1+0 (ч/б, 1-сторонние)',
    prices: [950, 1855, 2595, 3765, 4590, 5415, 6335, 7290, 8015, 8815]
  },
  {
    label: '1+1 (ч/б, 2-сторонние)',
    prices: [1000, 1950, 2730, 3960, 4830, 5670, 6670, 7670, 8435, 9280]
  },
  {
    label: '4+0 (цветные, 1-сторонние)',
    prices: [1000, 1950, 2730, 3960, 4830, 5670, 6670, 7670, 8435, 9280]
  },
  {
    label: '4+4 (цветные, 2-сторонние)',
    prices: [1200, 2340, 3280, 4750, 5795, 6840, 8000, 9200, 10125, 11130]
  }
]

const vizitigCardsTouchCover = [
  {
    label: '1+0 (ч/б, 1-сторонние)',
    prices: [950, 1855, 2595, 3765, 4590, 5415, 6335, 7290, 8015, 8815]
  },
  {
    label: '1+1 (ч/б, 2-сторонние)',
    prices: [1000, 1950, 2730, 3960, 4830, 5670, 6670, 7670, 8435, 9280]
  },
  {
    label: '4+0 (цветные, 1-сторонние)',
    prices: [1000, 1950, 2730, 3960, 4830, 5670, 6670, 7670, 8435, 9280]
  },
  {
    label: '4+4 (цветные, 2-сторонние)',
    prices: [1200, 2340, 3280, 4750, 5795, 6840, 8000, 9200, 10125, 11130]
  }
]

const vizitigCardsMajestic = [
  { label: '1+0 (ч/б, 1-сторонние)', prices: [950, 1855, 2595, 3765, 4590, 5415, 6335, 7290, 8015, 8815] },
  { label: '1+1 (ч/б, 2-сторонние)', prices: [1000, 1950, 2730, 3960, 4830, 5670, 6670, 7670, 8435, 9280] },
  { label: '4+0 (цветные, 1-сторонние)', prices: [1000, 1950, 2730, 3960, 4830, 5670, 6670, 7670, 8435, 9280] },
  { label: '4+4 (цветные, 2-сторонние)', prices: [1200, 2340, 3280, 4750, 5795, 6840, 8000, 9200, 10125, 11130] }
];

const a4Leaflets  = [
  { label: '1+0 (ч/б, 1-сторонние)', prices: [950, 1235, 1570, 1880, 3100, 3790, 4470, 5050, 5455, 5620] },
  { label: '1+1 (ч/б, 2-сторонние)', prices: [1300, 1690, 2145, 2570, 4250, 5180, 6115, 6910, 7460, 7700] },
  { label: '4+0 (цветные, 1-сторонние)', prices: [1400, 1820, 2310, 2770, 4579, 5580, 6585, 7440, 8040, 8285] },
  { label: '4+4 (цветные, 2-сторонние)', prices: [2200, 2860, 3630, 4360, 7190, 8770, 10350, 11700, 12630, 13020] }
];

const a5Leaflets = [
  {
    label: '1+0 (ч/б, 1-сторонние)',
    prices: [650, 830, 985, 1180, 1950, 2370, 2795, 3165, 3415, 3525]
  },
  {
    label: '1+1 (ч/б, 2-сторонние)',
    prices: [870, 1130, 1345, 1615, 2660, 3245, 3830, 4330, 4675, 4820]
  },
  {
    label: '4+0 (цветные, 1-сторонние)',
    prices: [950, 1215, 1450, 1740, 2870, 3495, 4130, 4660, 5035, 5190]
  },
  {
    label: '4+4 (цветные, 2-сторонние)',
    prices: [1470, 1910, 2275, 2730, 4500, 5490, 6480, 7325, 7910, 8160]
  }
];

const a6Leaflets = [
  {
    label: '1+0 (ч/б, 1-сторонние)',
    prices: [450, 550, 655, 785, 1295, 1585, 1865, 2110, 2280, 2350]
  },
  {
    label: '1+1 (ч/б, 2-сторонние)',
    prices: [580, 750, 895, 1075, 1775, 2165, 2555, 2885, 3115, 3215]
  },
  {
    label: '4+0 (цветные, 1-сторонние)',
    prices: [625, 810, 965, 1160, 1910, 2330, 2750, 3110, 3355, 3460]
  },
  {
    label: '4+4 (цветные, 2-сторонние)',
    prices: [980, 1275, 1515, 1820, 3000, 3665, 4320, 4885, 5270, 5440]
  }
];

const miniCalendars = [
  {
    label: 'Без рекламных полей',
    prices: [160, 130, 110]
  },
  {
    label: 'Одно рекламное поле',
    prices: [200, 145, 115]
  },
  {
    label: 'Три рекламных поля',
    prices: [240, 170, 135]
  }
];


const midiCalendars = [
  {
    label: 'Без рекламных полей',
    prices: [185, 160, 145]
  },
  {
    label: 'Одно рекламное поле',
    prices: [265, 215, 185]
  },
  {
    label: 'Три рекламных поля',
    prices: [335, 265, 230]
  }
];

const pocketCalendars = [
  {
    label: '4+4 (цветные, 2-сторонние)',
    prices: [1800, 2000, 2550]
  }
]

const lifletA4 = [
  {
    label: '4+4 (цветные)',
    prices: [2900, 3330, 4090]
  }
]
const bukletA3 = [
  {
    label: '4+4 (цветные)',
    prices: [3550, 4070, 5005, 6960]
  }
]

const poster115 = [
  {
    label: '4+0 (цветные)',
    prices: [1950, 2740, 3450, 5750]
  }
]

const poster150 = [
  {
    label: '1+0 (ч/б)',
    prices: [2100, 3255, 3900, 6200]
  }
]

const bukletQuantities = [50, 100, 200, 300]
const quantities = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
const calendarQuantities = [50, 100, 200]
</script>

<template>
  <UiCard class="services">
    <template #title>Визитки</template>
    <PriceTable title="Мелованная бумага" :rows="vizitigCardsMel" :quantities />
    <PriceTable title="Лен" :rows="vizitigCardsLen" :quantities />
    <PriceTable title="TouchCover" :rows="vizitigCardsTouchCover" :quantities />
  </UiCard>
  <UiCard class="services">
    <template #title>Листовки</template>
    <PriceTable title="А4 (210х297 мм)" :rows="a4Leaflets" :quantities />
    <PriceTable title="А5 (210х148 мм)" :rows="a5Leaflets" :quantities />
    <PriceTable title="А6 (148х105 мм)" :rows="a6Leaflets" :quantities />
  </UiCard>
  <UiCard class="services">
    <template #title>Календари</template>
    <PriceTable title="210х295 мм" :rows="miniCalendars" :quantities='calendarQuantities' />
    <PriceTable title="230х335 мм" :rows="midiCalendars" :quantities='calendarQuantities' />
    <PriceTable title="70х100" :rows="pocketCalendars" :quantities='calendarQuantities' />
  </UiCard>
  <UiCard class="services">
    <template #title>Буклеты</template>
    <PriceTable title="Лифлеты А4" :rows="lifletA4" :quantities='bukletQuantities' />
    <PriceTable title="Буклеты А3" :rows="bukletA3" :quantities='bukletQuantities' />
  </UiCard>
  <UiCard class="services">
    <template #title>Постеры A3</template>
    <PriceTable title="Бумага 115 г/м2" :rows="poster115" :quantities='bukletQuantities' />
    <PriceTable title="Бумага 150 г/м2" :rows="poster150" :quantities='bukletQuantities' />
  </UiCard>
</template>

<style scoped lang="scss">
.services:not(:last-child) {
  margin-bottom: calc(2 * $normal_gap);
}
</style>
