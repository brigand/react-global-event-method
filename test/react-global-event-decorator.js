import {expect} from 'chai';
import {stub} from 'sinon';
import onGlobalEvent from '../src/react-global-event-decorator';

describe('onGlobalEvent', () => {
  var E;

  beforeEach(() => {
    E = {};
    E.node = {
      addEventListener: stub(),
      removeEventListener: stub(),
    };
    E.stub = stub();
  });

  it('calls add/removeEventListener', () => {
    var inst = new class X {
      @onGlobalEvent('click', E.node)
      handler(){}
    };
    inst.componentDidMount();
    expect(E.node.addEventListener.calledOnce).ok;
    expect(E.node.removeEventListener.called).not.ok;
    inst.componentWillUnmount();
    expect(E.node.addEventListener.calledOnce).ok;
    expect(E.node.removeEventListener.calledOnce).ok;
  });

  it('calls original did/will mount/unmount', () => {
    var mountStub = stub(), unmountStub = stub();
    var inst = new class X {
      componentDidMount(){ mountStub(); }
      componentWillUnmount(){ unmountStub(); }
      @onGlobalEvent('click', E.node)
      handler(){}
    };

    expect(mountStub.called).not.ok;
    expect(unmountStub.called).not.ok;

    inst.componentDidMount();
    expect(mountStub.called).ok;
    expect(unmountStub.called).not.ok;

    inst.componentWillUnmount();
    expect(unmountStub.called).ok;
  });
});
