import { WebClient } from '@slack/web-api';
import { Config } from './config';

export class SlackClient {
  private client: WebClient;

  constructor(config: Config) {
    this.client = new WebClient(config.slackBotToken);
  }

  async sendMessage(channel: string, text: string): Promise<void> {
    try {
      const result = await this.client.chat.postMessage({
        channel: channel,
        text: text,
        unfurl_links: false,
        unfurl_media: false
      });

      if (!result.ok) {
        throw new Error(`Failed to send message: ${result.error}`);
      }

      console.log(`Message sent successfully to ${channel}`);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Slack API error: ${error.message}`);
      } else {
        throw new Error('Unknown error occurred while sending message');
      }
    }
  }

  async sendFormattedMessage(
    channel: string, 
    text: string, 
    options?: {
      blocks?: any[];
      attachments?: any[];
    }
  ): Promise<void> {
    try {
      const result = await this.client.chat.postMessage({
        channel: channel,
        text: text,
        blocks: options?.blocks,
        attachments: options?.attachments,
        unfurl_links: false,
        unfurl_media: false
      });

      if (!result.ok) {
        throw new Error(`Failed to send message: ${result.error}`);
      }

      console.log(`Formatted message sent successfully to ${channel}`);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Slack API error: ${error.message}`);
      } else {
        throw new Error('Unknown error occurred while sending formatted message');
      }
    }
  }
}