import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
var expect = require('chai').expect;
var should = require('chai').should;
var assert = require('assert');

describe('App.vue', ()=>{
    
    const wrapper = shallowMount(App);
    it('App.vue should be an instance of vue', ()=>{

        expect(wrapper.isVueInstance());
    });
    it('name should be equal to \'app\'', ()=>{
        assert.equal(wrapper.name(), 'app');
    });
});
