FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci                          # ← use npm, not yarn

COPY . .
RUN npm run build                   # ← use npm

EXPOSE 4173
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]