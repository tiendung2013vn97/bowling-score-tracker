import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { gameTrackerHandler } from "services/DataHandler__GameTracker";
import { GameStep } from "services/DataHandler__GameTracker/constants";
import {
  FrameIndex,
  SingleGameData,
} from "services/DataHandler__GameTracker/types";

const frameIndexs = Array.from({ length: 10 }, (_, i) => i + 1) as FrameIndex[];
export function ScoreBoardAccordion() {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel1-content"
        id="scoreboard-header"
      >
        <Typography>Score board</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ScoreBoardTable />
      </AccordionDetails>
    </Accordion>
  );
}

export function ScoreBoardTable() {
  const { scores } = gameTrackerHandler.getGameData() as SingleGameData;
  const playerNames = useMemo(() => Object.keys(scores), []);
  const currentFrameIndex = gameTrackerHandler.getCurrentFrame();
  const currentStep = gameTrackerHandler.getCurrentStep();
  const winners = useMemo(() => gameTrackerHandler.getWinner(), []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Frame</TableCell>
            {playerNames.map((playerName) => (
              <TableCell key={playerName}>Player: {playerName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {frameIndexs.map((frameIndex) => {
            return (
              <TableRow
                key={frameIndex}
                sx={{
                  backgroundColor:
                    currentFrameIndex === frameIndex &&
                    currentStep === GameStep.InprogressGame
                      ? "lightblue"
                      : "inherit",
                }}
              >
                <TableCell>{frameIndex}</TableCell>
                {playerNames.map((playerName) => (
                  <TableCell
                    key={playerName}
                    sx={{
                      backgroundColor: winners.includes(playerName)
                        ? "lightblue"
                        : "inherit",
                    }}
                  >
                    {scores[playerName].frameScores[frameIndex]?.join(" ")}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}

          <TableRow key="totalScore">
            <TableCell>Total</TableCell>
            {playerNames.map((playerName) => (
              <TableCell
                key={playerName}
                sx={{
                  backgroundColor: winners.includes(playerName)
                    ? "lightblue"
                    : "inherit",
                }}
              >
                {scores[playerName].totalScore}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
