const fs = require('fs');
const path = require('path');
const { withDangerousMod, AndroidConfig } = require('@expo/config-plugins');
const xml2js = require('xml2js');
const builder = new xml2js.Builder({ headless: true });

function withAndroidLocalizedName(config) {
    return withDangerousMod(config, [
        'android',
        async config => {
            const projectRoot = config.modRequest.projectRoot;
            const resPath = await AndroidConfig.Paths.getResourceFolderAsync(projectRoot);
            for (const locale of Object.keys(config.locales ?? {})) {
                const json = await fs.promises.readFile(config.locales[locale]);
                const strings = JSON.parse(json);
                const resources = [];
                for (const key of Object.keys(strings)) {
                    resources.push({ string: { $: { name: key }, _: strings[key] } });
                }
                if (resources.length) {
                    await fs.promises.mkdir(path.resolve(resPath, `values-${locale}`), { recursive: true });
                    await fs.promises.writeFile(
                        path.resolve(resPath, `values-${locale}`, 'strings.xml'),
                        builder.buildObject({ resources })
                    );
                }
            }
            return config;
        },
    ]);
};

module.exports = withAndroidLocalizedName;
