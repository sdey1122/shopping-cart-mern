# Shopping Cart Frontend

React + TypeScript + Vite + Tailwind CSS + MUI CssBaseline + React Hook Form + Yup.

## Setup

```bash
npm install
npm run dev
```

Frontend: `http://localhost:5173`

The `.env` file points to the backend at `http://localhost:4899/api`.

## Assignment coverage

- `useReducer`: `ADD_ITEM`, `REMOVE_ITEM`, `INCREASE_QTY`, `DECREASE_QTY`
- `useContext`: cart state shared by `ProductCard`/`ProductList`, `Cart`, and `Navbar`
- Add/remove products, increase/decrease quantity
- Navbar cart count
- Cart total price
- Yup validation for product fields and required image (maximum 5 MB)
