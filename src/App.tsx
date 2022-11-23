// You MUST run `npm link @company/components` first or comment out these imports if not linked
import { Checkbox, TextField, Tooltip } from '@company/components';

export const App = () => {
  return (
    <div>
      <p>Hello world</p>
      <TextField placeholder="whatever" />
      <Tooltip title="key warnings">
        <Checkbox />
      </Tooltip>
    </div>
  );
};
