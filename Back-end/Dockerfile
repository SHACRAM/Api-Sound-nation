# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.9.0

FROM node:${NODE_VERSION}-alpine

# Utiliser un environnement de développement
ENV NODE_ENV development

WORKDIR /usr/src/app

# Copier les fichiers sources dans l'image.
COPY . .

# Changer la propriété du dossier 'uploads' pour l'utilisateur 'node' après la copie des fichiers
RUN chown -R node:node /usr/src/app/uploads

RUN chmod -R 755 /usr/src/app/images  

# Télécharger les dépendances comme une étape séparée pour tirer parti du cache de Docker
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci  # Enlever l'option --omit=dev pour inclure les dépendances de développement

# Exécuter l'application en tant qu'utilisateur non-root.
USER node

# Exposer le port sur lequel l'application écoute.
EXPOSE 3000

# Exécuter l'application.
CMD node api/server.js
