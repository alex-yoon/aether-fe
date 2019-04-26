import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4';
import jasmineEnzyme from 'jasmine-enzyme';

// Configure Enzyme for the appropriate React adapter
Enzyme.configure({ adapter: new Adapter() });

// Initialize global helpers
beforeEach(() => {
  jasmineEnzyme();
});

// Re-export all enzyme exports
export * from 'enzyme';