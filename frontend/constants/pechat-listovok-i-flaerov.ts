export const options: { [key: string]: Array<{ label: string; value: string, cost?: number, src?: string, priceTableIndex?: number }> } = {
  material: [
    {
      label: 'Мелованная бумага',
      value: 'Мелованная бумага',
    },
    {
      label: 'Лен',
      value: 'Touch Cover',
    },
    {
      label: 'Touch Cover',
      value: 'Touch Cover',
    },
    {
      label: 'Традишн',
      value: 'Традишн',
    },
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