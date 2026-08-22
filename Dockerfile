FROM node:24

WORKDIR /app

COPY . .

# postinstall runs "vite build", so this also produces dist/
RUN npm install

# server.js reads PORT; 3000 keeps containerPort and the Service unchanged
ENV PORT=3000
EXPOSE 3000

# Serve the built dist/ instead of the Vite dev server
CMD ["npm", "start"]
