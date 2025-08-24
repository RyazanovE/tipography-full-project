# Используем официальный Node.js образ с Alpine Linux
FROM node:20-alpine

# Устанавливаем системные зависимости для нативных модулей
RUN apk add --no-cache \
    python3 \
    make \
    gcc \
    g++ \
    cairo-dev \
    pango-dev \
    jpeg-dev \
    giflib-dev \
    librsvg-dev

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm i --force

# Копируем остальной проект
COPY . .

# Сборка проекта
RUN npm run build

# Открываем порт
EXPOSE 4000

# Команда запуска в продакшене
CMD ["node", "dist/main"]