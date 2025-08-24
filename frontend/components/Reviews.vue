<script setup lang="ts">
defineProps<{
  reviews: {
    text: string
    author: string
    location: string
  }[]
}>()

const containerRef = ref(null)
const swiper = useSwiper(containerRef)
</script>

<template>
  <section class="reviews-wrapper">
    <div class="slider-wrapper">
      <ClientOnly>
        <swiper-container
          ref="containerRef"
          :slidesPerView="3"
          :space-between="20"
          class="reviews-list"
        >
          <swiper-slide
            v-for="(review, index) in reviews"
            :key="index"
            class="swiper-slide review-card"
          >
            <p class="review-card__text">{{ review.text }}</p>
            <div class="review-card__footer">
              <div class="review-card__location">
                <MdiIcon icon="mdiMapMarker" size="20" />
                <span>{{ review.location }}</span>
              </div>
              <div class="review-card__rating">
                <MdiIcon v-for="n in 5" :key="n" icon="mdiStar" size="20" />
              </div>
            </div>
            <div class="review-card__author">{{ review.author }}</div>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
      <button class="nav-button prev-button" @click="swiper.prev()">‹</button>
      <button class="nav-button next-button" @click="swiper.next()">›</button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.slider-wrapper:hover .nav-button {
  opacity: 1;
  transform: translateY(-50%) scale(1.1);
}

.slider-wrapper:not(:hover) .nav-button {
  opacity: 0;
  transform: translateY(-50%) scale(0.9);
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

.reviews-wrapper {
  position: relative;
}

.reviews-list {
  display: grid;
  overflow: visible;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: $normal_gap;
  align-items: center;
  height: 230px;
}

.review-card {
  background-color: #fff;
  margin-top: 10px;
  padding: $normal_gap;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
  transition: box-shadow 0.3s ease;

  &__text {
    font-size: 16px;
    color: #555;
    margin-bottom: $normal_gap;
    line-height: 1.6;
    flex-grow: 1;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: calc($normal_gap / 2);
  }

  &__location {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #666;
    gap: calc($normal_gap / 2);

    svg {
      fill: #666;
    }
  }

  &__rating {
    display: flex;
    gap: 2px;

    svg {
      fill: #f9b400;
    }
  }

  &__author {
    font-size: 14px;
    font-weight: 500;
    color: #888;
    text-align: right;
  }
}
</style>


и это плз