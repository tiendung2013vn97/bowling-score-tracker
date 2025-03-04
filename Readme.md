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
     
![Screenshot 2025-03-04 185844](https://github.com/user-attachments/assets/b35941f9-f385-4910-abb8-05bfdf39d618)


2. **In-Progress Game Page**:

   - URL: `http://localhost:3000/game-tracker`
   - Input roll scores **frame by frame** by clicking the **START NEW FRAME** button.
   - Continue entering scores until **Frame 10** is complete.
![Screenshot 2025-03-04 185855](https://github.com/user-attachments/assets/a89fc115-e9ea-478e-9fdc-e44039e987bb)
![Screenshot 2025-03-04 190002](https://github.com/user-attachments/assets/578a8edf-f536-4415-8432-1a3477ce314d)

3. **Finish Game**:

   - Click on the **FINISH GAME** button to view the **winners and score-board**.
![Screenshot 2025-03-04 190047](https://github.com/user-attachments/assets/3b82ba7c-24c0-42dc-8fa7-d9a10434323b)
![Screenshot 2025-03-04 190205](https://github.com/user-attachments/assets/b98be9c3-eb33-4218-a7af-8b9502cceee7)

4. **New Game**:
   - Click the **NEW GAME** button to start a new game anytime.
   - Game state persists even if the user refreshes the page or opens a new tab.
![Screenshot 2025-03-04 190115](https://github.com/user-attachments/assets/a5537abd-adeb-41b7-89d6-346b13499e98)

## License

This project is licensed under the [MIT License](LICENSE).
