# Interactive Decision Tree - Test Technique React/Next.js

> 🎯 **Application de visualisation d'arbre de tâches**

## 📸 Aperçu

Une interface moderne qui transforme des données CSV en arbre interactif pour organiser Features, User Stories et Tasks avec du drag & drop et de l'édition temps réel.

## 🚀 Démarrage Rapide

```bash
# Installation
npm install
# ou
pnpm install

# Lancement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## ✨ Fonctionnalités Principales

### 🌳 Gestion d'Arbre
- **Visualisation hiérarchique** : Features → User Stories → Tasks
- **Drag & Drop** : Réorganisez vos éléments simplement
- **Expand/Collapse** : Navigation fluide dans l'arbre
- **Recherche instantanée** : Trouvez rapidement vos éléments

### ✏️ Édition Complète
- **Ajout/Modification/Suppression** de nœuds
- **Statuts visuels** : To Do, In Progress, Done, etc.
- **Mode sombre/clair** selon vos préférences

## 🛠️ Technologies Utilisées

- **Next.js 15** - Framework React moderne
- **TypeScript** - Pour un code plus robuste
- **Tailwind CSS** - Styling rapide et cohérent
- **Zustand** - Gestion d'état simple et efficace
- **shadcn/ui** - Composants UI de qualité

## 📁 Structure du Projet

```
src/
├── app/                 # Pages Next.js
├── components/          # Composants réutilisables
├── domain/             # Logique métier
├── stores/             # État global
└── lib/                # Utilitaires
```

## Ce qui pourrait être amélioré

- Virtualisation pour les gros datasets avec react-window ou @tanstack/react-virtual
- Debouncing pour la recherche instantanée
- Implémentation d'un backend
- Sauvegarde côté SSR et utilisation de `useOptimistic`
- Meilleure clean archi
- Désigner un nouveau parent pour une task / feature
- Filtrage par Type / Status de noeud