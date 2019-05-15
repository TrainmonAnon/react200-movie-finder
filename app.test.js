import React from 'react';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './src/js/app';
import store from './src/js/rootStore';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {

  it('renders a title', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('#title')).to.have.lengthOf(1);
    expect(wrapper.find('#title').text()).to.equal("Movie Finder");
  });

});

describe('<MovieSearchContainer />', () => {

  it('renders a search input', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.find('#searchInput')).to.exist;
  });

  it('renders a search items div', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.find('#searchItems')).to.exist;
  });

  it('renders a search button', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.find('#searchButton')).to.exist;
  });

});

describe('<MovieDetailContainer />', () => {
  it('renders a poster image', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.find('#poster')).to.exist;
  });
});