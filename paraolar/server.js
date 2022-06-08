const app = require("./src/app");

const PORT = 8099

// LOCALHOST
app.listen(8099, () => {
    console.log(`TOC TOC! Quem bate? É a porta! Que porta? A Porta ${PORT}`);
});