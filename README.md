# Careers Site & Recruiter Admin

A full-stack careers platform with applicant portal and recruiter admin dashboard.

## Features

- **Public Careers Page**: Light theme (#FCFAF7 background), Manrope font, job listings
- **Job Applications**: Google Auth for applicants, resume upload, detailed application form
- **Recruiter Admin**: Create/edit jobs, view candidates, AI-powered candidate insights
- **AI Insights**: Analyze candidate fit with job requirements (score + insights)

## Tech Stack

- Next.js 15 + TypeScript
- Tailwind CSS + shadcn/ui
- NextAuth.js (Google OAuth)
- Prisma + PostgreSQL
- Node.js backend APIs

## Setup

1. **Install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:
Create `.env` file with:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/careers"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-in-production
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
ADMIN_EMAILS=admin@example.com
```

3. **Set up Google OAuth**:
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project
- Enable Google+ API
- Create OAuth 2.0 credentials
- Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
- Copy Client ID and Secret to `.env`

4. **Set up database**:
```bash
npx prisma migrate dev --name init
```

5. **Run development server**:
```bash
npm run dev
```

6. **Access the app**:
- Public careers: http://localhost:3000
- Admin dashboard: http://localhost:3000/admin (requires admin email in ADMIN_EMAILS)

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # NextAuth
│   │   ├── applications/ # Application submissions
│   │   ├── jobs/         # Job CRUD
│   │   └── ai/insight/   # AI insights
│   ├── admin/            # Recruiter dashboard
│   ├── jobs/[id]/        # Job detail & apply
│   └── page.tsx          # Public careers page
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── ApplyForm.tsx     # Application form
│   ├── JobForm.tsx       # Job create/edit form
│   └── AIInsightButton.tsx
├── lib/
│   ├── auth.ts           # NextAuth config
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Utilities
├── prisma/
│   └── schema.prisma     # Database schema
└── types/
    └── next-auth.d.ts    # TypeScript types
```

## Database Models

- **User**: Applicants and recruiters (role-based)
- **Job**: Job postings with title, description, skills
- **Candidate**: Applications with resume, links, why-fit
- **AIInsight**: AI-generated candidate analysis (score + insights)

## AI Insights

The `/api/ai/insight` endpoint analyzes candidates:
- Input: Job description + candidate resume/application
- Output: `{ score: number, insights: string[] }`
- Currently uses heuristic matching (replace with LLM API in production)

## Customization

### Colors
Edit `app/globals.css`:
- Background: `--background: #FCFAF7`
- CTA buttons: `bg-black text-[#FFF4B3]`

### Font
Manrope is loaded via Google Fonts in `globals.css`

## Production Deployment

1. Set up PostgreSQL database
2. Update environment variables
3. Run migrations: `npx prisma migrate deploy`
4. Build: `npm run build`
5. Start: `npm start`

## License

MIT
