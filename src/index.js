import toHaveStyleRule from './toHaveStyleRule';
import styleSheetSerializer from './styleSheetSerializer';
import { resetStyleSheet } from './utils';

// global.beforeEach(resetStyleSheet);

// expect.addSnapshotSerializer(styleSheetSerializer);
// expect.extend({ toHaveStyleRule });

export { styleSheetSerializer, toHaveStyleRule, resetStyleSheet };
