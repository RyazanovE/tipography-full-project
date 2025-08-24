<template>
  <h1 class="title">
    <span class="title__text">
      <slot></slot>
    </span>
    <!-- <div class="title__underline"></div> -->
  </h1>
</template>

<style scoped lang="scss">
.title {
  position: relative;
  color: #1e293b;
  text-align: center;
  margin: 0 0 48px 0;
  padding: 0;
  font-weight: 700;
  line-height: 1.2;
  display: inline-block;
  width: 100%;
  
  &__text {
    position: relative;
    z-index: 2;
    font-size: 2.5rem;
    letter-spacing: -0.5px;
    text-shadow: 
      0 2px 4px rgba(0, 0, 0, 0.1),
      0 4px 8px rgba(59, 130, 246, 0.15);
    transition: all 0.3s ease;
  }
  
  &__underline {
    position: relative;
    height: 4px;
    width: 80px;
    margin: 16px auto 0;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
    border-radius: 2px;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.4) 50%, 
        transparent 100%);
      animation: shine 3s ease-in-out infinite;
    }
    
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, 
        #3b82f6, #8b5cf6, #ec4899, #8b5cf6, #3b82f6);
      background-size: 200% 100%;
      animation: gradientShift 4s ease infinite;
    }
  }
  
  // Анимация появления
  opacity: 0;
  transform: translateY(30px);
  animation: titleAppear 0.8s ease forwards;
}

@keyframes titleAppear {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shine {
  0% {
    left: -100%;
  }
  20% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes gradientShift {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

// Варианты размера
.title--large {
  .title__text {
    font-size: 3rem;
  }
}

.title--small {
  .title__text {
    font-size: 2rem;
  }
}

// Варианты выравнивания
.title--left {
  text-align: left;
  
  .title__underline {
    margin-left: 0;
    margin-right: auto;
  }
}

.title--right {
  text-align: right;
  
  .title__underline {
    margin-left: auto;
    margin-right: 0;
  }
}

// Темная тема
// @media (prefers-color-scheme: dark) {
//   .title {
//     color: #f1f5f9;
    
//     &__text {
//       text-shadow: 
//         0 2px 4px rgba(0, 0, 0, 0.3),
//         0 4px 8px rgba(96, 165, 250, 0.2);
//     }
//   }
// }

// Адаптивность
@media (max-width: 768px) {
  .title {
    margin-bottom: 32px;
    
    &__text {
      font-size: 2rem;
    }
    
    &__underline {
      width: 60px;
      margin-top: 12px;
    }
  }
  
  .title--large {
    .title__text {
      font-size: 2.5rem;
    }
  }
  
  .title--small {
    .title__text {
      font-size: 1.75rem;
    }
  }
}

// Эффект при наведении
@media (hover: hover) {
  .title:hover {
    .title__text {
      transform: translateY(-2px);
      text-shadow: 
        0 4px 8px rgba(0, 0, 0, 0.15),
        0 6px 12px rgba(59, 130, 246, 0.25);
    }
    
    .title__underline::before {
      animation-duration: 1.5s;
    }
    
    .title__underline::after {
      animation-duration: 2s;
    }
  }
}
</style>