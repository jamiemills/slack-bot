import dotenv from 'dotenv';

dotenv.config();

export interface Config {
  slackBotToken: string;
  defaultChannel?: string;
}

export function getConfig(): Config {
  const slackBotToken = process.env.SLACK_BOT_TOKEN;
  
  if (!slackBotToken) {
    throw new Error('SLACK_BOT_TOKEN environment variable is required');
  }

  return {
    slackBotToken,
    defaultChannel: process.env.DEFAULT_SLACK_CHANNEL
  };
}