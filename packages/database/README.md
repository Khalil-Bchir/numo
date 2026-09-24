# @numo/database

Prisma-based database package providing type-safe database access, migrations, and seeding for the monorepo.

## 🎯 Overview

This package contains:

- **Prisma Schema** - Database schema definition
- **Prisma Client** - Type-safe database client
- **Migrations** - Version-controlled database changes
- **Seed Scripts** - Environment-specific seed data
- **Database Utilities** - Helper functions and types

## 📁 Structure

```
.
├── prisma/
│   ├── schema.prisma      # Prisma schema definition
│   └── migrations/        # Migration history
│       └── YYYYMMDDHHMMSS_migration_name/
│           └── migration.sql
│
├── src/
│   ├── client.ts          # Prisma client export
│   ├── index.ts           # Package exports
│   └── seed/              # Seed scripts
│       ├── index.ts       # Seed entry point
│       ├── development.ts # Dev seed data
│       ├── staging.ts     # Staging seed data
│       └── production.ts  # Production seed data
│
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Installation

This package is automatically installed as a workspace dependency. No manual installation needed.

### Prerequisites

- PostgreSQL database (via Supabase or self-hosted)
- Environment variables configured (DATABASE_URL, DIRECT_URL)

## 📝 Schema Definition

The Prisma schema (`prisma/schema.prisma`) defines:

- **Data Source** - PostgreSQL connection
- **Generators** - Prisma Client generator
- **Models** - Database tables and relationships
- **Enums** - Database enums

### Current Models

- **User** - User accounts with roles (USER, ADMIN, DEMO)

## 🔧 Usage

### Generating Prisma Client

```bash
# Generate Prisma client (runs automatically on install)
pnpm --filter @numo/database db:generate

# Or from root
pnpm --filter @numo/database db:generate
```

This generates the Prisma Client in `node_modules/.prisma/client/` and TypeScript types.

### Using Prisma Client

```typescript
import { prisma } from '@numo/database'

// In your code
const user = await prisma.user.findUnique({
  where: { id: 'user-id' },
})
```

### TypeScript Types

Prisma generates TypeScript types automatically:

```typescript
import type { User, UserRole } from '@numo/database'

const user: User = {
  id: '...',
  email: '...',
  role: 'USER',
}
```

## 🗄️ Migrations

### Creating a Migration

```bash
# Create and apply migration
pnpm --filter @numo/database db:migrate:dev

# This will:
# 1. Detect schema changes
# 2. Create migration file
# 3. Apply migration to database
# 4. Regenerate Prisma Client
```

### Migration Workflow

1. **Modify Schema** - Edit `prisma/schema.prisma`
2. **Create Migration** - Run `db:migrate:dev`
3. **Review Migration** - Check generated SQL in `prisma/migrations/`
4. **Apply Migration** - Migration is applied automatically

### Applying Migrations (Production)

```bash
# Apply pending migrations (production-safe)
pnpm --filter @numo/database db:migrate:prod

# Or for staging
pnpm --filter @numo/database db:migrate:staging
```

### Migration Status

```bash
# Check migration status
pnpm --filter @numo/database db:status:dev
```

### Resetting Database

```bash
# ⚠️ WARNING: This will drop all data
pnpm --filter @numo/database db:reset:dev

# Or for staging
pnpm --filter @numo/database db:reset:staging
```

## 🌱 Seeding

### Running Seeds

```bash
# Seed development database
pnpm --filter @numo/database db:seed:dev

# Seed staging database
pnpm --filter @numo/database db:seed:staging

# Seed production database
pnpm --filter @numo/database db:seed:prod
```

### Seed Scripts

Seed scripts are environment-specific:

- **development.ts** - Development seed data (may include test users)
- **staging.ts** - Staging seed data (realistic test data)
- **production.ts** - Production seed data (minimal, safe data)

### Customizing Seeds

Edit the seed files in `src/seed/`:

```typescript
// src/seed/development.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seed() {
  // Your seed logic
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      role: 'ADMIN',
    },
  })
}
```

## 🛠️ Available Scripts

### Database Operations

```bash
# Generate Prisma Client
pnpm --filter @numo/database db:generate

# Create and apply migration
pnpm --filter @numo/database db:migrate:dev

# Apply migrations (production)
pnpm --filter @numo/database db:migrate:prod

# Push schema changes (dev only, no migration)
pnpm --filter @numo/database db:push

# Pull schema from database
pnpm --filter @numo/database db:pull

# Seed database
pnpm --filter @numo/database db:seed:dev

# Reset database (⚠️ drops all data)
pnpm --filter @numo/database db:reset:dev

# Open Prisma Studio (database GUI)
pnpm --filter @numo/database db:studio
```

### Build Scripts

```bash
# Build TypeScript
pnpm --filter @numo/database build

# Watch mode
pnpm --filter @numo/database dev
```

## 🔍 Prisma Studio

Visual database browser:

```bash
pnpm --filter @numo/database db:studio
```

Opens Prisma Studio at `http://localhost:5555` - a GUI for browsing and editing your database.

## 📊 Database Connection

### Connection Strings

The package uses two connection strings:

- **DATABASE_URL** - Pooled connection (via PgBouncer, port 6543) - Used for queries
- **DIRECT_URL** - Direct connection (port 5432) - Used for migrations

### Supabase Setup

For Supabase:

1. Get connection strings from Supabase dashboard
2. Use **Connection Pooling** URL for `DATABASE_URL`
3. Use **Direct Connection** URL for `DIRECT_URL`

### Environment Variables

Set in `.env.${NODE_ENV}`:

```env
DATABASE_URL=postgresql://user:password@host:6543/db?pgbouncer=true
DIRECT_URL=postgresql://user:password@host:5432/db
```

## 🔐 Security Best Practices

1. **Never commit** `.env` files with real credentials
2. **Use connection pooling** in production (DATABASE_URL)
3. **Use direct connection** only for migrations (DIRECT_URL)
4. **Rotate credentials** regularly
5. **Limit database access** to necessary IPs

## 🐛 Troubleshooting

### Migration Conflicts

If migrations conflict:

```bash
# Resolve migration
pnpm --filter @numo/database db:resolve:applied:dev <migration_name>
```

### Client Generation Issues

```bash
# Clean and regenerate
rm -rf node_modules/.prisma
pnpm --filter @numo/database db:generate
```

### Connection Issues

- Verify DATABASE_URL and DIRECT_URL are correct
- Check database is accessible
- Verify credentials are valid
- Check firewall rules

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Migrate Guide](https://www.prisma.io/docs/guides/migrate)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)

## 🤝 Contributing

When modifying the schema:

1. Make changes to `prisma/schema.prisma`
2. Create migration: `db:migrate:dev`
3. Test migration locally
4. Update seed scripts if needed
5. Document schema changes

## 📄 License

MIT
