# Versão 20.12.2 (LTS mais recente)
FROM node:20 as builder

# Diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie o arquivo package.json e o arquivo package-lock.json 
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todo o conteúdo do diretório local para o diretório de trabalho no contêiner
COPY . .

# Build da pasta dist
RUN npm run build

# Segunda fase de construção
FROM node:20

# Diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie apenas os arquivos necessários para a segunda fase
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

# Instala somente as dependências de produção
RUN npm install --omit=dev

# Instala class-transformer
RUN npm install class-transformer

# Inicia pela pasta dist
CMD [ "npm", "run", "start:prod" ]