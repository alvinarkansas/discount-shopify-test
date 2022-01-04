# discount-shopify-test

Shopify get discount endpoint example in NodeJS

## Steps to run on local

1. Clone this repository
2. Install dependencies
```javascript
npm install
```
3. Create a `.env` file and specify the value according to keys in `.env.template`
```env
API_KEY=YOUR_SHOPIFY_API_KEY
PASSWORD=YOUR_SHOPIFY_PASSWORD
SHOP=YOUR_SHOPIFY_STORE_NAME_WITHOUT_HTTPS
PORT=YOUR_PORT
```
4. Run project on your machine
```bash
npm run dev
```
5. Go to `http://localhost:YOUR_PORT/discount_codes` or to other available routes on your browser or HTTP client such as Postman
