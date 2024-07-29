const express = require('express');
const https = require('https');

const app = express();
const PORT = 3000;

   const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIyMjQ1MTA1LCJpYXQiOjE3MjIyNDQ4MDUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjM2Yzk1YTVjLWVkMTItNDJkNC05Y2Q4LTNiNTcyYTc3YWI5NiIsInN1YiI6Im1hYXphZjEwQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6IkFtaXR5IFVuaXZlcnNpdHkgTm9pZGEiLCJjbGllbnRJRCI6IjM2Yzk1YTVjLWVkMTItNDJkNC05Y2Q4LTNiNTcyYTc3YWI5NiIsImNsaWVudFNlY3JldCI6InluTUplUklYZERYWGhxYkciLCJvd25lck5hbWUiOiJNYWF6IEFobWFkIEZhcm9vcXVpIiwib3duZXJFbWFpbCI6Im1hYXphZjEwQGdtYWlsLmNvbSIsInJvbGxObyI6IkEyMzA1MjIxMDA4In0.qleGe6sN9pYkWftRN-UlnjdI5KPQQV9dMGaMeOcSbj4";


let numbersStore = [];
const windsize = 10;

app.get('/test/:numberid', (req, res) => {
    const { numberid } = req.params;
    const ids = ['p', 'f', 'e', 'r'];

    if (!ids.includes(numberid)) {
        return res.status(400).json({ error: 'this  number ID is invalid' });
    }

    const apiUrl = `http://20.244.56.144/test/${numberid}`; 

    const options = {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    };

    https.get(apiUrl, options, (response) => {
       

        response.on('end', () => {
            const fetchedNumber = JSON.parse(data).number;

            if (!numbersStore.includes(fetchedNumber)) {
                if (numbersStore.length >= windsize) {
                    numbersStore.shift();
                }
                numbersStore.push(fetchedNumber);
            }

            const total = numbersStore.reduce((acc, num) => acc + num, 0);
            const average = numbersStore.length > 0 ? total / numbersStore.length : 0;

            res.json({
                storedNumbers: numbersStore,
                average: average
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`My Server is running on this port ${PORT}`);
});