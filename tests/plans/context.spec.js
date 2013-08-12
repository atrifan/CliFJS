require.define('./component_map', {
    get: sinon.stub()
});
define(['framework/context'], function (Context) {

    describe('Context Module', function () {
        var fakeConfig, fakeComponentMap;
        beforeEach(function () {
            fakeConfig = {
                containerId: 'fakeId'
            };

            window.Messaging = {
                get: sinon.stub()
            };

            window.ComponentMap = {
                get: sinon.stub()
            };

            window.fakeComponentMap = {
                fakeId: {
                    sid: 'fakeSid',
                    controller: sinon.stub()
                }
            }

            ComponentMap.get.returns(fakeComponentMap);
        });

        describe('#Constructor', function () {
            it('should call the singleton Messaging method and set it on the public messaging property', function () {
                var instance = new Context(fakeConfig);

                console.log(instance);
                expect(Messaging.get.called).to.be(true);
                expect(instance.messaging).not.to.be(null);

            });
        })
    });
});