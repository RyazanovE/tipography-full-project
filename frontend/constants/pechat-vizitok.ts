export const services = [
  {
    title: 'Печать визиток',
    img: './images/categories/visiting-cards.png',
    to: '/vse-uslugi/vizitki',
    icon: 'mdiCardAccountDetails',
  },
  // {
  //   title: 'Печать документов А3/А4',
  //   img: './images/categories/a3-a4-docs.png',
  //   to: '/vse-uslugi-documentov-a3-a4'
  // },
  {
    title: 'Печать листовок и флаеров',
    img: './images/categories/listovki-i-flaeri.png',
    to: '/vse-uslugi/listovki-i-flaeri',
    icon: 'mdiFileDocument'
  },
  {
    title: 'Печать буклетов',
    img: './images/categories/buklet.png',
    icon: 'mdiBookOpenVariant'
  },
  {
    title: 'Широкоформатная печать',
    img: './images/categories/poster.png',
    icon: 'mdiPrinter',
    disabled: true,
  },
  {
    title: 'Печать открыток',
    img: './images/categories/envelope.png',
    to: '/pechat-nakleek',
    icon: 'mdiEmailOpen',
    disabled: true,
  },
  {
    title: 'Печать наклеек и стикерпаков',
    img: './images/categories/sticker.png',
    to: '/pechat-nakleek',
    icon: 'mdiStickerText',
    disabled: true,
  },
  {
    title: 'Печать документов и чертежей',
    img: './images/categories/docs.png',
    to: './listovie-stikerpaki',
    icon: 'mdiPrinterPos',
    disabled: true,
  },
  {
    title: 'Печать фото',
    img: './images/categories/photo.png',
    to: './listovie-stikerpaki',
    icon: 'mdiImage',
    disabled: true,
  }
]

export const reviews = [
  {
    text: 'Очень довольны качеством печати и скоростью выполнения заказа! Обязательно обратимся снова.',
    author: 'Анна Петрова',
    location: 'Москва',
  },
  {
    text: 'Отличный сервис! Помогли с макетом и быстро изготовили визитки. Спасибо!',
    author: 'Иван Смирнов',
    location: 'Санкт-Петербург',
  },
  {
    text: 'Всё сделали аккуратно и в срок. Рекомендую!',
    author: 'Екатерина Лебедева',
    location: 'Новосибирск',
  },
  {
    text: 'Очень довольны качеством печати и скоростью выполнения заказа! Обязательно обратимся снова.',
    author: 'Анна Петрова',
    location: 'Москва',
  },
  {
    text: 'Отличный сервис! Помогли с макетом и быстро изготовили визитки. Спасибо!',
    author: 'Иван Смирнов',
    location: 'Санкт-Петербург',
  },
  {
    text: 'Всё сделали аккуратно и в срок. Рекомендую!',
    author: 'Екатерина Лебедева',
    location: 'Новосибирск',
  },
]

export const priceRows = [
  { label: 'A4 черно-белая', prices: [28, 26, 24, 24, 22, 18] },
  { label: 'A4 цветная', prices: [56, 53, 50, 50, 47, 43] },
  { label: 'A3 черно-белая', prices: [45, 42, 39, 36, 33, 29] },
  { label: 'A3 цветная', prices: [78, 73, 68, 63, 59, 54] }
]

export const deliveries=[
  {
    type: 'Бесплатная доставка по Москве',
    note: '* при заказе через сайт от 10 000 ₽ или через менеджеров от 20 000 ₽',
    cost: '0 ₽',
    time: 'от 1 дня',
  },
  {
    type: 'Доставка курьером по Москве (в пределах МКАД)',
    cost: '790 ₽',
    time: 'от 1 до 3 дней',
  },
  {
    type: 'Доставка курьером за МКАД',
    cost: '1000 ₽',
    time: 'от 1 до 3 дней',
  },
  {
    type: 'Срочная доставка такси (Москва и область)',
    note: 'Максимальный вес заказа 20 кг',
    cost: '3000 ₽ (физ. лица)<br>5000 ₽ (юр. лица)',
    time: 'день в день',
  },
  {
    type: 'Доставка СДЭК "до двери" по России',
    cost: 'от 790 ₽',
    time: 'от 1 до 10 дней',
  },
  {
    type: 'Доставка до пункта самовывоза СДЭК',
    cost: 'от 790 ₽',
    time: 'от 1 до 10 дней',
  },
];

export const pechatVizitokPrices = {
  'Мелованная бумага': {
    '1+0': [200, 390, 545, 790, 960, 1140, 1333, 1535, 1690, 1860],
    '1+1': [300, 585, 820, 1188, 1450, 1710, 2000, 2300, 2530, 2785],
    '4+0': [400, 780, 1090, 1580, 1930, 2280, 2670, 3070, 3375, 3710],
    '4+4': [500, 975, 1365, 1980, 2415, 2850, 3340, 3835, 4220, 4640]
  },
  'Лен': {
    '1+0': [950, 1855, 2595, 3765, 4590, 5415, 6335, 7290, 8015, 8815],
    '1+1': [1000, 1950, 2730, 3960, 4830, 5670, 6670, 7670, 8435, 9280],
    '4+0': [1000, 1950, 2730, 3960, 4830, 5670, 6670, 7670, 8435, 9280],
    '4+4': [1200, 2340, 3280, 4750, 5795, 6840, 8000, 9200, 10125, 11130]
  },
  'Touch Cover': {
    '1+0': [950, 1855, 2595, 3765, 4590, 5415, 6335, 7290, 8015, 8815],
    '1+1': [1000, 1950, 2730, 3960, 4830, 5670, 6670, 7670, 8435, 9280],
    '4+0': [1000, 1950, 2730, 3960, 4830, 5670, 6670, 7670, 8435, 9280],
    '4+4': [1200, 2340, 3280, 4750, 5795, 6840, 8000, 9200, 10125, 11130]
  }
}




export const options: { [key: string]: Array<{ label: string; value: string, cost?: number, src?: string, priceTableIndex?: number }> } = {
  material: [
    {
      label: 'Мелованная бумага',
      value: 'Мелованная бумага',
    },
    {
      label: 'Touch Cover',
      value: 'Touch Cover',
    },
    // {
    //   label: 'Традишн',
    //   value: 'Традишн',
    // },
    {
      label: 'Лен',
      value: 'Лен',
    },
  ],
  size: [
    {
      label: '90x50 мм',
      value: '90x50 мм',
    },
    {
      label: '85x55 мм',
      value: '85x55 мм',
    },
  ],
  designType: [
    {
      label: 'Использовать свой макет',
      value: 'Использовать свой макет',
    },
    {
      label: 'Выбрать из готовых шаблонов',
      value: 'Выбрать из готовых шаблонов',
    },
    {
      label: 'Онлаин редактор',
      value: 'Онлаин редактор',
    },
    {
      label: 'Заказать дизаин',
      value: 'Заказать дизаин',
    },
  ],
  paperType: [
    {
      label: 'А4',
      value: 'А4',
    },
    {
      label: 'A5',
      value: 'A5',
    },
  ],
  printType: [
    {
      label: 'Односторонняя',
      value:'Односторонняя',
    },
    {
      label: 'Двусторонняя',
      value:'Двусторонняя',
    },
  ],
  color: [
    {
      label: 'Черно-белая',
      value: 'Черно-белая',
    },
    {
      label: 'Цветная',
      value: 'Цветная',
    },
  ],
  format: [
    {
      label: 'Односторонняя',
      value: 'Односторонняя',
    },
    {
      label: 'Двусторонняя',
      value: 'Двусторонняя',
      cost: 220,
    },
  ],
  amount: [
    {
      label: '100 шт',
      value: '100',
    },
    {
      label: '200 шт',
      value: '200',
    },
    {
      label: '300 шт',
      value: '300',
    },
    {
      label: '400 шт',
      value: '400',
    },
    {
      label: '500 шт',
      value: '500',
    },
    {
      label: '600 шт',
      value: '600',
    },
    {
      label: '700 шт',
      value: '700',
    },
    {
      label: '800 шт',
      value: '800',
    },
    {
      label: '900 шт',
      value: '900',
    },
    {
      label: '1000 шт',
      value: '1000',
    },
  ],
  productionTime: [
    {
      label: 'Стандартное 1-2 рабочих дня',
      value: 'Стандартное 1-2 рабочих дня',
    },
    {
      label: 'Срочное до 4х часов',
      value: 'Срочное до 4х часов',
    },
  ],

  lamination: [
    {
      label: 'Не требуется',
      value: 'Не требуется',
      cost: 0,
    },
    {
      label: 'Одностороннее',
      value: 'Одностороннее',
      cost: 500,
    },
    {
      label: 'Двустороннее',
      value: 'Двустороннее',
      cost: 520,
    },
  ]
}