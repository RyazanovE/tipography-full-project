# Используем официальный Node.js образ
FROM node:20-alpine

# Устанавливаем системные зависимости
RUN apk add --no-cache python3 make g++

# Рабочая директория в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm i --force

# Копируем весь проект в контейнер
COPY . .

# Строим проект
RUN npm run build

# Открываем порт
EXPOSE 3000

# Команда для запуска
CMD ["npm", "run", "start"]