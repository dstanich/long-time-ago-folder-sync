FROM node:16

# Env value for location of config file
ENV CONFIG_FILE /data/.folder-sync-config.js

# Copy app files and install
COPY . .
RUN npm install --production

CMD [ "sh", "-c", "node index.js ${CONFIG_FILE}" ]
