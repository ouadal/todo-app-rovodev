# Configuration de la base de données MySQL

## Options de base de données gratuites

### 1. PlanetScale (Recommandé) 🚀

**Avantages :**
- 10GB gratuit
- Intégration parfaite avec Vercel
- Pas besoin de gérer l'infrastructure

**Étapes :**
1. Créez un compte sur [planetscale.com](https://planetscale.com)
2. Créez une nouvelle base de données
3. Créez une branche "main"
4. Générez un mot de passe pour la connexion
5. Copiez les informations de connexion

### 2. Railway 🚄

**Avantages :**
- $5 de crédit gratuit par mois
- MySQL classique

**Étapes :**
1. Créez un compte sur [railway.app](https://railway.app)
2. Créez un nouveau projet
3. Ajoutez un service MySQL
4. Récupérez les informations de connexion

### 3. Supabase (PostgreSQL) 🐘

**Avantages :**
- 500MB gratuit
- Interface d'administration intégrée

**Étapes :**
1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Récupérez les informations de connexion

## Configuration locale

### 1. Copiez le fichier d'environnement
```bash
cp .env.example .env.local
```

### 2. Remplissez les variables d'environnement

**Pour PlanetScale :**
```env
DATABASE_HOST=aws.connect.psdb.cloud
DATABASE_USERNAME=votre-username
DATABASE_PASSWORD=pscale_pw_xxxxxxxxxxxx
DATABASE_NAME=votre-database-name
```

**Pour Railway :**
```env
DATABASE_HOST=containers-us-west-xx.railway.app
DATABASE_USERNAME=root
DATABASE_PASSWORD=votre-password
DATABASE_NAME=railway
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
3. Ajoutez les 4 variables :
   - `DATABASE_HOST`
   - `DATABASE_USERNAME`
   - `DATABASE_PASSWORD`
   - `DATABASE_NAME`

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