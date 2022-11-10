import http from 'http';
import url from 'url';

const server = http.createServer(function (request, response) {
    const queryObject = url.parse(request.url as string, true).query;

    const suma = Number(queryObject.a) + Number(queryObject.b);
    const resta = Number(queryObject.a) - Number(queryObject.b);
    const mult = Number(queryObject.a) * Number(queryObject.b);
    const divis = Number(queryObject.a) / Number(queryObject.b);

    response.writeHead(200, { 'Content-Type': 'text/html' });
    if (url.parse(request.url as string, true).pathname !== '/calculator.js') {
        return response.end(
            `<p>Error 404. El nombre de la ruta tiene que ser /calculator.js</p>`
        );
    }
    if (!queryObject.a || !queryObject.b) {
        response.end(`<p>No has introducido algun parametro</p>`);
    } else if (isNaN(Number(queryObject.a)) || isNaN(Number(queryObject.b))) {
        response.end(`<p>Alguno de los parametros no es un numero</p>`);
    } else {
        response.write(`<p>${queryObject.a}+${queryObject.b}=${suma}</p>`);
        response.write(`<p>${queryObject.a}-${queryObject.b}=${resta}</p>`);
        response.write(`<p>${queryObject.a}x${queryObject.b}=${mult}</p>`);
        response.write(`<p>${queryObject.a}/${queryObject.b}=${divis}</p>`);
    }
});
server.listen(4500);
