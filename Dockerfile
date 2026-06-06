## choose base image
## deployment node version is chosen here <---
FROM node:22

## add source
WORKDIR /ztek
COPY . .

## build
ENV SKIP_ENV_VALIDATION="true"
RUN npm install
RUN npm run build

## set mount behaviour
ENV SKIP_ENV_VALIDATION="false"
EXPOSE 3000/tcp
ENTRYPOINT npm run start

# create image like
# sudo docker build -t <insertNameHere>:latest .
#
# containerize like
# sudo docker run -d -p 3000:3000 <insertNameHere>