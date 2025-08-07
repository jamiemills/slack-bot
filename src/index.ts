export { SlackClient } from './slack-client';
export { getConfig, Config } from './config';

export interface MessageOptions {
  channel: string;
  message: string;
}

export interface StatusOptions extends MessageOptions {
  progress?: number;
}

export async function sendMessage(options: MessageOptions): Promise<void> {
  const config = await import('./config').then(m => m.getConfig());
  const { SlackClient } = await import('./slack-client');
  const slackClient = new SlackClient(config);
  await slackClient.sendMessage(options.channel, options.message);
}

export async function sendStatusUpdate(options: StatusOptions): Promise<void> {
  const config = await import('./config').then(m => m.getConfig());
  const { SlackClient } = await import('./slack-client');
  const slackClient = new SlackClient(config);
  
  let message = `🤖 **Claude Code Update**\n${options.message}`;
  
  if (options.progress !== undefined) {
    const progressNum = Math.max(0, Math.min(100, options.progress));
    const progressBar = '█'.repeat(Math.floor(progressNum / 10)) + '░'.repeat(10 - Math.floor(progressNum / 10));
    message += `\n\nProgress: ${progressBar} ${progressNum}%`;
  }
  
  await slackClient.sendMessage(options.channel, message);
}