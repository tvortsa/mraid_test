// тестовый файл, не используется в приложении (используется: src\server\main.js)
const server = Deno.listen({
  port: 3002,
});
function server_start() {
  console.log(`HTTP вебсервер запущен, доступ на: http://localhost:3002/`);
  for await (const conn of server) {
    console.log("произошло соединение с сервером");
    console.dir(conn);
    serveHttp(conn);
  }
  async function serveHttp(conn) {
    const httpConn = Deno.serveHttp(conn);
    for await (const requestEvent of httpConn) {
      const body = `Your user-agent is:\n\n${
        requestEvent.request.headers.get("user-agent") ?? "Unknown"
      }`;
      requestEvent.respondWith(
        new Response(body, {
          status: 200,
        }),
      );
    }
  }
}
console.log("deno main start");
server_start();
