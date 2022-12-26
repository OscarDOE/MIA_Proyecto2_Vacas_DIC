FROM node:16
WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ENV PORT=3200

EXPOSE 3200

CMD [ "npm", "start"]

## CREAR LA IMAGEN LOCAL
## docker build ++tag 7771512001/backend-mia-aux .

##CORRER LA IMAGEN
## docker run -p 3200:3200 7771512001/backend-mia-aux

## SUBIR LA IMAGEN A DUCKERHUB
## docker push 7771512001/backend-mia-aux