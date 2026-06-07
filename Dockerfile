 
# The image will not contain the built webpage (aka `npm run build` will not be run 
# until mounted) because, env is required during build, but may not leaked into the
# docker image, as this is public. Instead the site will be built on the destination server.

# create image like
# sudo docker build -t <insertNameHere>:latest .
#
# containerize like
# sudo docker run -d -p 5000:5000 --env-file .env <insertNameHere>

# ***************************************************



## choose base image (server node version will be specified here)
FROM node:22

## add source, (and packages)
WORKDIR /ztek
COPY . .
RUN npm install

## set mount behaviour
EXPOSE 5000/tcp
ENTRYPOINT npm run build && npm run start


