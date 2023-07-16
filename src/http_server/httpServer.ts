import { readFile } from 'fs';
import { resolve, dirname } from 'path';
import { createServer } from 'http';

export default function httpServer(port: number) {
  const server = createServer((req, res) => {
    const __dirname = resolve(dirname(''));
    const file_path = __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
    readFile(file_path, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(port, () => {
    console.log(`Static HTTP server is listeting on the ${port} port!`);
  });
}
