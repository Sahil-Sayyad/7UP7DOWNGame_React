import express from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 8000;


app.use(cors());
app.use(express.json());

let points = 5000;

const rollDice = () => {
    return Math.floor(Math.random() * 6) + 1;
};

const calculateResult = (betAmount, betType) => {
    const die1 = rollDice();
    const die2 = rollDice();
    const total = die1 + die2;

    let result = { die1, die2, total, win: false, pointsWon: 0 };

    if ((betType === '7 up' && total > 7) || (betType === '7 down' && total < 7)) {
        result.win = true;
        result.pointsWon = betAmount * 2;
    } else if (betType === '7' && total === 7) {
        result.win = true;
        result.pointsWon = betAmount * 5;
    } else {
        result.pointsWon = -betAmount;
    }

    points += result.pointsWon;
    result.points = points;

    return result;
};

app.post("/api/roll-dice", async (req, res) => {
  try {
    let { betAmount, betOption } = req.body;

    betAmount = parseInt(betAmount);

    // if (!betAmount || !betOption) {
    //   return res.status(400).json({ error: "Invalid request" });
    // }
    // const result =
    //   Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;

    // let pointsDelta = 0;

    // if (result < 7 && betOption === "7 down") {
    //   pointsDelta = betAmount * 2;
    // } else if (result > 7 && betOption === "7 up") {
    //   pointsDelta = betAmount * 2;
    // } else if (result === 7 && betOption === "7") {
    //   pointsDelta = betAmount * 5;
    // }
    // points += pointsDelta;
    const result = calculateResult(betAmount, betOption);

    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

app.get("/api/points", async (req, res) => {
  //   const token = req.headers.authorization.split(" ")[1];
  //   jwt.verify(token, "secret", (err, decoded) => {
  try {
    return res.json({ points });
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  //   });
});

app.listen(port, (err) => {
  if (err) console.error(err);
  console.log(`Server running on ${port}`);
});
