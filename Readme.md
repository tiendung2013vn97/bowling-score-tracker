# Bowling Score Tracker

## Getting Started

### Start Project Locally

To start the project locally, run the following commands:

```bash
yarn && yarn start
```

### Build Docker Image

To build the project into a Docker image, run the following command:

```bash
docker build -t bowling-score-tracker .
```

## Project Technologies

- **Languages & Libraries**: TypeScript, React, Material UI, Jest (Tests not yet implemented due to time constraints)
- **Storage**: React Context + LocalStorage (Caches user data to retain state after page refresh)
- **Optimization**: Tree Shaking, Lazy-Loading
- **Style**: CSS-in-JS
- **Deploy**: Docker + Nginx

## Web Flow

1. **Home Page**:

   - Access the home page at `http://localhost:3000/`.
   - Add up to **5 players**.
   - After adding players, the app will navigate to the **in-progress game page**.

2. **In-Progress Game Page**:

   - URL: `http://localhost:3000/game-tracker`
   - Input roll scores **frame by frame** by clicking the **START NEW FRAME** button.
   - Continue entering scores until **Frame 10** is complete.

3. **Finish Game**:

   - Click on the **FINISH GAME** button to view the **winners and score-board**.

4. **New Game**:
   - Click the **NEW GAME** button to start a new game anytime.
   - Game state persists even if the user refreshes the page or opens a new tab.

## License

This project is licensed under the [MIT License](LICENSE).
