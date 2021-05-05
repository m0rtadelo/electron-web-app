const express = require('express');
const { handle } = require('./handler');
const app = express();
app.use(express.json());

app.post('/api', async (req, res) => {
    const result = await handlePost(req.body) || {};
    return res.status(result.status || 500).send(result.data);
})

app.listen(4500, () => {
    console.log('listen at port 4500');
})