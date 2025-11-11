# Todo App - Next.js

Une application Todo moderne et responsive construite avec Next.js, TypeScript et Tailwind CSS.

## Fonctionnalités

- ✅ Ajouter, modifier et supprimer des tâches
- ✅ Marquer les tâches comme terminées
- ✅ Filtrer les tâches (Toutes, Actives, Terminées)
- ✅ Statistiques de progression
- ✅ Persistance des données dans localStorage
- ✅ Interface responsive et moderne
- ✅ Horodatage des tâches (création et modification)

## Technologies utilisées

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **UUID** - Génération d'identifiants uniques

## Installation et démarrage

1. Installer les dépendances :
```bash
npm install
```

2. Démarrer le serveur de développement :
```bash
npm run dev
```

3. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur

## Scripts disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run start` - Démarre le serveur de production
- `npm run lint` - Lance ESLint

## Structure du projet

```
todo-app/
├── app/
│   ├── components/
│   │   ├── TodoInput.tsx     # Composant d'ajout de tâche
│   │   ├── TodoList.tsx      # Liste des tâches
│   │   ├── TodoItem.tsx      # Élément de tâche individuel
│   │   ├── TodoFilters.tsx   # Filtres des tâches
│   │   └── TodoStats.tsx     # Statistiques et barre de progression
│   ├── globals.css           # Styles globaux
│   ├── layout.tsx            # Layout principal
│   ├── page.tsx              # Page d'accueil
│   └── types.ts              # Types TypeScript
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## Fonctionnalités détaillées

### Gestion des tâches
- Ajout de nouvelles tâches avec validation
- Modification en place (double-clic ou bouton d'édition)
- Suppression avec confirmation visuelle
- Marquage comme terminé/non terminé

### Filtrage
- **Toutes** : Affiche toutes les tâches
- **Actives** : Affiche uniquement les tâches non terminées
- **Terminées** : Affiche uniquement les tâches terminées

### Persistance
Les tâches sont automatiquement sauvegardées dans le localStorage du navigateur et restaurées au rechargement de la page.

### Interface utilisateur
- Design moderne avec Tailwind CSS
- Responsive (mobile-first)
- Animations et transitions fluides
- Indicateurs visuels pour l'état des tâches

## Développement

L'application utilise les hooks React modernes et suit les bonnes pratiques :
- Composants fonctionnels avec hooks
- TypeScript pour la sécurité des types
- État local géré avec useState
- Effets de bord gérés avec useEffect
- Code modulaire et réutilisable