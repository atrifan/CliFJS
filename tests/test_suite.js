require.config({
    paths: {
        "framework": "../public/js"
    }
});

require(['./plans/component_map.spec.js',
'./plans/context.spec.js'], function () {
    mocha.run();
});