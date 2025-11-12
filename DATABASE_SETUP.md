# Configuration de la base de données SQLite

## Configuration locale

SQLite est utilisé pour le développement local. La base de données est stockée dans le fichier `todo.db` à la racine du projet.

### Installation des dépendances
```bash
npm install
```

### Démarrage de l'application
```bash
npm run dev
```

La base de données SQLite sera créée automatiquement avec la table `todos` lors du premier accès.

## Structure de la table

La table `todos` est créée automatiquement avec cette structure :

```sql
CREATE TABLE IF NOT EXISTS todos (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Endpoints API disponibles

- `GET /api/todos` - Récupérer toutes les todos
- `POST /api/todos` - Créer une nouvelle todo
- `PUT /api/todos/[id]` - Mettre à jour une todo
- `DELETE /api/todos/[id]` - Supprimer une todo

## Avantages de SQLite pour le développement

- Pas besoin de serveur de base de données séparé
- Base de données fichier simple et portable
- Configuration minimale
- Performance excellente pour les applications locales
- Pas de dépendances externes pour le développement

## Fichiers de base de données

- `todo.db` - Fichier principal de la base de données
- `todo.db-wal` - Write-Ahead Logging file (pour les performances)
- `todo.db-shm` - Shared memory file (pour les connexions multiples)

Ces fichiers sont automatiquement gérés par SQLite et ne nécessitent pas d'attention particulière.
