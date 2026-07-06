FROM madnificent/ember:6.8.1 AS builder

LABEL maintainer="info@redpencil.io"

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

RUN npm run build -prod

FROM semtech/static-file-service:0.3.0

COPY ./proxy/compression.conf /config/compression.conf
COPY ./proxy/file-upload.conf /config/file-upload.conf
COPY ./proxy/file-download.conf /config/file-download.conf

COPY --from=builder /app/dist /data
