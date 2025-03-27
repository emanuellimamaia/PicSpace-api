# Usa a versão correta do Node
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos necessários para instalação
COPY package*.json ./

# Instala dependências de forma eficiente
RUN npm install --only=production

# Copia o restante dos arquivos do projeto
COPY . .
RUN npx prisma generate

# Compila o projeto NestJS
RUN npx prisma generate && npm run build

# Expõe a porta usada pela API (ajuste se necessário)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
