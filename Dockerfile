# Base image
FROM node:18.10-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]


# # Используем образ Node.js
# FROM node:latest

# # Устанавливаем директорию приложения в контейнере
# WORKDIR /usr/src/app

# # Копируем зависимости проекта
# COPY package*.json ./

# # Устанавливаем зависимости
# RUN npm install

# # Копируем исходный код приложения
# COPY . .

# # Открываем порт, на котором работает ваше приложение
# EXPOSE 3000

# # Команда для запуска приложения при старте контейнера
# CMD ["npm", "start"]
