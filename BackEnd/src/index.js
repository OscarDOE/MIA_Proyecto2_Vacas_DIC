const app = require('./app');
require('dotenv').config(); //Recibe las variables de entorno
//Settings
const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
});