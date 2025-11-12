# TODO: Switch to PostgreSQL

- [x] Update lib/db.ts to use PostgreSQL configuration with execute and queryOne functions
- [x] Update app/api/todos/route.ts to import from '@/lib/db' instead of '@/lib/db-sqlite'
- [x] Update app/api/todos/[id]/route.ts to import from '@/lib/db'
- [x] Update DATABASE_SETUP.md with PostgreSQL setup instructions
