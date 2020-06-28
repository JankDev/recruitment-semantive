FROM gradle:6.5.0-jdk14

RUN apt-get update && apt-get install entr

WORKDIR /app

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

COPY ["build.gradle","gradlew","settings.gradle","./"]
COPY gradle/ gradle/

ENTRYPOINT ["/docker-entrypoint.sh"]