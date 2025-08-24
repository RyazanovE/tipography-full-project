<template>
  <v-card
    class="mx-2 elevation-5"
    max-width="400"
    title="Яндекс"
  >
  <template v-slot:append>
    <v-rating
      :model-value="5"
      color="yellow-darken-3"
      half-increments
      :size='26'
    />
  </template>
  <template v-slot:prepend>
    <v-img height="26" width='26' src="/icon-yandex-maps-marker.svg" />
  </template>
    <v-card-text class="text-body-2 py-2">
      "Неоднократно обращалась в Копицентр Copytkks: цены на услуги ниже, чем в моем спальном
			районе, вежливые, отзывчивые и высокопрофессиональные сотрудники. А сегодня мне помогли в
			решении совершенно нестандартного вопроса, с которым я не знала, куда обратиться. На
			редкость порядочные люди. Качество и сервис на высочайшем уровне. Рекомендую."
    </v-card-text>

    <v-card-actions>
      <v-list-item class="w-100">
        <template v-slot:prepend>
          <v-avatar
            color="grey-darken-3"
            image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-avatar>
        </template>

        <v-list-item-title>Лидия Ф</v-list-item-title>

        <template v-slot:append>
          <div class="justify-self-end">
            {{ new Date().toLocaleDateString() }}
          </div>
        </template>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script setup>

</script>
