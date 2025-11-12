# Configuration de la base de données PostgreSQL

## Options de base de données gratuites

### 1. Supabase (Recommandé) 🐘

**Avantages :**
- 500MB gratuit
- Interface d'administration intégrée
- Intégration parfaite avec Vercel

**Étapes :**
1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Récupérez les informations de connexion depuis les paramètres du projet

### 2. Railway 🚄

**Avantages :**
- $5 de crédit gratuit par mois
- PostgreSQL classique

**Étapes :**
1. Créez un compte sur [railway.app](https://railway.app)
2. Créez un nouveau projet
3. Ajoutez un service PostgreSQL
4. Récupérez les informations de connexion

### 3. Neon 🟢

**Avantages :**
- 512MB gratuit
- Serverless PostgreSQL

**Étapes :**
1. Créez un compte sur [neon.tech](https://neon.tech)
2. Créez un nouveau projet
3. Récupérez les informations de connexion

## Configuration locale

### 1. Copiez le fichier d'environnement
```bash
cp .env.example .env.local
```

### 2. Remplissez les variables d'environnement

**Pour Supabase :**
```env
PGHOST=votre-host.supabase.co
PGUSER=postgres
PGPASSWORD=votre-password
PGDATABASE=postgres
PGPORT=5432
```

**Pour Railway :**
```env
PGHOST=containers-us-west-xx.railway.app
PGUSER=postgres
PGPASSWORD=votre-password
PGDATABASE=railway
PGPORT=5432
```

**Pour Neon :**
```env
PGHOST=ep-xxxxxxx-xxxxx.us-east-1.aws.neon.tech
PGUSER=votre-username
PGPASSWORD=votre-password
PGDATABASE=neondb
PGPORT=5432
```

### 3. Installez les dépendances
```bash
npm install
```

### 4. Testez la connexion
```bash
npm run dev
```

## Configuration sur Vercel

1. Allez dans les paramètres de votre projet Vercel
2. Section "Environment Variables"
3. Ajoutez les variables PostgreSQL :
   - `PGHOST`
   - `PGUSER`
   - `PGPASSWORD`
   - `PGDATABASE`
   - `PGPORT` (optionnel, défaut 5432)

4. Redéployez votre application

## Structure de la table

La table `todos` sera créée automatiquement avec cette structure :

```sql
CREATE TABLE todos (
  id VARCHAR(36) PRIMARY KEY,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Endpoints API disponibles

- `GET /api/todos` - Récupérer toutes les todos
- `POST /api/todos` - Créer une nouvelle todo
- `PUT /api/todos/[id]` - Mettre à jour une todo
- `DELETE /api/todos/[id]` - Supprimer une todo

## Troubleshooting

### Erreur de connexion SSL
Si vous avez une erreur SSL, vérifiez que votre provider supporte SSL.

### Timeout de connexion
Vérifiez que les informations de connexion sont correctes.

### Table non trouvée
La table est créée automatiquement au premier accès. Vérifiez les logs de l'API.