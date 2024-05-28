# Holidaze

## Description

This is a fictional accommodation booking site for users looking to book holidays and for venue managers to manage their properties. The application includes a customer-facing side where users can search, view, and book venues, as well as an admin-facing side where venue managers can add and manage venues.

## Installation

### Prerequisites

- Node.js (>= 10.x)
- npm or yarn

### Steps

1. Clone the repository:

```
git clone https://github.com/sindrebenjamin/holidaze.git
```

2. Install dependencies:

```
npm install
/* or */
yarn install
```

3. Set up the environment variables:
   Create a .env file in the root of the project and add the following:

```
/* .env file */
VITE_API_KEY=xxx-xxxx-xxx-xxxxx
```

4. Run the application:

```
npm run dev
/* or */
yarn dev
```

## Known Issues

- **DatePicker:** Touch devices require an extra tap to select dates. [Check out the issue to read more](https://github.com/onesine/react-tailwindcss-datepicker/issues/254)

- **Responsiveness:** The DatePicker might not adjust to screen resolution immediately when using DevTools but will adjust upon refresh.

## Built With

![VITE](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![REACT](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TYPESCRIPT](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TAILWIND](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
