FROM node:18

WORKDIR /yanua/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY prisma ./prisma/
COPY pgdata ./pgdata/

RUN npm install --legacy-peer-deps
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npx prisma generate
# RUN npx prisma migrate dev

RUN npm run build

EXPOSE 3001
CMD [ "node", "dist/main" ]

