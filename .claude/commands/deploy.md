# /deploy

Runs the full deployment checklist and guides you through a safe deploy.

## Usage
```
/deploy staging
/deploy production
```

## What this does
1. Runs pre-deploy checks (tests, types, lint)
2. Confirms the target environment
3. Executes the deploy command
4. Monitors logs for errors
5. Runs post-deploy smoke tests

## Steps

### Pre-deploy
```bash
npm run test -- --watch=false
tsc --noEmit
npm run lint
git status  # must be clean
git log main...HEAD --oneline  # confirm what's shipping
```

### Deploy
```bash
# Staging
npm run deploy:staging

# Production (requires staging to have passed)
npm run deploy:production
```

### Post-deploy verification
- Check health endpoint: `curl https://<host>/health`
- Watch error rate for 5 minutes
- Smoke test the specific feature that shipped

## Abort & rollback
```bash
# If anything goes wrong:
npm run deploy:rollback
```

## Rules
- Never deploy to production without staging passing first
- Always confirm the git SHA being deployed
- Log deploy in team channel: env, version, deployer, time
