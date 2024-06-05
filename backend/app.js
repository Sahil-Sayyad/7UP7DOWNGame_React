import express from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

let points = 5000;
// here rolldice function generates random number.
const rollDice = () => {
  return Math.floor(Math.random() * 6) + 1;
};

// here calculateResult function calculates result based on number generated.
const calculateResult = (betAmount, betType) => {
  const die1 = rollDice();
  const die2 = rollDice();

  const total = die1 + die2;

  let result = { die1, die2, total, win: false, pointsWon: 0 };

  if (
    (betType === "7 up" && total > 7) ||
    (betType === "7 down" && total < 7)
  ) {
    result.win = true;
    result.pointsWon = betAmount * 2;
  } else if (betType === "7" && total === 7) {
    result.win = true;
    result.pointsWon = betAmount * 5;
  } else {
    result.pointsWon = -betAmount;
  }

  points += result.pointsWon;
  result.points = points;

  return result;
};

// API call for showing result on UI.
app.post("/api/roll-dice", async (req, res) => {
  try {
    let { betAmount, betOption } = req.body;

    betAmount = parseInt(betAmount);

    const result = calculateResult(betAmount, betOption);

    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

app.listen(port, (err) => {
  if (err) console.error(err);
  console.log(`Server running on ${port}`);
});
