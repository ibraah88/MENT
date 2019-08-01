import app from "./app";
import { PORT } from './Config/config';

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
})