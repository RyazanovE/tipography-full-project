export const useBreadcrumbs = () => useState<Array<{ title: string; to: string }>>('breadcrumbs', () => [])
