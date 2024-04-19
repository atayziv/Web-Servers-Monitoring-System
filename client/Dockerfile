ARG ARTI_DOCKER_REPO="jf.originai.co/docker"

# --------------> The test & build image
FROM ${ARTI_DOCKER_REPO}/node:14.21.3-alpine AS build

ARG ARTI_USERNAME
ARG ARTI_PASSWORD
ARG ARTI_PROTOCOL="https"
ARG ARTI_NPM_REPO="jf.originai.co/artifactory/api/npm/npm"

# Copy dependencies files
WORKDIR /usr/src/app
COPY package.json package-lock.json ./

# Clean hashes from package-lock.json file
COPY docker-build-files/removeProps.js removeProps.js
RUN node removeProps.js package-lock.json integrity >> package-lock.json.new
RUN mv package-lock.json.new package-lock.json

# Add .npmrc file with NPM Artifactory credentials
RUN echo "registry=${ARTI_PROTOCOL}://${ARTI_NPM_REPO}" >> .npmrc
RUN echo -n "_auth=" >> .npmrc
RUN echo -n "${ARTI_USERNAME}:${ARTI_PASSWORD}" | base64 | tr -d '\n' >> .npmrc
RUN echo "" >> .npmrc
RUN echo "always-auth=true" >> .npmrc
RUN echo "strict-ssl=false" >> .npmrc

# Install dependencies
RUN npm ci

# Copy source code files
COPY . .

# Run formatter & lint & tests & build
RUN npm run prettier:ci
RUN npm run lint
RUN npm run test:ci
RUN npm run build

# --------------> The production image
FROM ${ARTI_DOCKER_REPO}/nginx:1.18.0-alpine

COPY docker-build-files/nginx.conf /etc/nginx/conf.d/default.conf

# Copy static assets from build stage
COPY --from=build /usr/src/app/build /usr/share/nginx/html/app