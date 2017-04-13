import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Header from './src/components/header/header';

const User = (props) => {
	return (
		<div></div>
	);
};


describe('Test suite for User component', () => {
  it('UserComponent should exist', () => {
    let wrapper = shallow(<User />)
    expect(wrapper).to.exist;

	expect(wrapper.hasClass('user')).to.equal(true);


  });
});


describe('Test suite for Header component', () => {
	it('Header component should exist', () => {
		let wrapper = shallow(<Header />);
		expect(wrapper).to.exist;
	});
	it('should display the site title', () => {
		let wrapper = shallow(<Header />);
		
		let nav = wrapper.childAt(0);
		expect(nav.type()).to.equal('nav');

		let h1 = nav.childAt(0).childAt(0);
		expect(header.type()).to.equal('h1');

	});
});
