import { Command } from 'commander'

export const program = new Command()

program
    .option('-m, --mode <mode>', 'mode', 'production')
    .parse()

