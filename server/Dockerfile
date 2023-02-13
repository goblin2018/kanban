# 构建镜像
FROM golang:1.18-alpine as builder
WORKDIR /build 

ENV CGO_ENABLED 0 
ENV GOPATH /go
ENV GOCACHE /go-build
ENV GOPROXY=https://goproxy.cn,direct
COPY go.mod .
COPY go.sum .
RUN --mount=type=cache,target=/go/pkg/mod/cache \
    go mod download

COPY . .

RUN --mount=type=cache,target=/go/pkg/mod/cache \
    go build -o main main.go 


# 构建运行环境
FROM scratch 

WORKDIR /app
COPY --from=builder /build/main /app
COPY --from=builder /build/config /app/config
CMD ["/app/main"]