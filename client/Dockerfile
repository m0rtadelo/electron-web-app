FROM node:10 as builder

# install and cache app dependencies
# COPY package.json package-lock.json default.conf tsconfig.json webpack.* ./

WORKDIR /frontend

COPY . .

RUN npm install
RUN npm run build


FROM nginx
COPY --from=builder /frontend/dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf