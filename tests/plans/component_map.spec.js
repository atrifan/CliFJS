define(['framework/component_map'], function (ComponentMap){
    describe('Component Map', function () {
        var componentConfiguration = {}

        beforeEach(function () {
            componentConfiguration = {
                foo: 'bar'
            };

            ComponentMap.get().flushComponents();
        });

        describe('#getComponent', function () {
            it('should get the component if valid id', function () {
                var instance = ComponentMap.get();

                instance.registerComponent('1234', componentConfiguration);
                expect(instance.getComponent('1234')).to.be(componentConfiguration);
            });

            it('should get undefined if the id does not exist', function () {
                var instance = ComponentMap.get();

                instance.registerComponent('123', componentConfiguration);
                expect(instance.getComponent('1')).to.be(undefined);
            });
        });

        describe('#registerComponent', function () {
            it('should register a component in the component map corectly', function () {
                var instance = ComponentMap.get();

                instance.registerComponent('123', componentConfiguration);
                expect(instance._componentMap[123]).to.be(componentConfiguration);
            });
        });

        describe('#removeComponent', function () {
            it('should remove a component if the id passed is correct', function () {
                var instance = ComponentMap.get();

                instance.registerComponent('123', componentConfiguration);
                instance.removeComponent('123');
                expect(instance.getComponent('123')).to.be(undefined);
                expect(Object.keys(instance.getComponentMap()).length).to.be(0);
            });

            it('should not remove components if the id is invalid', function () {
                var instance = ComponentMap.get();

                instance.registerComponent('123', componentConfiguration);
                instance.removeComponent('1');
                expect(instance.getComponent('123')).to.be(componentConfiguration);
            });
        });

        describe('#flushComponents', function () {
            it('should remove all components', function () {
                var instance = ComponentMap.get();

                instance.registerComponent('123', componentConfiguration);
                instance.registerComponent('1234', componentConfiguration);
                instance.flushComponents();
                expect(Object.keys(instance.getComponentMap()).length).to.be(0);
            })
        })
    });

    return;
});