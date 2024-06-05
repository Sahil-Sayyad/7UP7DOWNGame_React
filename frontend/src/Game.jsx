import { useState } from "react";
import { Grid, Button, Typography, TextField, Paper } from "@mui/material/"
import axios from "axios";

const Game = () => {
    const [points, setPoints] = useState(5000);
    const [betAmount, setBetAmount] = useState(100);
    const [betOption, setBetOption] = useState("7");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleBetAmountChange = (event) => {
        setBetAmount(event.target.value);
    };

    const handleBetOptionChange = (event) => {
        setBetOption(event.target.value);
    }

    const handleRollDice = async () => {
        setLoading(true);
        const response = await axios.post('/api/roll-dice', { betAmount, betOption });
        setResult(response.data);
        setPoints(response.data.points);
        setLoading(false);
    };


    return (
        <Paper
            sx={{
                p: 4,
                marginTop: 29,
                maxWidth: 500,
                borderRadius: 3,
                flexGrow: 1,
                justifyItems: "center",
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#2121' : '#fff',

            }}
        >

            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} >
                    <Typography variant="h4" align="center" fontSize="40px" fontWeight="bold" color="ThreeDFace">7 UP 7 DOWN Game</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" align="center" color="GrayText">Points : {points}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Bet Amount"
                        value={betAmount}
                        onChange={handleBetAmountChange}
                        type="number"
                        inputProps={{ min: 100, max: 500, step: 100 }}
                        fullWidth
                        color="secondary"
                        focused
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Bet Option"
                        value={betOption}
                        onChange={handleBetOptionChange}
                        select
                        SelectProps={{ native: true }}
                        fullWidth
                        color="secondary"
                        focused
                    >
                        <option value="">Select an option</option>
                        <option value="7 up">7 up</option>
                        <option value="7 down">7 Down</option>
                        <option value="7">Lucky 7</option>

                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" onClick={handleRollDice} fullWidth  >
                        Roll Dice
                    </Button>

                </Grid>
                {loading ? (
                    <Grid item xs={12}>
                        <Typography variant="h6">Loading...</Typography>
                    </Grid>
                ) : (
                    result && (
                        <Grid item xs={12} border="solid" borderRadius={2} borderColor="#ce93d8" margin={4}>
                            <Typography variant="h6" color="primary" fontWeight="bold" fontFamily="monospace">Die 1 : {result.die1}</Typography>
                            <Typography variant="h6" color="primary" fontWeight="bold" fontFamily="monospace">Die 2 : {result.die2}</Typography>
                            <Typography variant="h6" color="primary" fontWeight="bold" fontFamily="monospace">Total : {result.total}</Typography>
                            <Typography variant="h6" color="primary" fontWeight="bold" fontFamily="monospace">Result: {result.win ? 'You win' : 'You Lost'}</Typography>
                            <Typography variant="h6" color="primary" fontWeight="bold" fontFamily="monospace">Points Won/Lost: {result.pointsWon}</Typography>
                        </Grid>

                    )
                )}
            </Grid>
        </Paper>
    )
}

export default Game;