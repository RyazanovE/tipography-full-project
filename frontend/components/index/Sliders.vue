<script setup>
const slides = [
  {
    title: 'Услуги',
    subtitle: 'Все каталог услуг в одном месте',
    color: '#e5f4fb',
    icon: 'mdiBookOpenVariantOutline',
    link: '/vse-uslugi'
  },
  {
    title: 'Оплата и доставка',
    subtitle: 'Вся информация о способах оплаты и видах доставки',
    color: '#f5f1ff',
    icon: 'mdiTruckDeliveryOutline'
  },

  {
    title: 'Требования к макетам',
    subtitle: 'Размеры, шрифт, цвета',
    color: '#f2f3f5',
    icon: 'mdiMoveResize'
  },
  {
    title: 'Личный кабинет',
    subtitle: 'Вся информация о заказах',
    color: '#ebffed',
    icon: 'mdiAccountBoxOutline'
  },
  {
    title: 'Акции',
    subtitle: 'Скидки, рассрочки, бонусы',
    color: '#e5f4fb',
    icon: 'mdiCalendarMultiple'
  },
  {
    title: 'Бонусная программа',
    subtitle: 'Все об индивидуальной бонусной программе',
    color: '#e5f4fb',
    icon: 'mdiSealVariant'
  },
  {
    title: 'Партнерская программа',
    subtitle: 'Специальный предложения для партнеров',
    color: '#e5f4fb',
    icon: 'mdiHandshakeOutline'
  }
]

const containerRef = ref(null)
const swiper = useSwiper(containerRef)
</script>

<template>
  <section class="sliders-container">
    <div class="slider-wrapper">
      <ClientOnly>
        <swiper-container
          ref="containerRef"
          :slidesPerView="4"
          :space-between="20"
          style="width: 1400px; height: 200px"
        >
          <swiper-slide
            v-for="(slide, idx) in slides"
            :key="idx"
            class="swiper-slide"
            :style="{ 'background-color': slide.color }"
          >
            <NuxtLink :to="slide.link">
              <div>
                <h4>{{ slide.title }}</h4>
                <p>{{ slide.subtitle }}</p>
              </div>
              <ButtonText variant="secondary"> Подробнее </ButtonText>
              <!-- <nuxt-img
              v-if="slide.img"
              :src="slide.img"
              alt=""
              style="position: absolute; z-index: -1; bottom: 0; right: 0; height: 120px"
            /> -->
              <MdiIcon
                style="position: absolute; z-index: -1; bottom: 10px; right: 20px"
                :icon="slide.icon"
                size="120px"
              />
            </NuxtLink>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
      <button class="nav-button prev-button" @click="swiper.prev()">‹</button>
      <button class="nav-button next-button" @click="swiper.next()">›</button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.sliders-container {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.slider-wrapper {
  overflow: hidden;
  width: 1400px;
  height: 200px;
}

.swiper-slide {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  padding: 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: $all-transition;

  &:hover {
    opacity: 0.8;
  }
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 2rem;
  width: 50px;
  height: 50px;
  cursor: pointer;
  opacity: 0;
  border-radius: 50%;
  z-index: 10;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.prev-button {
  left: 10px;
}

.next-button {
  right: 10px;
}

.nav-button:hover {
  background: rgba(0, 0, 0, 0.8);
}

.slider-wrapper:hover .nav-button {
  opacity: 1;
  transform: translateY(-50%) scale(1.1);
}

.slider-wrapper:not(:hover) .nav-button {
  opacity: 0;
  transform: translateY(-50%) scale(0.9);
}
</style>
