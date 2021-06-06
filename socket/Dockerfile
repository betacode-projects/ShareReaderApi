FROM elixir:1.12.0

ENV NODE_VERSION 14.x

RUN curl -sL https://deb.nodesource.com/setup_${NODE_VERSION} | bash \
  && apt-get install -y nodejs

RUN npm install npm@latest -g

RUN mix local.hex --force && \
  mix archive.install hex phx_new 1.5.9 --force && \
  mix local.rebar --force

WORKDIR /usr/src/socket

COPY mix.* .

RUN mix deps.get

COPY . .

RUN mix deps.get