# Claude Slack Messenger

A simple tool that allows Claude Code to send messages to Slack channels via a Slack bot.

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Slack bot token:
   ```
   SLACK_BOT_TOKEN=xoxb-your-bot-token-here
   DEFAULT_SLACK_CHANNEL=#general
   ```

3. **Build the Project**
   ```bash
   npm run build
   ```

## Usage

### CLI Commands

#### Send a Message to Any Channel
```bash
npx slack-send message --channel "#general" --message "Hello from Claude Code!"
```

#### Send to Default Channel (Quick Send)
```bash
npx slack-send quick --message "Quick update from Claude"
```

#### Send Status Update with Progress
```bash
npx slack-send status --channel "#dev-updates" --status "Processing files..." --progress 75
```

### Programmatic Usage

```typescript
import { sendMessage, sendStatusUpdate } from 'claude-slack-messenger';

// Send a simple message
await sendMessage({
  channel: '#general',
  message: 'Hello from Claude Code!'
});

// Send a status update with progress
await sendStatusUpdate({
  channel: '#dev-updates',
  message: 'Processing files...',
  progress: 75
});
```

## Slack Bot Setup

To use this tool, you need a Slack bot with the following permissions:
- `chat:write` - Send messages to channels
- `chat:write.public` - Send messages to public channels

1. Go to [Slack API Apps](https://api.slack.com/apps)
2. Create a new app or select existing
3. Add bot token scopes: `chat:write`, `chat:write.public`
4. Install app to workspace
5. Copy the Bot User OAuth Token (starts with `xoxb-`)

## Examples

### From Claude Code CLI
You can use this tool from Claude Code by running:
```bash
# Send completion notification
npx slack-send message -c "#code-reviews" -m "Code review completed for PR #123"

# Send progress update
npx slack-send status -c "#dev-team" -s "Refactoring user authentication module" -p 60
```

### Integration with Scripts
```bash
#!/bin/bash
# Example deployment script
echo "Starting deployment..."
npx slack-send quick -m "🚀 Deployment started"

# ... deployment logic ...

npx slack-send quick -m "✅ Deployment completed successfully"
```

## Available Commands

- `message` - Send a message to any channel
- `quick` - Send to default channel (requires DEFAULT_SLACK_CHANNEL)
- `status` - Send a formatted status update with optional progress bar

## Development

```bash
# Run in development mode
npm run dev

# Type checking
npm run typecheck

# Linting
npm run lint

# Build
npm run build
```
