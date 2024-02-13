# Kit de Démarrage pour Module Snap

## Aperçu

Ce kit de démarrage est destiné aux développeurs souhaitant créer des modules pour Snap. Il offre une structure de base et les outils nécessaires pour simplifier le processus de développement, facilitant ainsi la création efficace de modules Snap.

## Caractéristiques

- Environnement TypeScript pré-configuré pour un développement robuste.

- Exemples et modèles pour démarrer rapidement le développement de votre module.

## Installation

```bash
git clone https://github.com/suleymanlaarabi/snap-module-starter.git
cd snap-module-starter
npm install
```

## Run

```bash
npm run start
```

## Utilisation

- dans le fichier src/app.ts

  afficher un toast "Hello Wordl !"

```typescript
export default function start() {
  shortToast("Hello World !");
}
```

---

- dans le ficher src/app.ts

  se connecter a plusieurs événements

```typescript
export default function start() {
  onSnapActivityLoadCalls.events.push(() => {
    shortToast("Snap Activiter launched");
  });
  onSnapApplicationLoadCalls.events.push(() => {
    shortToast("Snap app launched");
  });
  onSnapEnhancerLoadCalls.events.push(() => {
    shortToast("SnapEnhance launched");
  });
}
```
