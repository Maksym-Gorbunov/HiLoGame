import { shallowMount } from '@vue/test-utils'
import Start from '@/components/Start.vue'

const expect = require('chai').expect;
const should = require('chai').should();
const assert = require('assert');
const sinon = require('sinon');

describe('Start.vue', ()=>{
    
    
    const wrapper = shallowMount(Start);
    it('Start.vue should be an instance of vue', ()=>{
        expect(wrapper.isVueInstance())
    })
    describe('Start', ()=>{
        it('name should equal \'start\'', ()=>{
            const name = wrapper.name();
            name.should.equal('start');

    })
})
