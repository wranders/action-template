import { getInput, setFailed, setOutput, setSecret } from '@actions/core';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_API_URL: string;
      GITHUB_REPOSITORY: string;
      GITHUB_REPOSITORY_OWNER: string;
    }
  }
}

async function main(): Promise<void> {
  try {
    const requiredConfig: string = getInput('required-config', {
      required: true,
    });
    setSecret(requiredConfig); // Maybe this is a token or some other secret
    const optionalConfig: string = getInput('optional-config');
    setOutput('some-output', optionalConfig);

    if (optionalConfig === 'thisIsAnError') throw new Error('this is an Error');
  } catch (e) {
    if (e instanceof Error) setFailed(e.message);
  }
}

main();
