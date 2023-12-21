import { yarg } from './config/plugins/args.plugin'

// console.log(yarg.b)
import { ServerApp } from './presentation/server-app'

// IIFE to run the app
;(async () => {
  await main()
})()

async function main() {
  const { b: base, l: limit, s: showTable, n: fileName, d: fileDestination } = yarg

  ServerApp.run({ base, limit, showTable, fileName, fileDestination })
}
