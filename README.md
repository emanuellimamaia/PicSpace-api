# PicSpace - Image Management API

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

## Description

PicSpace is a NestJS-based API for image management, offering features for uploading, analyzing, and automatically categorizing images using AI.

## Architecture

The project follows Clean Architecture principles with the following layers:

### Core

- **Domain**: Business entities and rules
  - `Picture`: Main entity for images
  - `Tag`: Entity for categorization
  - `User`: Entity for users

### Infrastructure

- **Repositories**: Persistence implementations
  - `PictureRepo`: Image management in PostgreSQL
  - `PrismaService`: ORM configuration

### Application

- **Use Cases**: Application use cases
  - Image upload
  - Image analysis with Clarifai
  - Tag management
  - Authentication and authorization

### External Services

- **AWS S3**: Image storage
- **Clarifai**: Image analysis and categorization
- **PostgreSQL**: Main database

## Setup

### Prerequisites

- Node.js 20+
- Docker and Docker Compose
- AWS account with S3 access
- Clarifai API key

### Environment Variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/image_gallery"

# AWS
AWS_S3_REGION="your-region"
AWS_S3_BUCKET_NAME="your-bucket"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"

# Clarifai
CLARIFAI_API_KEY="your-api-key"

# JWT
JWT_SECRET="your-secret"
```

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma files
npx prisma generate

# Run migrations
npx prisma migrate dev
```

### Running the Project

```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

### Docker

```bash
# Build image
docker build -t pic-space .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="your_database_url" \
  -e AWS_S3_BUCKET_NAME="your_bucket" \
  -e AWS_S3_REGION="your_region" \
  -e CLARIFAI_API_KEY="your_key" \
  pic-space
```

## API Endpoints

### API Documentation

You can use Swagger to view and interact with the API at `/api`. Swagger provides a user-friendly interface to explore available endpoints, test different requests, and see API responses in real-time. To access the Swagger documentation, start the project and navigate to `http://localhost:8080/api` in your browser.

### Authentication

- `POST /auth/login`: User login

### Images

- `POST /upload-picture/picture`: Upload image
- `GET /pictures`: List images (with optional tag filter)
- `DELETE /pictures/:id`: Delete image

## Future Improvements

### Short Term

- [ ] Sidebar
- [ ] Edit Tags
- [ ] Edit Perfil
- [ ] Recovey password
- [ ] Add e2e tests

### Medium Term

- [ ] Group photos
- [ ] Add albums
- [ ] Add support for multiple storage providers
- [ ] Add video support
- [ ] Implement video analysis

### Long Term

- [ ] Add real-time collaboration support
- [ ] Implement recommendation system
- [ ] Add multi-language support

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
