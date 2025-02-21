import '@testing-library/jest-dom';
import 'fast-text-encoding'; // Required for Node.js TextEncoder/TextDecoder

import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
