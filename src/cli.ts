#!/usr/bin/env node

import { Command } from 'commander';
import { getConfig } from './config';
import { SlackClient } from './slack-client';

const program = new Command();

program
  .name('slack-send')
  .description('Send messages to Slack channels from Claude Code')
  .version('1.0.0');

program
  .command('message')
  .description('Send a message to a Slack channel')
  .requiredOption('-c, --channel <channel>', 'Slack channel (e.g., #general or @username)')
  .requiredOption('-m, --message <message>', 'Message text to send')
  .action(async (options) => {
    try {
      const config = getConfig();
      const slackClient = new SlackClient(config);
      
      await slackClient.sendMessage(options.channel, options.message);
      console.log('✅ Message sent successfully');
    } catch (error) {
      console.error('❌ Error:', error instanceof Error ? error.message : 'Unknown error');
      process.exit(1);
    }
  });

program
  .command('quick')
  .description('Send a quick message to the default channel')
  .requiredOption('-m, --message <message>', 'Message text to send')
  .action(async (options) => {
    try {
      const config = getConfig();
      
      if (!config.defaultChannel) {
        console.error('❌ No default channel configured. Set DEFAULT_SLACK_CHANNEL environment variable or use the "message" command with --channel flag.');
        process.exit(1);
      }
      
      const slackClient = new SlackClient(config);
      await slackClient.sendMessage(config.defaultChannel, options.message);
      console.log(`✅ Message sent to ${config.defaultChannel}`);
    } catch (error) {
      console.error('❌ Error:', error instanceof Error ? error.message : 'Unknown error');
      process.exit(1);
    }
  });

program
  .command('status')
  .description('Send a Claude Code status update')
  .requiredOption('-c, --channel <channel>', 'Slack channel')
  .requiredOption('-s, --status <status>', 'Status message')
  .option('-p, --progress <progress>', 'Progress percentage (0-100)')
  .action(async (options) => {
    try {
      const config = getConfig();
      const slackClient = new SlackClient(config);
      
      let message = `🤖 **Claude Code Update**\n${options.status}`;
      
      if (options.progress) {
        const progressNum = parseInt(options.progress);
        if (progressNum >= 0 && progressNum <= 100) {
          const progressBar = '█'.repeat(Math.floor(progressNum / 10)) + '░'.repeat(10 - Math.floor(progressNum / 10));
          message += `\n\nProgress: ${progressBar} ${progressNum}%`;
        }
      }
      
      await slackClient.sendMessage(options.channel, message);
      console.log('✅ Status update sent successfully');
    } catch (error) {
      console.error('❌ Error:', error instanceof Error ? error.message : 'Unknown error');
      process.exit(1);
    }
  });

program.parse();