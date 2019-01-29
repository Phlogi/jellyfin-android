FROM debian:9
ARG SOURCE_DIR=/repo
ARG ARTIFACT_DIR=/dist
ARG ANDROID_DIR=/usr/lib/android-sdk
ENV SOURCE_DIR=/repo
ENV ARTIFACT_DIR=/dist
ENV ANDROID_DIR=/usr/lib/android-sdk

RUN echo "deb http://deb.debian.org/debian stretch-backports main" >> /etc/apt/sources.list.d/backports.list \
 && apt-get update \
 && apt-get install -y mmv wget unzip git \
 && apt-get install -t stretch-backports -y npm android-sdk

RUN rm -rf ${ANDROID_DIR}/tools \
 && wget http://dl-ssl.google.com/android/repository/tools_r25.2.3-linux.zip -O tools.zip \
 && unzip tools.zip -d ${ANDROID_DIR}/ \
 && rm -f tools.zip

# Required to accept licenses:
# https://stackoverflow.com/questions/38096225/automatically-accept-all-sdk-licences/42125740#42125740
# There will be a bit of delay (approx 30 seconds)
RUN yes | ${ANDROID_DIR}/tools/bin/sdkmanager "platform-tools" "platforms;android-27" "build-tools;27.0.3" "extras;android;m2repository" "extras;google;m2repository"

RUN npm install -g npm@latest

RUN ln -sf ${SOURCE_DIR}/build.sh /build.sh

VOLUME ${ARTIFACT_DIR}/

COPY . ${SOURCE_DIR}

ENTRYPOINT ["/build.sh"]
