import { useBreadcrumbs } from '~/stores/breadcrumbs';

export const breadcrumbsDefaultValue = [
  {
    title: 'Главная',
    to: '/'
  },
  {
    title: 'Личный кабинет',
    to: '/my'
  }
]

export const useInitiateBreadcrumbs = (initialValue?: Array<{ title: string; to: string }>) => {
  const breadcrumbs = useBreadcrumbs();

  breadcrumbs.value = initialValue ?? breadcrumbsDefaultValue;

  return breadcrumbs
}