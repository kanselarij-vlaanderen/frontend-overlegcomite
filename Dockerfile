FROM madnificent/ember:6.8.1 AS builder

LABEL maintainer="info@redpencil.io"

WORKDIR /app
COPY package.json package-lock.json .
RUN npm ci
COPY . .

RUN npm run build -prod

FROM semtech/ember-proxy-service:1.4.0

ENV STATIC_FOLDERS_REGEX "^/(assets|fonts|files|ember-pdfjs-wrapper)/"

COPY ./proxy/torii-authorization.conf /config/torii-authorization.conf
COPY ./proxy/file-upload.conf /config/file-upload.conf

COPY --from=builder /app/dist /app
