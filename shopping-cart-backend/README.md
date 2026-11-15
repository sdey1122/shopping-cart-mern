# Shopping Cart Backend

Express + TypeScript + MongoDB + Joi + Multer + Cloudinary.

## Setup

1. Install Node.js (LTS) and MongoDB Community Server, or use a MongoDB Atlas URI.
2. Open this folder in a terminal:
   ```bash
   npm install
   ```
3. Update `.env`:
   - `MONGO_URI`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
4. Start:
   ```bash
   npm run dev
   ```

Backend: `http://localhost:4899`

## Endpoints

- `GET /api/health`
- `GET /api/products`
- `POST /api/products` — `multipart/form-data`

POST fields: `name`, `description`, `price`, `category`, `stock`, `image`.
The image field is required and limited to 5 MB. Joi validates the text/number fields; Multer validates the image MIME type and size.

## Notes

- Cloudinary credentials are placeholders in `.env`; replace them with your own.
- Product images are uploaded to Cloudinary and the resulting URL is stored in MongoDB.
- This is an assignment/demo API. Add authentication and authorization before exposing product creation publicly.
