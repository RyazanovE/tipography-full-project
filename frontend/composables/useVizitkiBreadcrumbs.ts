export const useVizitkiBreadcrumbs = () => {
  const setupBreadcrumbs = () => {
    useInitiateBreadcrumbs([
      { title: 'Главная', to: '/' },
      { title: 'Все услуги', to: '/vse-uslugi' },
      { title: 'Печать визиток', to: '/vizitki' }
    ])
  }

  return {
    setupBreadcrumbs
  }
}
