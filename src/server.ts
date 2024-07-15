import http from 'http';
import fs from 'fs';
import path from 'path';
import { memoize } from './utils/memoize';
import { fetchPokemonData } from './app';



const hostname = 'localhost';
const port = 4001;

const serveStaticFile = (filePath: string, res: http.ServerResponse) => {
  const ext = path.extname(filePath);
  const contentTypeMap: { [key: string]: string } = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
  };
  const contentType = contentTypeMap[ext] || 'text/plain';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
};

const server = http.createServer((req, res) => {
  const publicPath = path.resolve(__dirname, '..', 'public');
  if (req.url === '/' || req.url === '/index.html') {
    const filePath = path.join(publicPath, 'index.html');
    serveStaticFile(filePath, res);
  } else if (req.url?.startsWith('/public/') || req.url?.startsWith('/dist/')) {
    const filePath = path.join(__dirname, '..', req.url);
    serveStaticFile(filePath, res);
  } else if (req.url === '/pokemon' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        const { pageNo } = JSON.parse(body); 
        const limit = 10;
        const offset = pageNo * limit;

        const memoizedFetchPokemonData = memoize(fetchPokemonData);

        const startTime = Date.now();
        const data = await memoizedFetchPokemonData(offset, limit);
        const endTime = Date.now();

        const response = {
          from: offset + 1 ,
          to: offset + data.length,
          data,
          timeTaken: `${endTime - startTime} ms`,
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to fetch Pokémon data' }));
      }
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});